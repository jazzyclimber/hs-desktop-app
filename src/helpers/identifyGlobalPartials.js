const fs =  require('fs')
const path = require('path');
const _ = require('lodash');
const {partials} = require('@/components/editFields/helpers/fieldTypes');

function identifyReplaceGlobalPartials(config) {
  const srcMap = findSrcMap(config.openDir);
  if (srcMap) {
    // Now we must read file and find what needs to be manipulated back
    // To Global Files
    const readSrcMap = JSON.parse(srcMap);
    const currentFileDir = path.parse(config.path).dir;
    const currentFileDirName = path.parse(currentFileDir).base;
    const srcMapKey = readSrcMap[currentFileDirName]

    if (srcMapKey && config.partialsDir) {
      console.log("SrcMap Found, Matching Key Found");

      return readAndReduceOpenFile(srcMapKey, config.file, config.partialsDir);
    } else {
      console.log("SrcMap Found, or no Partials Dir Set,  but no matching key found!");
      return config.file
    }

  } else {
    // No srcMap found means that we can
    // return the OG file.
    return config.file
  }
}

function readAndReduceOpenFile(globalPartialsArray, openFile, partialsDir) {

  let modFile = openFile;

  console.log(globalPartialsArray);

  globalPartialsArray.forEach( partialFile => {

    console.log(partialsDir)

    const curPartial = JSON.parse(readFile(path.join(partialsDir, partialFile)));

    const args = {
      curPartialArray: curPartial,
      fieldsArray: modFile,
      partialsDir: partialsDir,
      partialFile: partialFile
    }

    modFile = mapFile(args);
  })

  return modFile
}

function mapFile(config) {
  let ignoreFields = false;
  let ignoreLength = null
  const temp = config.fieldsArray.flatMap( (field, i) => {
    if (_.isEqual(field, config.curPartialArray[0]) && _.isEqual(config.fieldsArray[i + config.curPartialArray.length - 1 ], config.curPartialArray[config.curPartialArray.length - 1])){
      // check to see if the last item in this array matches the partial file.
      console.log('First Item Found!!!!!')
      let tempPartial = _.cloneDeep(partials.globalPartial);
      tempPartial.filePath = path.join(config.partialsDir, config.partialFile);
      tempPartial.fileName = config.partialFile;
      tempPartial.label = config.partialFile;
      ignoreLength = i + config.curPartialArray.length - 1;
      ignoreLength > 0 ? ignoreFields = true : null;
      return tempPartial
    } else if (ignoreFields) {
      console.log("ignoreLength", ignoreLength)
      if (i == ignoreLength) {
        ignoreFields = false
        return []
      } else {
        return []
      }
    } else if (field.type == "group") {
      let obj = field

      const args = {
        curPartialArray: config.curPartialArray,
        fieldsArray: field.children,
        partialsDir: config.partialsDir,
        partialFile: config.partialFile
      }
      obj.children = mapFile(args);
      return obj
    }  else {
      return field
    }
  } )

  // console.log(temp);
  return temp
}


function findSrcMap(openDir) {
  const srcmapPath = path.join(openDir , "COPILOT.srcmap.json");
  // console.log(srcmapPath);
  if (fs.existsSync(srcmapPath)) {
    console.log('Source Map Exists');
    return readFile(srcmapPath)
  } else {
    console.log('Source Map Not Found');
    return undefined;
  }
}

function readFile(path) {
  return fs.readFileSync(path);
}

module.exports = {
  identifyReplaceGlobalPartials
}

