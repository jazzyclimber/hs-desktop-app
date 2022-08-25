const {
  contextBridge,
  ipcRenderer
} = require("electron")

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "ipc", {
      send: (channel, data) => {
          // whitelist channels
          const validChannels = ["openDialog", "readFile", "saveFile", "helperTask"];
          if (validChannels.includes(channel)) {
              ipcRenderer.send(channel, data);
          }
      },
      receive: (channel, func) => {
          const validChannels = ["newDirectory", "openFile"];
          if (validChannels.includes(channel)) {
              // Deliberately strip event as it includes `sender`
              ipcRenderer.on(channel, (event, ...args) => func(...args));
          }
      }
    }
);
