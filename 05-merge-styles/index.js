const fs = require('fs');
const path = require('path');
const pathFolder = path.join(__dirname, 'styles');
const bundleFile = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(pathFolder, { withFileTypes: true }, (error, files) => {
  if (error) console.error('Error');

  const writeStream = fs.createWriteStream(bundleFile);
  
  for (let file of files) {
    if (file.isFile() && path.parse(file.name).ext === '.css') {
      const pathFile = path.join(pathFolder, file.name);
      const readStream = fs.createReadStream(pathFile, 'utf-8');
      readStream.pipe(writeStream);
    }
  }
});
