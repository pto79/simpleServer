var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.json());
app.use(express.static('public'));

app.get('/', function(req, res){
	console.log(req.body);
	switch (req.body.subject) {
	case 1:	//chinese
	fs.readFile('./public/chinese.json', function(err, data){
		var obj = JSON.parse(data)
		res.send(obj);
	});
	break;
	case 2:	//english
	fs.readFile('./public/english.json', function(err, data){
		var obj = JSON.parse(data)
		res.send(obj);
	});
	break;
	default: 
	fs.readFile('./public/data.json', function(err, data){
		var obj = JSON.parse(data)
		res.send(obj);
	});
	break;
	}
});

app.post('/', function(req, res){
	console.log(req.body);
	fs.readFile('./public/data.json', function(err, data){
		var obj = JSON.parse(data)
		obj.test1.push(req.body);

		//fs.appendFile('./public/data.json', JSON.stringify(obj), function(){
		fs.writeFile('./public/data.json', JSON.stringify(obj), function(){
			console.log("data saved");
		});
	});	
	res.end();
});

app.put('/', function(req, res){
	console.log(req.body);
	fs.readFile('./public/data.json', function(err, data){
		var obj = JSON.parse(data)
		console.log(req.body.name);
		obj.test1.forEach(function(item,index){
			if (item.name == req.body.name)
			{
				console.log(index);
				obj.test1[index].address = req.body.address;
			}
		});
		
		//fs.appendFile('./public/data.json', JSON.stringify(obj), function(){
		fs.writeFile('./public/data.json', JSON.stringify(obj), function(){
			console.log("data updated");
		});
	});		
	res.end();
});

app.delete('/', function(req, res){
	console.log(req.body);
	fs.readFile('./public/data.json', function(err, data){
		var obj = JSON.parse(data)
		console.log(req.body.name);
		obj.test1.forEach(function(item,index){
			if (item.name == req.body.name)
			{
				console.log(index);
				obj.test1.splice(index,1);
			}
		});

		//fs.appendFile('./public/data.json', JSON.stringify(obj), function(){
		fs.writeFile('./public/data.json', JSON.stringify(obj), function(){
			console.log("data deleted");
		});
	});	
	res.end();
});

app.listen(3000);