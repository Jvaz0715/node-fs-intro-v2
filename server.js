const http = require("http");
const fs = require("fs");

http
   .createServer(function (req, res) {
      if(req.url === "/") {
         // for readFile to read your html, replace text.txt with index.html
         fs.readFile("text.txt", function(err, data){
            if (err) {
               res.end(err);
            } else {
               res.writeHead(200, { "content-Type": "text/html" });
               res.write(data);
               
               return res.end();
            }
         })
      }

      if (req.url === "/create-a-file" && req.method === "POST") {
         res.end("OK!")
      }
   })
   .listen(3000, function() {
      console.log("server started");
   });