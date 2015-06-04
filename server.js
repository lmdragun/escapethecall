var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use( bodyParser.json() );
app.set('view engine', 'hbs')
app.use(express.static( __dirname + '/public'));


app.get("/", function( req, res ){
  res.render("index");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("listening on 3000")
})
//
// app.listen(3000, function(){
//   console.log("app listening on port 3000")
// })
