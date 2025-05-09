const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("error connecting to database", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Routes

// 1. Register Customer
const bcrypt = require("bcryptjs");

app.post("/api/register", (req, res) => {
  const { FName, LName, EMail, Address, Phone, Status, Password } = req.body;

  // Hash the password before saving
  bcrypt.hash(Password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    const query = `
      INSERT INTO Customer (FName, LName, EMail, Address, Phone, Status, Password)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      query,
      [FName, LName, EMail, Address, Phone, Status, hashedPassword],
      (err, result) => {
        if (err) {
          res.status(500).json({ message: "Error registering customer" });
        } else {
          res.status(200).json({ message: "Customer registered successfully" });
        }
      }
    );
  });
});


// Customer Login
app.post("/api/login", (req, res) => {
    const { EMail, Password } = req.body;
  
    const query = "SELECT * FROM Customer WHERE EMail = ? AND Password = ?";
    db.query(query, [EMail, Password], (err, result) => {
      if (err) {
        res.status(500).json({ message: "Error during login" });
      } else if (result.length === 0) {
        res.status(401).json({ message: "Invalid credentials" });
      } else {
        res.status(200).json({
          message: "Login successful",
          customerId: result[0].CID,
        });
      }
    });
  });
  

// 2. Place Order
app.post("/api/placeOrder", (req, res) => {
  const { CID, ProductID, Quantity, PriceSold, CCNumber, SAName } = req.body;

  const basketQuery = "INSERT INTO Basket (CID) VALUES (?)";
  db.query(basketQuery, [CID], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error placing order" });
    }

    const basketID = result.insertId;

    const orderQuery = "INSERT INTO Appears_In (BID, PID, Quantity, PriceSold) VALUES (?, ?, ?, ?)";
    db.query(orderQuery, [basketID, ProductID, Quantity, PriceSold], (err) => {
      if (err) {
        return res.status(500).json({ message: "Error adding products to basket" });
      }

      const transactionQuery = `
        INSERT INTO Transaction (BID, CCNumber, CID, SAName, TDate, TTag)
        VALUES (?, ?, ?, ?, NOW(), 'not-delivered')
      `;
      db.query(transactionQuery, [basketID, CCNumber, CID, SAName], (err) => {
        if (err) {
          return res.status(500).json({ message: "Error completing transaction" });
        }
        res.status(200).json({ message: "Order placed successfully" });
      });
    });
  });
});

// 3. Sale Statistics (Top 10 Customers)
app.get("/api/topCustomers", (req, res) => {
  const query = `
    SELECT c.FName, c.LName, SUM(a.Quantity * a.PriceSold) AS TotalSpent
    FROM Customer c
    JOIN Basket b ON c.CID = b.CID
    JOIN Appears_In a ON b.BID = a.BID
    GROUP BY c.CID
    ORDER BY TotalSpent DESC
    LIMIT 10
  `;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error fetching top customers" });
    } else {
      res.status(200).json(result);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
