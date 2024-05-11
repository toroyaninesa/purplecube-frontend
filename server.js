const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

let mainFileName = '';
fs.readdirSync('dist/purplecube').forEach(file => {
  if (file.startsWith('main.')) {
    mainFileName = file;
  }
});
const mainFilePath = 'dist/main/' + mainFileName;
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
