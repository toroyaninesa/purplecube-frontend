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
const data = fs.readFileSync(mainFilePath, 'utf8');
const result = data.replace(/gptAuthHeaderReplace/g, "Bearer " + process.env.gptAuthHeader);
fs.writeFileSync(mainFilePath, result, 'utf8');

app.use(express.static(__dirname + '/dist/purplecube'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+
    '/dist/purplecube/index.html'));});
app.listen(process.env.PORT || 8080);
