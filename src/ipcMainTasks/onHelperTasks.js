const {ipcMain} = require('electron');
const {createModifySrcMap} = require('@/ipcMainTasks/srcMap/createModifySrcMap');
const {removeSrcMap} = require('@/ipcMainTasks/srcMap/removeSrcMap');
const {updateGlobalDependants} = require("@/ipcMainTasks/srcMap/updateGlobalDependants");

module.exports = ipcMain.on('helperTask', (event, args) => {

  console.log(args);
    if(args.usage == 'createModifySrcMap' && args.action == 'add'){
      createModifySrcMap(args);
    } else if(args.usage == 'createModifySrcMap' && args.action == 'remove') {
      removeSrcMap(args);
    } else if (args.usage == "updateGlobalDependants") {
      updateGlobalDependants(args);
    }
  });

