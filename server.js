const http = require("http");
const fs = require("fs");

http
   .createServer(function (req, res) {
      if(req.url === "/") {
         fs.readFile("index.html", function(err, data){
            if (err) {
               res.end(err);
            } else {
               res.writeHead(200, { "content-Type": "text/html" });
               res.write(data);
               
               return res.end();
            }
         })
      }
   })
   .listen(3000, function() {
      console.log("server started");
   });