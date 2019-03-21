var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var exec = require("child_process").exec;

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(cors());

app.get("/e/kzeery", function(req, res) {
	res.redirect("https://mac1xa3.ca/u/kzeery/lab7.html");
});

app.post("/e/kzeery/lab7", function(req, res) {
	if(req.body.name == "Jimmy" && req.body.password == "Hendrix") {
		res.send("Cool");
	} else {
		res.send("Bad User Name");
	}
});

app.listen(10033, function() {
	console.log("server has started :)");
});
