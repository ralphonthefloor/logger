const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs/promises");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

async function initLogFile(req) {
  try {
    let time = new Date();
    time = time.toLocaleString();
    const content = "Logger started at " + time + "...\n";
    await fs.writeFile(__dirname + '/logs/log.txt', content, { flag: 'a' });
  } catch (err) {
    console.log(err);
  }
}
initLogFile();

//new log entry
app.post("/log", function(req,res){

let time = new Date();
time = time.toLocaleString();

console.log(req.body);

  async function appendLog(req) {
    try {
      const content = time + ": " + req.body.entry + "\n";
      await fs.appendFile(__dirname+ '/logs/log.txt', content, { flag: 'a' });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
  appendLog(req);

});

//start server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
