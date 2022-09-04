const {FindSrcMap} = require('@/helpers/findSrcMap');
const fs = require('fs');
const path = require('path');
const {saveFile} = require('@/helpers/saveFile');

const removeSrcMap = (args) =>  {
  let srcMap = FindSrcMap(args.cwd);

  if (srcMap.srcMapData) {
    let srcMapData = srcMap.srcMapData;
    let moduleName = args.openFileName + '.module';

    if (srcMapData[moduleName] && srcMapData[moduleName].includes(args.name)) {
      srcMapData[moduleName] = srcMapData[moduleName].filter(fileName => fileName != args.name );
      newFileData = removeIfEmpty(srcMapData, moduleName)
      saveFile(newFileData, srcMap.srcMapPath);
    }
  }
}

function removeIfEmpty(data, fileName) {
  if (data[fileName].length == 0) {
    delete data[fileName]
    return data
  }
  return data
}

module.exports = {
  removeSrcMap
}
