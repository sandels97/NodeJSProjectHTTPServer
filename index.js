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

app.listen(port, () => 
console.log(`Express app listening on port ${port}!`))
