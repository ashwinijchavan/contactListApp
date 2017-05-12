var express = require('express');
var app = express();
var mongojs = require('mongojs');//it reuire mongo js module
var db = mongojs('contactlist',['contactlist']);// this says which db and collection in database we r using
var bodyParser = require('body-parser');
/*app.get('/', function(req,res){
	res.send("hello world from server.js")
});*/
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get('/contactlist', function(req, res){
	console.log("I recieved a get Request");
	db.contactlist.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});
app.post('/contactlist',function(req,res){
	console.log(req.body);
	db.contactlist.insert(req.body,function(err,doc){
		res.json(doc);
	});


app.delete('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
    db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,doc){
    	res.json(doc);
    });
});

app.get('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	})
})

app.put('/contactlist/:id',function(req,res){
	var id = req.param.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query:{_id: mongojs.ObjectId(id)},
		update:{$set: {name: req.body.name,email: req.body.email,number: req.body.number}},
		new: true},function(err,doc){
			res.json(doc);	
		})

})
/*	person1 = {
		name: 'Ashu',
		email: 'a@g.com',
		number: '234567890'
	};
	person2 = {
		name: 'Ank',
		email: 'ank@g.com',
		number: '8754234565'
	};
	person3 = {
		name: 'Pri',
		email: 'p@g.com',
		number: '123456806q'
	};

	var contactlist =[person1, person2, person3];
	res.json(contactlist);*/
});

app.listen(3000);
console.log("server is running on port 3000");
