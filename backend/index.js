import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

// connecting to the backend
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vicky",
    database: "next-ts-mysql"
});
app.use(express.json()); // allows client send data to backend
app.use(cors());

// http://localhost:8800/
app.get("/", (req, res)=>{
    res.json("Hello, it's the backend.")
})


// http://localhost:8800/books
app.get("/books", (req, res)=>{
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    }) 
})
app.post("/books", (req, res)=>{
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ]

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been created successfully.")
    })
})

app.listen(8800, ()=>{
    console.log("BACKEND ON!")
})
