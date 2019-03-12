var express = require("express");

var app = express();

app.get("/e/kzeery", function(req, res) { 
	res.send("Hello world!!!");
});

app.get("/e/kzeery/secret", function(req, res) {
	res.send("You found me!!!");
});

app.listen(10033, function() {
	console.log("server has started :)");
});
