
const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname +'/date.js')

const app = express();

const items=['Cooking','Cleaning','Playing'];
const workItems= [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set('view engine', 'ejs');



app.get('/', function (req, res) {

  console.log(date.getDate)
  let day = date.getDay;

  res.render('list', { listTitle: day , Input:items});
 
})

app.post('/', function (req, res) {
  let input = req.body.input;
  items.push(input)
  res.redirect('/');

}
)

app.get('/work',function( req,res){
res.render('list',{ listTitle:'Work', Input:workItems})

})

app.post('/work',function(req,res){

  console.log(req.body);
  let input = req.body.input;

  if(req.body.list === "Work"){
    workItems.push(input);
    res.redirect('/work');
  
  }else{
    items.push(input);
    res.redirect('/');
  }
})

app.get('/about',function(req,res){
res.render('about');
})



app.listen(3000, function () {
  console.log('server on , port 3000')
})
