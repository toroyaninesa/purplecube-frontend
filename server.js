const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

let mainFileName = '';
const rootPath = __dirname + '/dist/purplecube';
fs.readdirSync(rootPath).forEach(file => {
  if (file.startsWith('main.')) {
    mainFileName = file;
  }
});
const mainFilePath = path.join(rootPath, mainFileName);
console.log(process.env.gptAuthHeader);
fs.readFile(mainFilePath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  const result = data.replace(/gptAuthHeader:"undefined"/g, `gptAuthHeader:"${process.env.gptAuthHeader}"`);

  fs.writeFile(mainFilePath, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

app.use(express.static(__dirname + '/dist/purplecube'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+
    '/dist/purplecube/index.html'));});
app.listen(process.env.PORT || 8080);
