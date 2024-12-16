const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database(':memory:');

// Create users table
db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);

    // Insert a test user
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, ['test', '12345']);
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    db.get(
        `SELECT * FROM users WHERE username = ? AND password = ?`,
        [username, password],
        (err, user) => {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            res.status(200).json({ message: 'Login successful' });
        }
    );
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
