const express = require("express")
const cors = require("cors")

const app = express()
const port = 3000

app.use("/", express.static('public'))

app.use(express.json()); 
app.use(express.urlencoded({ extended: true}));
app.use(cors());

app.get("/api", function (req, res) {
	
	res.setHeader('Content-Type', 'application/json');
	res.send({ msg: "Hello"});
})

app.get("/api/exercise", function (req, res) {
	
	res.setHeader('Content-Type', 'application/json');
	
	var response = {};
	for (var propName in req.query) {
		response[propName] = req.query[propName];
	}
	
	res.write(JSON.stringify(response));
	res.status(200).end();
})

app.post("/api/exercise", function (req, res) {
	
	res.setHeader('Content-Type', 'text/html');
	
	var result = "<h1>Hello from Express!</h1><h2>POST parameters</h2><p>I received these parameters: </p><ul>";
	
	
	var response = {};
	for (var propName in req.body) {
		result += "<li>" + propName + ": " + req.body[propName] + "</li>";
	}
	
	result += "</ul>";
	
	res.status(200).send(result);
})

app.post("/api/login", function (req, res) {
	
	res.setHeader('Content-Type', 'application/json');
	
	if(!req.body["user"] || !req.body["pwd"]) {
		res.status(400).end();
		return;
	}
	
	if(req.body["user"] == "mark" && req.body["pwd"] == "giraffe") {
		var response = {};
		
		response["user"] = req.body["user"];
		
		res.write(JSON.stringify(response));
		res.end();
		return;
	}
	
	res.status(403).end();
})

app.listen(port, () => 
console.log(`Express app listening on port ${port}!`))
