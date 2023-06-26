const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const multer  = require('multer')
const path = require('path')
const server = express()
const cors = require('cors')

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json())
server.use(cors())
server.use('/assets', express.static(path.join(__dirname, 'uploads')))


// Image Upload
const storage = multer.diskStorage({
	destination: function(req, file, cb){
		return cb(null, "./uploads");
	},
	filename: function(req, file, cb){
		return cb(null, `${file.originalname}`);
	},
});
const upload = multer({ storage});



// DB CONNECT
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "crud-nodeAngular-Anshul",
});
db.connect(function(error){
	if(error){
		console.log("Error connecting to DB");
	}
	else{
		console.log("DB connected succesfully");
	}
});



// SERVER CONNECTING
const port = 8080
server.listen(port, function check(error) {
	if(error){
		console.log("Error...!!!");
	}
	else{
		console.log("Server Started...!!!");
	}
});



//CREATE USER
server.post("/api/user/add", upload.single("image"), (req,res) => {
	let sql = "INSERT INTO `user_details` (`name`,`email`,`mobile`,`address`,`state`,`gender`,`message`,`newsletter`,`image`) VALUES ('" + req.body.name + "','" + req.body.email + "','" + req.body.mobile + "','" + req.body.address + "','" + req.body.state + "','" + req.body.gender + "','" + req.body.message + "','" + req.body.newsletter + "','"+req.body.location+"')";
	db.query(sql, function (error){
		if(error){
			res.send({status:false, message: "User not created",q:sql});
		}
		else{
			res.send({status:true, message:"User created Succesfully", q:sql});
		}
	});
});



//USER LIST
var limit = 5;
var offset;

server.get("/api/user/:page", (req,res) => {
	var pageNo = req.params.page;
	offset = (pageNo-1) * limit;
	sql = "SELECT * FROM `user_details`";
	var totalRows;
	var result = db.query(sql, (error, result)=>{
		totalRows = result.length;
	});

	var sql = "SELECT id,name,email,mobile,address,state,gender,message,image FROM user_details ORDER BY "+sortBy+" "+order+" LIMIT "+offset+", "+limit;
	db.query(sql, function(error, result2) {
		if(error){
			console.log("Error connecting to DB");
		}
		else{
			res.send({status:true , data:result2, pages:Math.ceil(totalRows/limit), q:sql});
		}
	});
});



//GET SINGLE USER
server.get("/api/singleuser/:id", (req, res) => {
	var userId = req.params.id;
	var sql = "SELECT * FROM user_details WHERE id=" + userId;
	db.query(sql, function(error, result){
		if(error){
			console.log("Error connecting to DB");
		}
		else{
			res.send({status:true , res:result});
		}
	});
});



//UPDATE
server.put("/api/user/update/:id", (req,res) => {
	if(req.body.newsletter === false){
		req.body.newsletter = "";
	}
	let sql = "UPDATE user_details SET name='"+req.body.name+"', email='"+req.body.email+"', mobile='"+req.body.mobile+"', address='"+req.body.address+"', state='"+req.body.state+"', gender='"+req.body.gender+"', message='"+req.body.message+"', newsletter='"+req.body.newsletter+"' WHERE id="+req.params.id;
	let a = db.query(sql, (error,result) => {
		if(error){
			res.send({status:false, message:"User update failed"});
		}
		else{
			res.send({status:true, message:"User Data updated succesfully", q:sql});
		}
	});
});



//DELETE
server.delete("/api/user/delete/:id", (req,res) => {
	let sql = "DELETE FROM user_details WHERE id=" + req.params.id + "";
	let query = db.query(sql, (error)=>{
		if(error){
			res.send({status: false, message:"User Delete failed", q:sql});
		}
		else{
			res.send({status:true, message:"User deleted succesfully"});
		}
	});
});



//LOGIN 
server.post("/api/user/login/:name/:pass", (req,res) => {
	let sql = "SELECT * FROM accounts WHERE user_name='" + req.params.name + "' AND password='" + req.params.pass+"'" ;
	let query = db.query(sql, (error, result)=>{
		rows = result.length;
		if(rows === 1){
			res.send({status:true, result:"loggedIn"});
		}
		else{
			res.send({status:false, result:"Invalid Credentials"});
		}
	});
});



//REGISTRATION
server.post("/api/user/register/:email/:user/:pass", (req,res) => {
	let sql = "INSERT INTO `accounts` (`email`, `user_name`, `password`) VALUES ('"+req.params.email+"','"+req.params.user+"','"+req.params.pass+"')";
	let query = db.query(sql, (error) => {
		if(error){
			res.send({status:false, result:"Failed Registration"});
		}
		else{
			res.send({status:true, result:"Account Created"});
		}
	});
});



//SEARCH 
server.get("/api/user/:searchBy/:search", (req,res) => {
	let sql = "SELECT * FROM user_details WHERE "+req.params.searchBy+" LIKE '%"+req.params.search+"%'";
	let query = db.query(sql, (error, result) => {
		if(error){
			res.send({status:false, result:"Failed Searching"});
		}
		else{
			res.send({status:true, data:result});
		}
	});
});



//SORTING
var sortBy = 'name';
var order= 'asc';
server.post("/api/user/sorting/:sortBy/:order", (req,res) => {
	sortBy = req.params.sortBy;
	order = req.params.order;
	let sql = "SELECT * FROM user_details ORDER BY "+sortBy+" "+order+" LIMIT "+offset+", "+limit;
	let query = db.query(sql, (error, result) => {
		if(error){
			res.send({status:false, sqlQuery:sql});
		}
		else{
			res.send({status:true, data:result});
		}
	});
});