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

// Controller function for fetching an expense by ID
exports.getExpenseById = (req, res) => {
  const expenseId = req.params.id;

  const query = `SELECT id, amount, type, date FROM expense WHERE id = ?`;
  const values = [expenseId];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving the expense details' });
    } else {
      if (results.length === 0) {
        // No expense found with the given ID
        res.status(404).json({ error: 'Expense not found' });
      } else {
        const expense = results[0];
        res.json(expense);
      }
    }
  });
};
