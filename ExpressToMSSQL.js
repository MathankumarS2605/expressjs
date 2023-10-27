var mssql=require('mysql');
var expr=require('express');
var app=expr();
var queryResult;
const mssqlconnection=mssql.createConnection({
    host:'localhost',
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
    
    app.get("/getAllUser",getAllUser);

   

    app.listen(8080,function(){
        console.log("server started");
    })
}

















