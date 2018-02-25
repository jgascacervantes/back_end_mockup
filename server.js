var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs');

//return simple homepage for buttons
fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(8000);
    console.log("WEB PAGE READY ON PORT: 8000" )
});

//api
var routes = require('./api/routes/routes');
routes(app); //register the route
console.log("API READY ON PORT: " + port);

app.listen(port);