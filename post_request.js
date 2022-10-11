const http = require('https');
var options={
    host:'reqres.in',
    path:'/api/users',
    method:'POST'
};
callback=function(response){
    var str='';
    response.on('data',function(chunk){
        str+=chunk;
    });
    response.on('end',function(){
        console.log('SK@',JSON.parse(str));
    });
}
var req=http.request(options,callback);
req.write("Hello World i am saurav ji ");

req.end();

