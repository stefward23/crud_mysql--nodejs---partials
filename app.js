const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
require("dotenv").config();

const router = express.Router();
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SERVER_PORT = process.env.SERVER_PORT;

const connection = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    return console.log("err", err);
  }
  console.log("Connected to the database");
});

router.get("/", function (req, res){
    res.render("index")
    
})

router.post("/", function(req, res){
 

  let sql = `INSERT INTO test (UserName,Email) VALUES ("${req.body.name}","${req.body.email}")`


  connection.query(sql, (err,result) => {
    if (err) 
    { throw err }

    console.log('Data uploaded')
    res.redirect("/")
  })

})

router.get("/about", (req, res) => {

  let sql = `SELECT * FROM test`

  connection.query(sql, (err, result) => {
    if (err) 
    {throw err}
    res.render("about", {test: result})
  })
})

router.get("/update", (req, res) => {

    let sql = `SELCT * FROM test WHERE id ="${req.query.id}"`

    connection.query(sql, (result, err) => {
      if (err) console.log(err)
      
      res.render('update', {test: result})
    })
  })




app.use("/", router);
app.listen(SERVER_PORT);
console.log(`Server is running on port ${SERVER_PORT}`);

