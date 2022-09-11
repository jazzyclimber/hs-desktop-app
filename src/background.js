'use strict'

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  dialog
} from 'electron'
import {
  createProtocol
} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {
  VUEJS_DEVTOOLS
} from 'electron-devtools-installer'
import {autoUpdater} from "electron-updater"
import path from "path"
import _ from 'lodash'
import {identifyReplaceGlobalPartials} from "@/helpers/identifyGlobalPartials"
import HelperTask from "@/ipcMainTasks/onHelperTasks"
const dirTree = require("directory-tree");
const fs = require('fs');
const DevTools = false;
const build = true;
// const build = false;
let preloadPath = build ? __dirname: "./public";
const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1500,
    height: 800,
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote

      preload: path.resolve(preloadPath, "preload.js")
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (DevTools) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  // Create main window
  createWindow()
  // autoupdater -- example https://github.com/iffy/electron-updater-example/blob/master/main.js
  autoUpdater.checkForUpdatesAndNotify();
  // Look for updates every 10 mins
  setInterval(() => autoUpdater.checkForUpdates(), 300000);
})


autoUpdater.on('update-downloaded', (info) => {
  win.webContents.send('notification', {
    msg: "An update has been downloaded and will be applied after closing the app",
    type: "update"
  })
})


HelperTask

// Shoud likely change these to be an actual
// interface with the app itself. This seems hacky.
let openDir, partialsDir;

// Opens a dialog for user to select File
// expects an arg called "type" which will
// be returned in the response and will
// ultimately tell the app what to do with
// the returned directory.
ipcMain.on("openDialog", (event, args) => {

  const options = {
    title: 'Open Directory',
    buttonLabel: 'Select Directory',
    properties: ['openDirectory']
  }

  dialog.showOpenDialog(options)
  .then(data => {
    if (!data.canceled) {
      const tree = dirTree(data.filePaths[0]);

      if (args.usage == 'changeCurrentDirectory') {
        openDir = data.filePaths[0];
      } else if (args.usage == 'changeGlobalPartialsDirectory'){
        partialsDir = data.filePaths[0];
      }

      win.webContents.send("newDirectory", {
        usage: args.usage,
        cwd: data.filePaths[0],
        tree: tree
      })
    }
  })
  .catch(err => {
    console.log('err', err)
  })

});


ipcMain.on('openSaveDialog', (event, args) => {
if(args.usage == 'createGlobalParital'){

  const options = {
    title: "Add New Global Field Parital",
    buttonLabel: "Create File",
    defaultPath: args.defaultPath
  }

  dialog.showSaveDialog(options)
  .then(data => {
    // create a blank file
    if (!data.canceled) {

      fs.writeFileSync(data.filePath, JSON.stringify([]))

      console.log('Created New File!', data)
      const tree = dirTree(args.defaultPath);

      // update the Tree
      win.webContents.send("newDirectory", {
        usage: "changeGlobalPartialsDirectory",
        cwd: args.defaultPath,
        tree: tree
      })

      console.log('file tree changed!');
    }

  })
  .catch(err => {
    console.log('err', err);
  } )
}
});



ipcMain.on("readFile", (event, config) => {
  fs.readFile(config.path, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    console.log('readFile!!!!!!')
    const payload = {
      file: JSON.parse(data),
      usage: config.usage
    }

    if (config.usage == "updateOpenFile") {
      const args = {
        file: JSON.parse(data),
        openDir: openDir,
        partialsDir: partialsDir,
        path: config.path
      }

      payload.file = identifyReplaceGlobalPartials(args);
    }
    win.webContents.send('openFile', payload)
  })
})

ipcMain.on("saveFile", (event, file) => {

  console.log("saveFile")

  function addGlobalPartials(array) {

      let modArray = array.flatMap((field, i) => {
          if (field.type == 'globalPartial') {
            // console.log(field);
            let readPartial = fs.readFileSync(field.filePath, 'utf-8')
            readPartial = JSON.parse(readPartial);
            return readPartial
          } else if (field.type == "group") {
              let obj = field
              obj.children = addGlobalPartials(field.children);
              return obj
          } else {
              return field
          }
      })

      return modArray
  }

  let finalFile = addGlobalPartials(file.file);

  let payload = JSON.stringify(finalFile);
  let callback = (err) => {
    if (err) {
      console.log("error on save", err)
    } else {
      console.log('File Saved Successfully');
    }
  }
  let filePath = path.resolve(file.path.toString())
  fs.writeFile(filePath, payload, callback);
})


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
