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

app.post('/', function(req,resp){
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

app.listen(1337);