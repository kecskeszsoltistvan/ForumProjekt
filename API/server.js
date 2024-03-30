require("dotenv").config()
var mysql = require('mysql')
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT
app.use(cors())

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASS,
    database        : process.env.DBNAME
});

// MIDDLEWARES
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.get('/', function (req, res) {
  res.send('Backend APi from Kisbarát to Neked')
})

// --------------------
//      Endpoints
// --------------------

// GET users
app.get("/users", cors(), (req, res)=>{
    pool.query('SELECT * FROM users', (error, results)=>{
        if (error) throw res.send(error);
        res.send(results)
    });
})

// GET one user by pk
app.get("/users/:pk", cors(), (req, res)=>{
    let pk = req.params.pk
    pool.query(`SELECT * FROM users WHERE id=?`, pk, (error, results)=>{
        if (error) throw res.send(error);
        
        res.send(results)
    });
})

// POST new user
app.post("/users", cors(), (req, res)=>{
    let data  = req.body
    pool.query(`INSERT INTO users (id, name, email, password) VALUES(NULL, "${data.name}", "${data.email}", "${data.password}")`, (error, results)=>{
        if (error) throw res.status(500).send(error);
        res.status(200).send(results)
    });

})

// login
app.get("/login/:email", cors(), (req, res)=>{
    let data  = req.params.email
    pool.query(`SELECT * FROM users WHERE email = "${data}"`, (error, results)=>{
        if (error) throw res.status(500).send(error);
        res.status(200).send(results)
    });

})

// PATCH one user by PK
app.patch("/users/:pk", cors(), (req, res)=>{
    let pk = req.params.pk
    let data  = req.body
    pool.query(`UPDATE users SET name="${data.name}", email="${data.email}", password="${data.password}" WHERE ID=?`, pk, (error, results)=>{
        if (error) throw res.status(500).send(error)
        res.status(200).send(results)
    });

})

// DELETE one user by PK
app.delete("/users/:pk", cors(), (req, res)=>{
    let pk = req.params.pk
    pool.query(`DELETE FROM users WHERE ID=?`, pk, (error, results)=>{
        if (error) throw res.send(error);
        
        res.send(results)
    });
})

/*
// Worktimes table
// ------------------------------
// GET all worktimes
app.get("/worktimes", (req, res)=>{
    pool.query('SELECT * FROM worktimes', (error, results)=>{
        if (error) throw res.send(error);
        
        res.send(results)
    });
})

// GET all worktimes Between dates

// GET all worktimes by employee (ID)
app.get("/worktimes/:employee", (req, res)=>{
    let employee = req.params.employee
    pool.query(`SELECT * FROM worktimes WHERE ID=?`, employee, (error, results)=>{
        if (error) throw res.send(error);
        
        res.send(results)
    });
})

// GET all worktimes by employee between dates

// POST new worktimes
// PATCH one worktime by PK
// DELETE one worktime by PK
app.delete("/worktimes/:pk", (req, res)=>{
    let pk = req.params.pk
    pool.query(`DELETE FROM worktimes WHERE ID=?`, pk, (error, results)=>{
        if (error) throw res.send(error);
        
        res.send(results)
    });
})
*/
app.listen(port, ()=>{
    console.log(`A szerver hallgatózik a ${port} porton...`)
})