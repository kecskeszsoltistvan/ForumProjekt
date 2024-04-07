require("dotenv").config();
var mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
app.use(cors());

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASS,
    database        : process.env.DBNAME
});

// MIDDLEWARES
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send('Backend APi from Kisbarát to Neked');
})

// --------------------
//      Endpoints
// --------------------
/*
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
*/
// POST new user
app.post("/users", cors(), (req, res)=>{
    let data  = req.body;
    pool.query(`INSERT INTO users (id, name, email, password) VALUES(NULL, "${data.name}", "${data.email}", "${data.password}")`, (error, results)=>{
        if (error) throw res.status(500).send(error);
        res.status(200).send(results);
    });

})

// login
app.get("/login/:email", cors(), (req, res)=>{
    let data  = req.params.email;
    pool.query(`SELECT * FROM users WHERE email = "${data}"`, (error, results)=>{
        if (error) throw res.status(500).send(error);
        res.status(200).send(results);
    });

})

// PATCH one user by PK
app.patch("/users/:pk", cors(), (req, res)=>{
    let pk = req.params.pk;
    let data  = req.body;
    pool.query(`UPDATE users SET name="${data.name}", email="${data.email}", password="${data.password}" WHERE ID=?`, pk, (error, results)=>{
        if (error) throw res.status(500).send(error);
        res.status(200).send(results);
    });

})

// DELETE one user by PK
app.delete("/users/:pk", cors(), (req, res)=>{
    let pk = req.params.pk;
    pool.query(`DELETE FROM users WHERE ID=?`, pk, (error, results)=>{
        if (error) throw res.send(error);
        
        res.send(results);
    });
})

// GET table
app.get("/:table", cors(), (req, res)=>{
    let table = req.params.table;
    pool.query(`SELECT * FROM ${table}`, (error, results)=>{
        if (error) throw res.send(error);
        res.send(results);
    });
})

// GET table/field/op/value
app.get("/:table/:field/:op/:value", cors(), (req, res)=>{
    let table = req.params.table;
    let field = req.params.field;
    let op = req.params.op;
    let value = req.params.value;

    op = getOp(op);
    if(op == "like"){
        value = `%${value}$`;
    }

    pool.query(`SELECT * FROM ${table} WHERE ${field} ${op} '${value}' `, (error, results)=>{
        if (error) throw res.send(error);
        res.send(results);
    });
})

//DELETE record by id
app.delete("/:table/:id", cors(), (req, res)=>{
    let id = req.params.id;
    let table = req.params.table;
    
    pool.query(`DELETE FROM ${table} WHERE ID=${id}`, (error, results)=>{
        if (error) throw res.send(error);
        res.send(results);
    })
})

//GET posts from category
app.get("/posts/category/:id", cors(), (req, res)=>{
    let id = req.params.id;

    pool.query(`SELECT posts.ID, posts.user_id, posts.category_id, posts.title, posts.text, posts.created_at FROM posts JOIN categories ON posts.category_id = categories.ID WHERE posts.category_id = ${id}`, (error, results)=>{
        if (error) throw res.send(error);
        res.send(results);
    })
}) 

//POST post to category
app.post("/posts/category/:id", cors(), (req, res)=>{
    let id = req.params.id;
    let data = req.body;
    
    pool.query(`INSERT INTO posts (user_id, category_id, title, text, created_at) VALUES ( ${data.user_id}, ${id}, "${data.title}", "${data.text}", "${data.created_at}")`, (error, results)=>{
        if (error) throw res.send(error);
        res.send(results);
    })
})


// PATCH post by PK
app.patch("/posts/:id", cors(), (req, res)=>{
    let id = req.params.id;
    let data  = req.body;
    
    pool.query(`UPDATE posts SET title="${data.title}", text="${data.text}" WHERE ID=${id}`, (error, results)=>{
        if (error) throw res.status(500).send(error);
        res.status(200).send(results);
    });

})

// POST new category
app.post("/categories", cors(), (req, res)=>{
    let data = req.body;

    pool.query(`INSERT INTO categories (ID, title, body, created_at) VALUES(NULL, "${data.title}", "${data.body}", "${data.created_at}")`, (error, results)=>{
        if (error) throw res.status(500).send(error);
        res.status(200).send(results);
    })
})

// PATCH category by id
app.patch("/categories/:id", cors(), (req, res)=>{
    let id = req.params.id;
    let data = req.body;

    pool.query(`UPDATE categories SET title="${data.title}", body="${data.body}", created_at="${data.created_at}" WHERE ID=${id}`, (error, results)=>{
        if (error) throw res.status(500).send(error);
        res.status(200).send(results);
    })
})

//POST cooment to post
app.post("/comments/post/:id", cors(), (req, res)=>{
    let id = req.params.id;
    let data = req.body;
    
    pool.query(`INSERT INTO comments (post_id, user_id, text, created_at) VALUES ( ${id}, ${data.user_id}, "${data.text}", "${data.created_at}")`, (error, results)=>{
        if (error) throw res.send(error);
        res.send(results);
    })
})

// PATCH comment by PK
app.patch("/comments/:id", cors(), (req, res)=>{
    let id = req.params.id;
    let data  = req.body;
    
    pool.query(`UPDATE comments SET text="${data.text}" WHERE ID=${id}`, (error, results)=>{
        if (error) throw res.status(500).send(error);
        res.status(200).send(results);
    });

})


function getOp(op){
    switch(op){
      case 'eq': {op = '='; break}
      case 'lt': {op = '<'; break}
      case 'gt': {op = '>'; break}
      case 'lte': {op = '<='; break}
      case 'gte': {op = '>='; break}
      case 'not': {op = '!='; break}
      case 'lk': {op = ' like '; break}
    }
    return op;
  }

app.listen(port, ()=>{
    console.log(`Én csak itt hallgatózok a ${port} porton...`);
})