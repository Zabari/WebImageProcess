var express = require('express');
var app = express();
var session = require('express-session');
var Database = require('better-sqlite3');
var shell = require('shelljs');
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "you-don't-know-this",
  commands:[{command:"color",params:"blue"}],
  filenames:["image.jpg"]
}));
// var x=shell.exec("convert",{silent:true});
// console.log(x.stdout);
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies


app.post('/api/add', function (req, res) {
    var db = new Database('processes.db');
    db.prepare("CREATE TABLE IF NOT EXISTS files(id PRIMARY KEY, filename TEXT)").run();
    var stmt=db.prepare("INSERT INTO files (filename) VALUES(?);");
    stmt.run(0);
    stmt=db.prepare("SELECT last_insert_rowid()");
    var id=stmt.get()['last_insert_rowid()'];
    db.close();
    var url=req.body.url;
    req.session.filenames.push(id);
    shell.exec("curl "+url+" > "+id);
    res.send(req.session.filenames);
});


app.post('/api/edit', function (req, res) {
  var command=req.body.command;
  var filename=req.session.filenames[req.session.filenames.length-1];
  req.session.commands.push(command);
  var db = new Database('processes.db');
  db.prepare("CREATE TABLE IF NOT EXISTS files(id PRIMARY KEY, filename TEXT)").run();
  var stmt=db.prepare("INSERT INTO files (filename) VALUES(?);");
  stmt.run(filename);
  stmt=db.prepare("SELECT last_insert_rowid()");
  var id=stmt.get()['last_insert_rowid()'];
  db.close();
  var url=req.body.url;
  req.session.filenames.push(id);
  var str="";
  if (command.command=="color"){
      str="convert "+filename+" -fill "+command.params[0]+" -colorize "+command.params[1]+" "+id;
      // console.log(str);
      shell.exec(str);
  }
  res.send(req.session.filenames);
});

// app.get('/api/edit', function (req, res) {
//   var command={command:"color",params:["#67AD22",50]};
//   var filename="image.jpg";
//   var str="";
//   //req.session.commands.push(command);
//   if (command.command=="color"){
//       str="convert "+filename+" -fill \""+command.params[0]+"\" -colorize "+command.params[1]+" "+filename;
//       shell.exec(str);
//   }
//   res.send();
// });

// app.post('/api/save', function (req, res) {
//     db.prepare("CREATE TABLE IF NOT EXISTS process(id PRIMARY KEY, name TEXT, commands BLOB)").run();
//     var stmt=db.prepare("INSERT INTO process VALUES(?,?);SELECT id FROM process WHERE id = SCOPE_IDENTITY();")
//     var id=stmt.get(req.body.name,JSON.stringify(req.state.commands));
//     res.send(id);
// });
app.post('/api/save', function (req, res) {
    var db = new Database('processes.db');
    db.prepare("CREATE TABLE IF NOT EXISTS process(id PRIMARY KEY, name TEXT, commands BLOB)").run();
    var stmt=db.prepare("INSERT INTO process (name, commands) VALUES(?,?);");
    stmt.run(req.body.name,JSON.stringify(req.session.commands));
    stmt=db.prepare("SELECT last_insert_rowid()");
    var id=stmt.get()['last_insert_rowid()'];
    // console.log(id);
    // var stmt=db.("INSERT INTO process (name, commands) VALUES(?,?);","name",JSON.stringify(req.session.commands));
    db.close();
    res.send({id});
});

// app.post('/api/save', function (req, res) {
//   var todo=req.body.todo;
//   var finished=req.body.finished;
//   db.prepare("DROP TABLE IF EXISTS todo").run();
//   db.prepare("CREATE TABLE IF NOT EXISTS todo(items BLOB, finished BLOB)").run();
//   var stmt=db.prepare("INSERT INTO todo VALUES(?,?)")
//   stmt.run(JSON.stringify(todo),JSON.stringify(finished));
//   res.send();
// });
// app.post('/api/load', function (req, res) {
//   // console.log(req.body);
//   // db.prepare("DROP TABLE todo").run();
//   var stmt = db.prepare("SELECT * FROM todo");
//   var json=stmt.get();
//   res.send(json);
//
// });
//

var port = 3001;
app.listen(port);
console.log('listening on Port ' + port + '....');
