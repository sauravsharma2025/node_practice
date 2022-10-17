var http = require('http');
var readline= require('readline')
var fs=require('fs');
const path = require('path');
const staticPath = path.join(__dirname,"../")
const app =http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
//  Routing Section Starts....
//  mongoose.connect('mongodb://localhost:27017/smart_email_system',{
//   useNewUrlParser:true,
//   useUnifiedTopology:true
// });
// var db= mongoose.connection;
// db.on('error',()=>console.log('error in connecting'))
// db.once('open',()=>console.log('Connected to DB'))
 if(req.url==='/'){
  res.write('I am Home Page')
  
 }
 if(req.url==='/get_data') {
  fs.readFile(path.join(__dirname,"../node_practice/database.json"),'utf-8',(err,data)=>{
    if(err){
      console.error(err);
      return
    }
    res.end(data)
  })

 }
 if(req.url==='/post_data'){
  fs.readFile(path.join(__dirname,"../node_practice/input.html"),function(err,html){
    if(err){
      throw err;
    }
    res.writeHeader(200, {"Content-Type": "text/html"});  
    res.write(html);  
    res.end();  
  })
 }
if(req.url==='/noStream'){
  fs.readFile(path.join(__dirname,"../node_practice/myfile.txt"),(err,data)=>{
    console.log(data);
    res.end(data);
})
}
if(req.url==='/withStream'){
var myInterface=readline.createInterface({
  input:fs.createReadStream('fileme.html')
})
var lineno=0;
myInterface.on('line',function(line){
  lineno++;
 res.write(line)
})

}

if(req.url==='/received_data'){

  req.on('data',(d)=>{
    console.log(`Data chunk available: ${d}`)

    // process.stdout.write(d)
  })
}
//Routing Section Ends....


})

app.listen(9000,function(){console.log('listening on 5000');});