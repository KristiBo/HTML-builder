const fsPromises = require('fs').promises;
const path = require('path');
const pathFolder = path.join(__dirname, 'files');
const pathCopyFolder = path.join(__dirname, 'files-copy');

async function copyFolder() {
  await fsPromises.rm(pathCopyFolder, {recursive: true, force: true});

  fsPromises.mkdir(pathCopyFolder, { recursive: true });
  
  const files = await fsPromises.readdir(pathFolder, { withFileTypes: true });
  
  for (let file of files) {
    const pathFile = path.join(pathFolder, file.name);
    const pathFileCopy = path.join(pathCopyFolder, file.name);
    fsPromises.copyFile(pathFile, pathFileCopy);
  }
}

try {
  copyFolder();
} catch (error) {
  console.error(error.message);
}
