    var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//connect to db
mongoose.connect('mongodb://rytham:rhythm@ds239988.mlab.com:39988/todo-db')
//create schema 

var todoSchema = new mongoose.Schema({
    item: String
});

//todo model
var Todo = mongoose.model('Todo',todoSchema);

// var item1= Todo({item:'buy flowers'}).save(function(err)
//     {
//         if(err)throw err;
//         else console.log('item saved'); 
//     });


// var data = [{item:'get milk'},{item:'walk dog'},{item:'hey'}];

 
var urlencodedParser= bodyParser.urlencoded({extended:false});

module.exports = function(app){

	app.get('/todo',function(req,res){ 
        //get data from mongodb and pass it to view
        Todo.find({},function(err,data){
            if(err)throw err;
            res.render('todo',{ todos : data });
        });
	});

    app.post('/todo',urlencodedParser ,function(req,res){
    	//console.log("api");
       //  data.push(req.body);
        //get data from view and add it to db
         var newTodo= Todo(req.body).save(function(err,data)
         {
            if(err)throw err;
         res.json(data);   
         });
         
	});  

	app.delete('/todo/:item',function(req,res){
        // delete from mongodb
     Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
     });
 //     data= data.filter(function(todo){
 //     	return todo.item.replace(/ /g,'-')!== req.params.item;
 //      });
 //     res.json(data);
	});
};












