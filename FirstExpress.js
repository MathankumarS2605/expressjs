
//node js feature require()
var expr=require('express');
//Initailiaze expressjs
var app=expr();
//body parser is required to retreive data sent through POST request
var bparser=require('body-parser');
//Initialize the body parser
bparserinit=bparser.urlencoded({extended:false});

var users=[{userID:"100",firstName:"Aakash",lastName:"S"},
{userID:"101",firstName:"Sri",lastName:"Vishnu"},
{userID:"102",firstName:"Ashfaq",lastName:"Kumar"},
{userID:"103",firstName:"Sandy",lastName:"Santhosh"},
{userID:"104",firstName:"Aravind",lastName:"Kumar"}
];
var visitorCount=0;



//request represents the Http request
//request represents the Http request

function welcome(req,res){
    var today=new Date();
    visitorCount++;
    var resp="<html><body><h1>Today:"+today+"</h1><br><br><h1>Visitor Count:"+visitorCount+"</h1></body></html>";
    res.send(resp);
}

function retriveUser(req, res) {
    var usersStr="";
    for(var i=0;i<users.length;i++){
        usersStr = usersStr+users[i].firstName + " " + users[i].lastName +", ";
    }
    res.send(usersStr);
}

function getUserById(req, res) {
    var userId=req.query.id;
    for(var i=0;i<users.length;i++){
        if(users[i].userID==userId){
            res.send(users[i]);
        }
    }
}
function addNewUser(req,res){
    var userid=req.body.userID;
    var first_Name=req.body.firstName;
    var last_Name=req.body.lastName;
    users.push({userID:userid,firstName:first_Name,lastName:last_Name});
    res.send("<html><head></head><body><h1>User added successfully</h1>"+users.length+"</body></html>");
}
function deleteUser(req, res) {
    var userId=req.query.id;
    for(var i=0;i<users.length;i++){
        if(users[i].userID==userId){
            users.splice(i,1);
            break;
        }
    }
    res.send(users);
}

app.post('/addUser',bparserinit,addNewUser);
app.get("/getUser",retriveUser);
app.get("/getUserById",getUserById);
app.get("/deleteUser",deleteUser);
app.get('/welcome',welcome);
app.get('/',home);
app.put('/updateUser',bparserinit,updateUser);

function home(req,res){
    var resp="<html><body><h1>Welcome to our site </h1> <a href='/welcome'>Welcome</a> </body></html>";
    res.send(resp);
}
app.listen(3000,()=>{ 
    console.log("Server is running on port 3000");
});


