var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/',function(req,res){
	res.sendFile('index.html', {
		'root': __dirname + '/public'
	});
});

/* Product router */
var productRouter = express.Router();
productRouter.get('/', function(req, res) {
	request.get({
		method: 'GET',
		uri: 'http://localhost:8080/api/products'
	}, function (error, response, body){
		if(!error && response.statusCode == 200) {
			res.set({
			  'Content-Type': 'application/json'
			});
			res.send(body);
		}
	});
});
app.use('/products', productRouter);

/* Order router */
var orderRouter = express.Router();
orderRouter.post('/', function(req, res) {
	request.post({
		uri: 'http://localhost:8080/api/order',
		form: {
			products: req.body.products,
			total: req.body.total
		}	
	}, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			console.log(body);
		}
	});
	res.json({
		"success": true,
		"message": "Order placed successfully."
	});
});
app.use('/order', orderRouter);

app.listen(port, function() {
  console.log('Running app on port: ' + port);
});