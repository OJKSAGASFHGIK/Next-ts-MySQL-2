import express from "express";
import mysql from "mysql2";

const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "vicky",
    database: "next-ts-mysql"
});

app.get("/", (req, res)=>{
    res.json("Hello, it's the backend.")
})
app.get("/books", (req, res)=>{
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    }) 
})

app.listen(8800, ()=>{
    console.log("BACKEND ON!")
})