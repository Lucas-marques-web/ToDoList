
const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname +'/date.js');
const mongoose = require('mongoose');
const _ = require("lodash");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set('view engine', 'ejs');


mongoose.set(`strictQuery`, true);
// creating a db 
mongoose.connect('mongodb://127.0.0.1:27017/ToDoListDb', {useNewUrlParser: true});



// creating a collection
const itemsSchema = {
  name: String
};
const Item = mongoose.model('Item',itemsSchema);

// another way
const workItem = mongoose.model('WorkItem',{
  name:{
    type:String,
    required:true
  },
  items:[itemsSchema]
});


// const items=['Cooking','Cleaning','Playing'];
// const workItems= [];
const item1 = new Item({
  name:'Add tasks on + '
});
const item2 = new Item({
  name:'Delete on the checkbox '
});
const item3 = new Item({
  name:'create a item before delete '
});
const defaultItems = [item1,item2,item3];


// creating a get route 
app.get('/', function (req, res) {

  //show collection 
  Item.find({},function(err,item){
    if(item.length === 0){
      
      // Inserting array inside collection
        Item.insertMany(defaultItems,function(err){
        if(err){
          console.log(err);
        }else{
          console.log('saved successfully');
        }
        });
        res.redirect('/');
    }else{
      res.render('list', { listTitle: 'Today', Input:item});
    }
    });
  // console.log(date.getDate)
  // let day = date.getDate;
 
});


// creating a new toDoList with the input 
app.get('/:customerInput',function(req,res){
const customerInput =_.capitalize(req.params.customerInput);

workItem.findOne({name:customerInput},function(err,foundList){
  if(!err){
    if(!foundList){
      // creating a new list
      const list = new workItem({
        name:customerInput,
        items:defaultItems
      });
      list.save();
      res.redirect('/'+customerInput);
    }else{
      // show existing list
      res.render('list',{listTitle:foundList.name,Input:foundList.items})
    }
  }
})
});


app.post('/', function (req, res) {
  
  const input = req.body.input; 
  const save = req.body.list;
  const itemAdd = new Item({
    name:input
  });

  if(save=== 'Today'){
    itemAdd.save();
    // items.push(input)
    res.redirect('/');
  
  }else{
    workItem.findOne({name:save},function(err,foundList){
      foundList.items.push(itemAdd);
      foundList.save();
      res.redirect('/'+save)
    })
  }

 
}
)
app.post('/delete',function(req,res){
  const deleteItem = req.body.checkbox;
  const listName = req.body.listName;

    if(listName ==='Today'){
    
      Item.findByIdAndRemove(deleteItem,function(err){
        if(!err){
          console.log('succefully deleted')
          res.redirect('/');
        }else{
          console.log(err);
          
        }
      });
    }else{
      workItem.findOneAndUpdate({name:listName},{$pull: {items: {_id:deleteItem}}}, function(err,foundList){
        if(!err){
          res.redirect('/'+ listName);
        }
      })
    }

 
})

 
  // app.get('/work',function( req,res){
  // res.render('list',{ listTitle:'Work', Input:workItems})
  
  // })

// app.post('/work',function(req,res){

//   console.log(req.body);
//   let input = req.body.input;

//   if(req.body.list === "Work"){
//     workItem.push(input);
//     res.redirect('/work');
  
//   }else{
//     Item.push(input);
//     res.redirect('/');
//   }
// });


app.get('/about',function(req,res){
res.render('about');
})

 




app.listen(3000, function () {
  console.log('server on , port 3000')
});

