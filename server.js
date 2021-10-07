const http = require("http");
const fs = require("fs");

http
   .createServer(function (req, res) {
      //this is a get
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

      //this is a post
      if (req.url === "/create-a-file" && req.method === "POST") {
         let body = "";

         req.on("data", function(data){
            body += data.toString();
         });

         req.on("end", function(){
            let parsedBody = JSON.parse(body);

            fs.writeFile(parsedBody.fileName, parsedBody.message, function(err){
               if (err) {
                  res.end(err);
               } else {
                  res.end("File Created")
               }
            });
         });  
      }//do not put semicolon here


      //this is an update NOT using PUT but still using POST
      if(req.url === "/update-a-file" && req.method === "POST"){
         let body = "";

         req.on("data", function(data){
            body += data.toString();
         })

         req.on("end", function(){
            let parsedBody = JSON.parse(body);

            fs.appendFile(
               parsedBody.fileName, 
               `\n${parsedBody.message}`, 
               function(err){
                  if(err){
                     res.end(err);
                  } else {
                     res.end("Updated File");
                  }
               }
            )
         })
      }
   })
   .listen(3000, function() {
      console.log("server started");
   });