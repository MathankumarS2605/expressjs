var mssql=require('mysql');
var expr=require('express');
var app=expr();
var bparser=require('body-parser');
var statusMessage;
bparserinit=bparser.urlencoded({extended:false});
var queryResult;
var cors=require('cors');
//initializing the express js
app.use(cors());
app.use(expr.json());
const mssqlconnection=mssql.createConnection({
    localhost:'localhost',
    user:'root',
    password:'root',
    database:'world',
    port:3306
});




function feedback(error){
    if(error != undefined){
        console.log(error);

    }
    else{
            console.log("open the browser");
    }
}
    function checkConnection(error){
        if(error!=undefined){
            console.log(error);
        }
        else{
            console.log("Connection established successfully");
        }
    }
    mssqlconnection.connect(checkConnection);

    function provideAllUser(error,result){
        queryResult=result;
        console.log(result);
    }
    function getAllUser(req,res){
             mssqlconnection.connect(checkConnection);
             mssqlconnection.query("Select * from  Users",provideAllUser);
             res.send(queryResult);
    }
   function provideUser(error,result){
        queryResult = result;
        console.log(result);
    }
    function getUserById(req,res){
        var userId=req.query.uid;
        mssqlconnection.query("SELECT * FROM Users WHERE username=?",userId,provideUser);
        res.send(queryResult);
    }

    function provideInsertUser(error,result){
        (error == undefined) ? statusMessage="<h1>inserted successfully<body><h1></html>" : statusMessage="";
        console.log(result);
    }
    function insertUser(req,res){
        var username=req.body.username;
        var password=req.body.password;
        var email=req.body.email;
        mssqlconnection.query("INSERT INTO Users (UserName,Password,emailId) VALUES (?,?,?)",[username,password,email],provideInsertUser);
        mssqlconnection.commit();
        res.send(statusMessage);
    }

    function provideUpdateUser(error,result){
        queryResult = result;
        console.log(result);
    }
    
    app.get("/checkUser",checkUser);
    function checkUser(req,res){
        var username1=req.query.username;
        var password1=req.query.password;
        mssqlconnection.query("SELECT * FROM Users WHERE UserName=? and Password=? ",[username1,password1],function(err,result){
            res.send(result);
        });
    }
   
    function updateUser(req,res){
        var username=req.body.username;
        var password=req.body.password;
        var email=req.body.email;
        //var id=req.body.id;
        mssqlconnection.query("UPDATE Users SET UserName=?,Password=?,emailId=? WHERE UserName=?",[username,password,email,username],provideUpdateUser);
        mssqlconnection.commit();
        res.send(queryResult);
    }

    function deleteUser(req,res){
        var username1=req.query.username;
        mssqlconnection.query("DELETE FROM Users WHERE UserName=? ",username1,provideUpdateUser);
        mssqlconnection.commit();
        res.send(queryResult);
    }
    app.get("/getContacts",getAllContact);
    function getAllContact(req,res){
        mssqlconnection.connect(checkConnection);
        mssqlconnection.query("Select * from  Contacts",provideAllContact);
        res.send(queryResult);
    }
    function provideAllContact(error,result){
        queryResult=result;
        console.log(result);
    }
     app.post("/addContact",bparserinit,addContact);
    function addContact(req,res){
        var firstName=req.body.firstname;
        var lastName=req.body.lastname;
        var emailId=req.body.email;
        var phoneNo=req.body.phone;
        var Address=req.body.address;
        mssqlconnection.query("INSERT INTO Contacts (firstName,LastName,emailId,phoneNumber,Address) VALUES (?,?,?,?,?)",[firstName,lastName,emailId,phoneNo,Address],provideAllContact);
        mssqlconnection.commit();
        res.send(queryResult);
    }
    app.put("/updateContact",bparserinit,updateContact);
    function updateContact(req,res){
        var firstName=req.body.firstname;
        var lastName=req.body.lastname;
        var emailId=req.body.email;
        var phoneNo=req.body.phone;
        var Address=req.body.address;
        mssqlconnection.query("Update Contacts Set firstname=?,LastName=?,emailId=?,phoneNumber=?,Address=? where firstName=? ",[firstName,lastName,emailId,phoneNo,Address,firstName],provideAllContact);
        //  mssqlconnection.query("UPDATE Users SET UserName=?,Password=?,emailId=? WHERE UserName=?",[username,password,email,username],provideUpdateUser);
        mssqlconnection.commit();
        res.send(queryResult);
    }
    app.delete("/deleteContact",deleteContact);
    function deleteContact(req,res){
        var firstName=req.query.firstname;
        mssqlconnection.query("DELETE FROM Contacts WHERE firstname=? ",firstName,provideAllContact);
        mssqlconnection.commit();
        res.send(queryResult);

    }
    app.get("/getAllUser",getAllUser);
    app.get("/getUserById",getUserById);
    app.post("/insertUser",bparserinit,insertUser);
    app.post("/updateUser",bparserinit,updateUser);
    app.delete("/deleteUser",deleteUser);

    
    app.listen(8080,feedback);

















