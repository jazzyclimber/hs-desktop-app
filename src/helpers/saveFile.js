const path = require('path');
const fs = require('fs');


let saveFile = function(data, filePath) {
  let payload = JSON.stringify(data);
  let callback = (err) => {
    if (err) {
      console.log("error on save", err)
    } else {
      console.log('File Saved Successfully', filePath);
    }
  }
  let formattedFilePath = path.resolve(filePath.toString())
  fs.writeFile(formattedFilePath, payload, callback);
}

module.exports = {
  saveFile
}
