var express = require('express');
var app = express();
var session = require('express-session');
var Database = require('better-sqlite3');
var shell = require('shelljs');
const download = require('image-downloader');
const pubdir="frontend/webapp/public/images/";
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "you-don't-know-this",
    commands:[]
}));
// var x=shell.exec("convert",{silent:true});
// console.log(x.stdout);
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies


app.post('/api/add', function (req, res) {

    var db = new Database('processes.db');
    db.prepare("CREATE TABLE IF NOT EXISTS files(filename TEXT)").run();
    var stmt=db.prepare("INSERT INTO files (filename) VALUES(?);");
    stmt.run(0);
    stmt=db.prepare("SELECT last_insert_rowid()");
    var id=stmt.get()['last_insert_rowid()'];
    db.close();
    var url=req.body.url;
    shell.mkdir("-p",pubdir);
    const options = {
        url: url,
        dest: pubdir+id+".jpg"                 // Save to /path/to/dest/image.jpg
    };
    download.image(options)
    .then(({ filename, image }) => {
        console.log('File saved to', filename)
        res.send({id});
    })
    .catch((err) => {
        console.error(err)
    });

    // console.log(req.session);

    // var str="curl "+url+" > "+pubdir+id;
    // console.log(str);

    // shell.exec(str,{silent:true});
});
app.post('/api', function (req, res) {
    res.send(req.session);
});
app.post('/api/undo', function (req, res) {
    // var filename=parseInt(req.body.filename);
    var filename=req.body.filename;

    //console.log(typeof filename);
    var db = new Database('processes.db');
    db.prepare("CREATE TABLE IF NOT EXISTS files(filename TEXT)").run();
    var stmt=db.prepare("SELECT filename FROM files WHERE rowid=?");
    var id=stmt.get(filename);
    console.log(id);
    if (id){
        db.prepare("DELETE FROM files WHERE rowid=?").run(filename);

        db.close();
        shell.rm(pubdir+filename+".jpg");
        console.log(typeof id.filename);
        res.send({id:parseInt(id.filename).toString()});
    }
    res.send();
});


app.post('/api/edit', function (req, res) {
    var command=req.body.command; //{command:command params:[param1,param2]}
    var params=req.body.params;
    var filename=req.body.filename;
    console.log(command);
    // command=JSON.parse(command);
    if (!req.session.commands){
        req.session.commands=[];
    }
    req.session.commands.push(command);
    var db = new Database('processes.db');
    db.prepare("CREATE TABLE IF NOT EXISTS files(filename TEXT)").run();
    var stmt=db.prepare("INSERT INTO files (filename) VALUES(?);");
    stmt.run(filename);
    stmt=db.prepare("SELECT last_insert_rowid()");
    var id=stmt.get()['last_insert_rowid()'];
    db.close();
    var url=req.body.url;
    var str="";
    if (command=="color"){
        console.log("made it");
        str="convert "+pubdir+filename+".jpg -fill \""+params[0]+"\" -colorize "+params[1]+" "+pubdir+id+".jpg";
    }
    if (command=="crop"){
        console.log(params);
        if (params[1]>=0){
            params[1]="+"+params[1].toString();
        }
        else{
            params[1]=params[1].toString();
        }
        if (params[2]>=0){
            params[2]="+"+params[2].toString();
        }
        else{
            params[2]=params[2].toString();
        }
        str="convert "+pubdir+filename+".jpg -crop '"+params[0]+params[1]+params[2]+"' "+pubdir+id+".jpg";
    }
    if (str){
        console.log(str);
        shell.exec(str);
    }
    res.send({id});
});



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
