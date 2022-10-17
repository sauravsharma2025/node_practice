const http=require('http');
const fs= require('fs');
const server=http.createServer(function(req,res){
    fs.readFile(`${__dirname}/myfile.txt}`,(err,data)=>{
        res.end(data);
    })
})
server.listen(3000);