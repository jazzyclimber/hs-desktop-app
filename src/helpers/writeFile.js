const fs = require('fs');
const path = require('path');

const writeFile = (pathName) =>  {
  console.log('Creating New File');
  const fileName = path.join(pathName);

  fs.closeSync(fs.openSync(fileName, 'a'));
}

module.exports = {
  writeFile
}
