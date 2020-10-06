var http = require('http');
var fs = require('fs');
var url = require('url');
var dot = require('dotenv').config();

var app = http.createServer((request,response) => {
    var URL = request.url;
    var queryData = url.parse(URL, true).query;
    console.log(queryData.id);
    var pathName = url.parse(URL, true).pathname;
    var Href = url.parse(URL, true).href;
    var Title = queryData.id;

    console.log(url.parse(URL, true));

    if (pathName == '/') {
      if (Href == '/') {
        fs.readFile(`data/Welcome`, 'utf-8', (err, data) => {
          var Template = 
            `<!doctype html>
              <html>
                <head>
                  <title>WEB1 - ${Title}</title>
                </head>
                <body>
                  <h1><a href="/">WEB</a></h1>
                  <ol>
                    <li><a href="/?id=HTML">HTML</a></li>
                    <li><a href="/?id=CSS">CSS</a></li>
                    <li><a href="/?id=JavaScript">JavaScript</a></li>
                  </ol>
                  ${data}
                </body>
              </html>
            `;
          response.writeHead(200);
          response.end(Template);
        });
      }
      else{
        fs.readFile(`data/${Title}`, 'utf-8', (err, data) => {
          var Template = 
            `<!doctype html>
              <html>
                <head>
                  <title>WEB1 - ${Title}</title>
                </head>
                <body>
                  <h1><a href="/">WEB</a></h1>
                  <ol>
                    <li><a href="/?id=HTML">HTML</a></li>
                    <li><a href="/?id=CSS">CSS</a></li>
                    <li><a href="/?id=JavaScript">JavaScript</a></li>
                  </ol>
                  <h2>${Title}</h2>
                  <p style="margin-top:45px;">
                  ${data}
                  </p>
                </body>
              </html>
            `;
          response.writeHead(200);
          response.end(Template);
        });
      }
    }
    else{
      response.writeHead(404);
      response.end('Error404 Not Found');
    }
});

var port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log(`Server Starting at http://localhost:${port}`);
});


// URL === http://opentutorials.org:3000/main?id=HTML&page=12
// http : Protocol / opentutorials.org : Host(Domain)
// 3000 : Port / main : Path / id=HTML&page=12 : Query String

// Path = 파일의 경로 
// Query String은 ?로 시작, 값의 이름과 값은 =로 구분, 값과 값은 &로 구분