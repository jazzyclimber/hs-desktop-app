const {FindSrcMap} = require('@/helpers/findSrcMap');
const fs = require('fs');
const _ = require('lodash');
const {saveFile} = require('@/helpers/saveFile');

const updateGlobalDependants = (args) => {
  let srcMap = FindSrcMap(args.cwd);

  if (srcMap.srcMapData) {
    console.log('this is working')
    const modules = Object.keys(srcMap.srcMapData);

    console.log(modules);

    modules.forEach(module=> {
      if (srcMap.srcMapData[module].includes(args.relPath)){
        console.log('This module should be saved');
        const config = {
          module: module,
          tree: args.tree.children,
          newData: args.editedFile,
          oldData: args.originalFile
        }
        readFile(config);
      }
    })

  } else {
    console.log('missing the target')
  }

}

function readFile(args) {

  args.tree.forEach(file => {
    if (file.name == args.module) {
      file.children.forEach(subFile => {
        subFile.name == 'fields.json' ? mapFile(subFile, args) : null;
      })
    } else if (file.children) {
      args.tree = file.children;
      readFile(args)
    }
  })
}


function mapFile(file, data) {
console.log('file', file);
  // read field.json file
  const parsedFile = JSON.parse(fs.readFileSync(file.path));

  // Find the start of the partial
  function findPartial(array) {
    let ignoreFields = false;
    let ignoreLength;
    let partialIndex;
    let partialFound = false;

    const temp = array.flatMap( (field, i) => {
      if (_.isEqual(field, data.oldData[0]) && _.isEqual(array[i + data.oldData.length - 1 ], data.oldData[data.oldData.length - 1])) {
        console.log('partial Found');
        partialIndex = i;
        ignoreLength = i + data.oldData.length - 1;
        ignoreFields = true;
        partialFound = true;
        return []
      } else if (ignoreFields) {
        if (i == ignoreLength) {
          ignoreFields = false
          return []
        } else {
          return []
        }
      } else if (field.type == 'group') {
        let obj = field
        obj.children = findPartial(field.children);
        return obj
      }
      else {
        return field
      }
    })

    if (partialFound) {
      temp.splice(partialIndex, 0, data.newData);
      const flatPartial = temp.flatMap( field => field);
      return flatPartial
    } else {
      return temp;
    }

  }
  let newFile = findPartial(parsedFile);

  saveFile(newFile, file.path);
}

module.exports = {
  updateGlobalDependants
}
