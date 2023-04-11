const express = require('express');
const app = express();
require('dotenv').config()
const methodOverride = require('method-override');
const public_route = require('./api/routes/index')

app.use(methodOverride('_method'))
app.use(express.json({limit: '50mb'}));
app.use((req, res, next) => {
	
	// Allow all domain to access this API
	// Replace the star(*) with domain name to restrict this API
	
	res.header('Access-Control-Allow-Origin', '*'); 
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); 
	
	
	
	next();
});

app.use(public_route)

app.use((req, res, next) => {
	res.status(404).json({
		error_type: 'resource_unavailable',
		message: "The requested endpoint does not exist"
	});
	
});

app.use((error, req, res, next) => {
	console.log(error)
	res.status(500).json({
		error_type: 'internal_error',
		message: "We can not entertain this request at the moment. Our devs are working to resolve the issue asap."
	});
});

module.exports = app;