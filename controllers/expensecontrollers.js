//expensecontrollers.js
const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Javascript@321',
    database: 'node-complete'
  });
  
  // Connect to the MySQL server
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ', err);
    } else {
      console.log('Connected to the database');
    }
  });
  
exports.addExpense = (req, res) => {
    const { amount, type, date } = req.body;
  
    const sqlQuery = "INSERT INTO expense (amount, type, date) VALUES (?, ?, ?)";
    const values = [amount, type, date];
  
    connection.query(sqlQuery, values, (error, results) => {
      if (error) {
        // Handle database error
        res.status(500).json({ message: 'Error adding expense' });
      } else {
        // Successfully inserted expense, redirect or send a response
        res.redirect('/');
      }
    });
  };

  