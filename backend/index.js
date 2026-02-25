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
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been created successfully.")
    })
})

// http://localhost:8800/books/:id
// get // it's to get data
app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;

  const q = "SELECT * FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Not found");

    res.json(data[0]);
  });
});
// put // it's to edit data
app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})
// delete // it's to delete data
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully.")
    })
})


app.listen(8800, ()=>{
    console.log("BACKEND ON!")
})
