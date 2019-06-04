var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var md5 = require('md5');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sampledb'
});

connection.connect(function(error) {
    if(!!error) {
        console.log('Error');
    } else{
        console.log('Connected');
    }
});

app.get('/',function(req,resp){
    var log_userid = req.body.userid;
    var log_passwd = req.body.passwd;
})

app.post('/signup', function(req,resp){
    var reg_userid = req.body.userid;
    var reg_email = req.body.email;
    var reg_passwd = md5(req.body.passwd);
    connection.query('INSERT INTO users (ID, Name, Email, Password) VALUES (NULL, ?, ?, ?)',[reg_userid,reg_email,reg_passwd],function(error){
        if(!!error){
            console.log("Query not executed"+error);
        }
        else{
            console.log("Executed");
        }
    });
    console.log(req.body);
    resp.send(reg_userid+' '+reg_passwd);
});

app.post('/login', function(req,resp){
    var log_userid = req.body.userid;
    var log_email = req.body.email;
    var log_passwd = md5(req.body.passwd);
    console.log(log_passwd);
    connection.query('SELECT * FROM USERS WHERE Name=? AND Password=?',[log_userid,log_passwd],function(error, result){
        if(result.length > 0){
            console.log('Validated');
            resp.send('Validated');
        }
        else{
            console.log('Incorrect Username and/or Password!');
            resp.send('Incorrect Username and/or Password!');
        }
        resp.end();
        console.log(req.body);
    });
});

app.listen(1337);