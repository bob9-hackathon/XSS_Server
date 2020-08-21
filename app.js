const express = require("express");
const bodyParser = require('body-parser');

const app = express();

let html = param => `<!DOCTYPE html>
<head>
<meta charset="utf-8">
<title>XSS TEST</title>
</head>
<body>
${param}
</body>
`;

app.use((req, res, next) => {
	res.header('Content-type', 'text/html');
	next();
});

app.get("/xss_get", (req, res) => {
	console.log("GET Request", req.query);
	res.end(html(req.query.xss));
});

app.post("/xss_post", (req, res) => {
	console.log("POST Request", req.body);
	res.end(html(req.body.xss));
});

app.listen(80, () => console.log('XSS Victim Server is running on port 80.'));
