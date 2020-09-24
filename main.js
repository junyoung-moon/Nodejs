var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var URL = request.url;
    var queryData = url.parse(URL, true).query;
    console.log(queryData);
    if(request.url == '/'){
      URL = '/index.html';
    }
    if(request.url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    console.log(__dirname+URL);
    response.end(fs.readFileSync(__dirname + URL));
 
});
app.listen(8050);


// URL === http://opentutorials.org:3000/main?id=HTML&page=12
// http : Protocol / opentutorials.org : Host(Domain)
// 3000 : Port / main : Path / id=HTML&page=12 : Query String

// Path = 파일의 경로 
// Query String은 ?로 시작, 값의 이름과 값은 =로 구분, 값과 값은 &로 구분