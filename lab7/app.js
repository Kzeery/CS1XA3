var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get("/e/kzeery/lab7", function(req, res) { 
	res.render("index", { rightPassword: "" });
});

app.post("/e/kzeery/lab7", function(req, res) {
	if(req.body.name === "Jimmy" && req.body.password === "Hendrix") {
		res.render("index", {rightPassword: "Cool"});
	} else {
		res.render("index", {rightPassword: "Bad User Name"});
	}
});



app.listen(10033, function() {
	console.log("server has started :)");
});
