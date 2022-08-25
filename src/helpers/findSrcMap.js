const path = require('path');
const fs = require('fs');

function FindSrcMap(openDir) {
  const srcmapPath = path.join(openDir , "COPILOT.srcmap.json");
  // console.log(srcmapPath);
  if (fs.existsSync(srcmapPath)) {
    // console.log('Source Map Exists');
    return {srcMapPath: srcmapPath, srcMapData: JSON.parse(fs.readFileSync(srcmapPath))}
  } else {
    // console.log('Source Map Not Found');
    return {srcMapPath: srcmapPath, srcMapData: undefined};
  }
}

module.exports = {
  FindSrcMap
}
