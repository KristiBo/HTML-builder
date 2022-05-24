const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');
const distFolder = path.join(__dirname, 'project-dist');
const assetsFolder = path.join(__dirname, 'assets');
const assetsCopyFolder = path.join(distFolder, 'assets');
const templateFile = path.join(__dirname, 'template.html');
const componentsFolder = path.join(__dirname, 'components');
const htmlFile = path.join(distFolder, 'index.html');
const stylesFolder = path.join(__dirname, 'styles');
const stylesFile = path.join(distFolder, 'style.css');

async function createDist() {
  await fsPromises.rm(distFolder, {recursive: true, force: true});

  fsPromises.mkdir(distFolder, { recursive: true });

  copyFolder(assetsFolder, assetsCopyFolder);

  bundleHtml();

  bundleStyles();
}

try {
  createDist();
} catch (error) {
  console.error('Error');
}

async function copyFolder(folder, copy) {
  try {
    await fsPromises.rm(copy, {recursive: true, force: true});

    fsPromises.mkdir(copy, { recursive: true });
  
    const files = await fsPromises.readdir(folder, { withFileTypes: true });
  
    for (let file of files) {
      const pathFile = path.join(folder, file.name);
      const pathFileCopy = path.join(copy, file.name);

      if (file.isDirectory()) {
        copyFolder(pathFile, pathFileCopy);
      } else {
        fsPromises.copyFile(pathFile, pathFileCopy);
      }
    }

  } catch (error) {
    console.error('Error');
  }
}

async function bundleHtml() {
  try {    
    const files = await fsPromises.readdir(componentsFolder, { withFileTypes: true });
    const readTemplate = fs.createReadStream(templateFile, 'utf-8');

    readTemplate.on('data', async (str) => {
      for (let file of files) {    
        const name = path.parse(file.name).name;
        const componentsFile = path.join(componentsFolder, file.name);
        const readComponents = await fsPromises.readFile(componentsFile, 'utf-8'); 
        str = str.replace(`{{${name}}}`, readComponents);
      }
      await fsPromises.writeFile(htmlFile, str);
    });

  } catch (error) {
    console.error('Error');
  }
}

function bundleStyles() {
  fs.readdir(stylesFolder, { withFileTypes: true }, (error, files) => {
    if (error) console.error('Error');

    const writeStream = fs.createWriteStream(stylesFile);

    for (let file of files) {
      if (file.isFile() && path.parse(file.name).ext === '.css') {
        const pathFile = path.join(stylesFolder, file.name);
        const readStream = fs.createReadStream(pathFile, 'utf-8');
        readStream.pipe(writeStream);
      }
    }
  });
}
