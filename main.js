var express = require('express');  
var app = express();  
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var aws = require('aws-sdk'); 
var favicon = require('serve-favicon');

aws.config.loadFromPath('./awsconfig.json');
var dd = new aws.DynamoDB();

var tableName = 'kwyunDB';

app.use(favicon(__dirname + '/public/img/heart-icon.png'));
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

app.use(bodyParser.json());

var params = {
    TableName : tableName
};

putItem = function(name, message, latitude, longitude) {
    
    var wish = {
    	'id': { 'S': new Date().getTime().toString() },
	    'name': { 'S': name},
	    'message': { 'S': message},
	    'latitude': { 'S': latitude.toString()},
	    'longitude': { 'S': longitude.toString()}
	};
	    
	dd.putItem({
		'TableName': tableName,
		'Item': wish
	}, function(err, data) {
		err && console.log(err);
	});	
};

server.listen(3000);
