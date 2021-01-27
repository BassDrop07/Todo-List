var express = require('express');
var app = express();

app.post('/api', function(req, res) {
    res.send('Hello World!')
  })

app.listen(process.env.PORT || 3001, 
    () => console.log("Backend server is running..."));
    
