const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'file.txt');
const { stdin, stdout, exit } = process;
const readline = require('readline');
const input = readline.createInterface(stdin);
const output = fs.createWriteStream(pathFile);

stdout.write('Добрый день! Введите, пожалуйста, текст\n');

const end = () => {
  stdout.write('Всего доброго!');
  exit();
};

input.on('line', (text) => {
  if (text === 'exit') end();
  output.write(text + '\n');
});

process.on('SIGINT', end);
