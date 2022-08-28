const {FindSrcMap} = require('@/helpers/findSrcMap');
const {saveFile} = require('@/helpers/saveFile');
const {writeFile} = require('@/helpers/writeFile');

const createModifySrcMap = (args) => {
  let srcMap = FindSrcMap(args.cwd);

  if (srcMap.srcMapData) {
    let srcMapData = srcMap.srcMapData;
    console.log('dataFound!')
    // Check to see if module exists in srcMapData
    if (srcMapData[args.openFileName + '.module'] && !srcMapData[args.openFileName + '.module'].includes(args.name)){
      //Add new partial filename to array
      srcMapData[args.openFileName + '.module'].push(args.relativePath);
      saveFile(srcMapData, srcMap.srcMapPath)
    } else if (!srcMapData[args.openFileName + '.module']){
      // add module to srcMap file
      srcMapData[args.openFileName + '.module'] = [args.relativePath];
      saveFile(srcMapData, srcMap.srcMapPath)
    }
  } else {
    console.log('Must build new src map');
    writeFile(srcMap.srcMapPath);
    let data = {}
    data[args.openFileName + '.module'] = [args.relativePath]
    saveFile(data, srcMap.srcMapPath);
  }

}

module.exports = {
  createModifySrcMap
}
