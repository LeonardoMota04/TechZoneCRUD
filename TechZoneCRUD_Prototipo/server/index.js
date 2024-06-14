import express from "express"
import mysql from "mysql2"
import cors from "cors"

const app = express()
app.use(express.json()) // permite mandar json usando algum client
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "040593@040593",
    database: "TechZoneDB"
})

// se problema de autenticacao
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '040593@040593';



app.get("/", (req, res) => {
    res.json("Olá")
})
// CRUD
// READ (TUDO)
app.get("/products", (req, res) => {
    const query = "SELECT * FROM products"
    db.query(query, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// READ (ESPECIFICO)
app.get('/products/byID/:id', (req, res) => {
    const id = req.params.id
    const query = "SELECT * FROM products WHERE product_ID = ?"

    db.query(query, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0])
    })
})

// CREATE
app.post("/products", (req, res) => {
    const query = "INSERT INTO products (`product_name`, `product_description`, `product_price`, `product_image`) VALUES (?)"
    const values = [
        req.body.product_name,
        req.body.product_description,
        req.body.product_price,
        req.body.product_image,
    ]

    db.query(query, [values], (err,data)=> {
        if(err) return res.json(err)
        return res.json("produto criado")
    })
})

// DELETE
app.delete("/products/:id", (req, res) => {
    const productID = req.params.id;
    const query = "DELETE FROM products WHERE product_ID = ?"

    db.query(query,[productID], (err,data) => {
        if(err) return res.json(err)
        return res.json("produto apagado")
    })
})

// UPDATE
app.put("/products/:id", (req, res) => {
    const productID = req.params.id;
    const query = "UPDATE products SET `product_name` = ?, `product_description` = ?, `product_price` = ?, `product_image` = ? WHERE product_ID = ?"

    const values = [
        req.body.product_name,
        req.body.product_description,
        req.body.product_price,
        req.body.product_image,
    ]

    db.query(query,[...values, productID], (err,data) => {
        if(err) return res.json(err)
        return res.json("produto atualizado.")
    })
})
app.listen(8800, ()=> {
    console.log("connected to backend!")
})