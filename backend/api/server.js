var express = require("express");

var app = express();
var fs = require("fs");
var cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/listUsers", function (req, res) {
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    res.end(data);
  });
});

app.post("/createUser", function (req, res) {
  var User = req.body["user"];
  var fileData;

  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    fileData = JSON.parse(data)["data"];
    var newId = fileData.length + 1;
    User.id = newId;
    console.log(User);
    fileData.push(User);
    newFile = { data: fileData };
    fs.writeFile(
      __dirname + "/" + "users.json",
      JSON.stringify(newFile),
      function writeJSON(err) {
        if (err) return console.log(err);
        console.log("writing to File");
        res.end(JSON.stringify(newFile));
      }
    );
  });
});

app.post("/deleteUser", function (req, res) {
  var fileData;

  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    fileData = JSON.parse(data)["data"];
    var newFile = [];
    fileData.forEach((element) => {
      if (element.id === req.body["userId"]) {
        console.log("WOWOW");
      } else {
        newFile.push(element);
      }
    });
    newFile = { data: newFile };
    fs.writeFile(
      __dirname + "/" + "users.json",
      JSON.stringify(newFile),
      function writeJSON(err) {
        if (err) return console.log(err);
        console.log("writing to File");
        res.end(JSON.stringify(newFile));
      }
    );
  });
});

app.post("/updateUser", function (req, res) {
  var fileData;

  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    fileData = JSON.parse(data)["data"];
    var newFile = [];
    fileData.forEach((element) => {
      if (element.id === req.body["userId"]) {
        newFile.push(req.body["user"]);
      } else {
        newFile.push(element);
      }
    });
    newFile = { data: newFile };
    fs.writeFile(
      __dirname + "/" + "users.json",
      JSON.stringify(newFile),
      function writeJSON(err) {
        if (err) return console.log(err);
        console.log("writing to File");
        res.end(JSON.stringify(newFile));
      }
    );
  });
});

app.listen(8080, function () {
  //var host = server.address().address
  //var port = server.address().port
  console.log("Example app listening at http://%s:%s", "127.0.0.1", "8080");
});
