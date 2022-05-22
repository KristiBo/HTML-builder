const fs = require('fs');
const path = require('path');
const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathFolder, { withFileTypes: true }, (error, files) => {
  if (error) console.error('Error');
  for (let file of files) {
    if (file.isFile()) {
      const pathFile = path.join(pathFolder, file.name);
      const fileName = path.parse(pathFile).name;
      const fileExt = path.parse(pathFile).ext.slice(1);
      fs.stat(pathFile, (error, stats) => {
        if (error) console.error('Error');
        console.log(fileName + ' - ' + fileExt + ' - ' + stats.size + 'B');
      });
    }
  }
});