const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0101', // Your MySQL password
    database: 'login_system'
});

// --- REGISTER ROUTE ---
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).send({ message: "Username already exists!" });
            }
            return res.status(500).send({ message: "Database error" });
        }
        res.send({ message: "Registration Successful! You can now login." });
    });
});

// --- LOGIN ROUTE ---
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    
    db.query(sql, [username, password], (err, result) => {
        if (err) return res.status(500).send({ message: "Database error" });
        
        if (result.length > 0) {
            res.send({ message: "Login Successful!", user: result[0].username });
        } else {
            res.status(401).send({ message: "Wrong username or password" });
        }
    });
});

app.listen(3001, () => console.log("Server running on port 3001"));