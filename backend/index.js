import express from "express";
import sqlite3 from "sqlite3";  // replaced mysql2 with sqlite3
import cors from "cors";

const app = express();

// Connect to SQLite database (creates the file if it doesn't exist)
const db = new sqlite3.Database("./books.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
    // Create the books table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        "desc" TEXT,        -- 'desc' is a keyword, so it's quoted
        price REAL,
        cover TEXT
      )
    `);
  }
});

app.use(express.json());
app.use(cors());

// http://localhost:8800/
app.get("/", (req, res) => {
  res.json("Hello, it's the backend.");
});

// http://localhost:8800/books
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.all(q, [], (err, rows) => {      // db.all returns all rows
    if (err) return res.json(err);
    return res.json(rows);
  });
});

app.post("/books", (req, res) => {
  const q = `
    INSERT INTO books (title, "desc", price, cover)
    VALUES (?, ?, ?, ?)
  `;
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.run(q, values, function (err) {   // use db.run for INSERT/UPDATE/DELETE
    if (err) return res.json(err);
    return res.json("Book has been created successfully.");
  });
});

// http://localhost:8800/books/:id
app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM books WHERE id = ?";

  db.get(q, [bookId], (err, row) => {  // db.get returns a single row
    if (err) return res.status(500).json(err);
    if (!row) return res.status(404).json("Not found");
    res.json(row);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = `
    UPDATE books
    SET title = ?, "desc" = ?, price = ?, cover = ?
    WHERE id = ?
  `;
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
    bookId,
  ];

  db.run(q, values, function (err) {
    if (err) return res.json(err);
    // this.changes gives the number of affected rows (SQLite specific)
    if (this.changes === 0) return res.status(404).json("Book not found");
    return res.json({ message: "Book updated successfully", changes: this.changes });
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.run(q, [bookId], function (err) {
    if (err) return res.json(err);
    if (this.changes === 0) return res.status(404).json("Book not found");
    return res.json("Book has been deleted successfully.");
  });
});

app.listen(8800, () => {
  console.log("BACKEND ON!");
});