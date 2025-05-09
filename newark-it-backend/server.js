// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "maPWDrgi12!",
  database: process.env.DB_NAME || "newark_it",
});

// Register route
/*app.post("/api/register", async (req, res) => {
    const { FName, LName, EMail, Address, Phone, Status, Password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(Password, 10);
      const sql = "INSERT INTO Customer (FName, LName, EMail, Address, Phone, Status, PasswordHash) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(sql, [FName, LName, EMail, Address, Phone, Status, hashedPassword], (err, result) => {
        if (err) {
          console.error("Error inserting customer:", err);
          return res.status(500).json({ message: "Error registering customer" });
        }
        res.json({ message: "Customer registered successfully" });
      });
    } catch (error) {
      console.error("Error hashing password:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  */

  app.post("/api/register", async (req, res) => {
    const { FName, LName, EMail, Address, Phone, Status, Password } = req.body;
    console.log("Incoming registration data:", req.body); // 👈 Add this line
  
    try {
      const hashedPassword = await bcrypt.hash(Password, 10);
      const sql = "INSERT INTO Customer (FName, LName, EMail, Address, Phone, Status, PasswordHash) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(sql, [FName, LName, EMail, Address, Phone, Status, hashedPassword], (err, result) => {
        if (err) {
          console.error("Error inserting customer:", err); // 👈 Make sure this logs something
          return res.status(500).json({ message: "Error registering customer" });
        }
        res.json({ message: "Customer registered successfully" });
      });
    } catch (error) {
      console.error("Error hashing password:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

// Login route
/*app.post("/api/login", (req, res) => {
  const { EMail, Password } = req.body;
  const sql = "SELECT * FROM Customer WHERE EMail = ?";
  db.query(sql, [EMail], async (err, results) => {
    if (err) {
      console.error("Error fetching customer:", err);
      return res.status(500).json({ message: "Server error" });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const customer = results[0];
    try {
      const match = await bcrypt.compare(Password, customer.Password);
      if (match) {
        res.json({ message: "Login successful", customer });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Error comparing passwords:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
});*/

app.post("/api/login", (req, res) => {
    const { EMail, Password } = req.body;
    console.log("Login attempt with EMail:", EMail); // Add this line to log EMail
    const sql = "SELECT * FROM Customer WHERE EMail = ?";
    db.query(sql, [EMail], async (err, results) => {
      if (err) {
        console.error("Error fetching customer:", err);
        return res.status(500).json({ message: "Server error" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const customer = results[0];
      try {
        const match = await bcrypt.compare(Password, customer.PasswordHash); // Fix to compare the hash
        if (match) {
          res.json({ message: "Login successful", customer });
        } else {
          res.status(401).json({ message: "Invalid email or password" });
        }
      } catch (error) {
        console.error("Error comparing passwords:", error);
        res.status(500).json({ message: "Server error" });
      }
    });
  });
  

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
