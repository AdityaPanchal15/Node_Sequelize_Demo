/* eslint-disable guard-for-in */
require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express');
const router = require('./routes');
const app = express()
const port = process.env.NODE_PORT || 3000

// BODY PARSER
app.use(bodyParser.json());
app.use(
	bodyParser.json({
		limit: "50mb",
		parameterLimit: 1000000
	})
);
app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 1000000
	})
);

app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})