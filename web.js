var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var port = Number(process.env.PORT || 5500);

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.render = function(res, path){
	res.sendFile(path);
};

app.get('/', function(req, res) {
	app.render(res, "public/index.html");
});

app.post('/saveData', function(req, res) {
	var b64 = req.body.b64;
	b64 = b64.replace(/^data:image\/png;base64,/, "");
	fs.writeFileSync("ss/out.png", b64, 'base64');
	console.log(req.body);
	res.send(200);
});

app.listen(port, function() {
  console.log("Listening on " + port);
});





