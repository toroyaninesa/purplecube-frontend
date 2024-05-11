const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

const envObjectStr = `
export const environment = {
    production: true,
    baseURL: 'https://purplecube-backend-production.up.railway.app/',
    gptOrg: 'org-PlyG5a7nn6G4Lc4QOf023iPg',
    gptProject: 'proj_Jnal6ARTY6LzgfB50wdgwLtQ',
    gptAuthHeader: '${process.env.gptAuthHeader}'
};
`;
fs.writeFile("src/environments/environment.prod.ts", envObjectStr, function(err) {
  if(err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});

app.use(express.static(__dirname + '/dist/purplecube'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+
    '/dist/purplecube/index.html'));});
app.listen(process.env.PORT || 8080);
