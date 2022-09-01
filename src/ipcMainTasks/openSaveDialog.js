const {ipcMain, dialog} = require('electron');
const fs =  require('fs');
const dirTree = require("directory-tree");

const OpenSaveDialog = function(win) {
  console.log("win", win)
    ipcMain.on('openSaveDialog', (event, args) => {
      console.log("win",win)
    console.log('running')
    if(args.usage == 'createGlobalParital'){
      console.log(args);

      const options = {
        title: "Add New Global Field Parital",
        buttonLabel: "Create File",
        defaultPath: args.defaultPath
      }

      dialog.showSaveDialog(options)
      .then(data => {
        // create a blank file
        fs.writeFileSync(data.filePath, JSON.stringify([]))

        console.log('Created New File!?', data)
        const tree = dirTree(args.defaultPath);

        // update the Tree
        win.webContents.send("newDirectory", {
          usage: "changeGlobalPartialsDirectory",
          cwd: args.defaultPath,
          tree: tree
        })

      })
      .catch(err => {
        console.log('err', err);
      } )
    }
  });
};


module.exports = OpenSaveDialog
