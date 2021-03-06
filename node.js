var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.use(express.static('.'))
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));