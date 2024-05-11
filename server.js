const express = require('express');
const path = require('path');
const app = express();
require('src/environments/environment').environment.gptAuthHeader = process.env.gptAuthHeader;
app.use(express.static(__dirname + '/dist/purplecube'));
app.get('/*', function(req,res) {

  res.sendFile(path.join(__dirname+
    '/dist/purplecube/index.html'));});
app.listen(process.env.PORT || 8080);
