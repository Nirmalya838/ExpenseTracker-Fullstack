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

// Controller function for updating an expense
exports.updateExpense = (req, res) => {
  const expenseId = req.params.id;
  const { amount, type, date } = req.body;

  const query = `UPDATE expense SET amount = ?, type = ?, date = ? WHERE id = ?`;
  const values = [amount, type, date, expenseId];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the expense' });
    } else {
      if (result.affectedRows === 0) {
        // No expense found with the given ID
        res.status(404).json({ error: 'Expense not found' });
      } else {
        console.log(`Expense with ID ${expenseId} updated successfully`);
        res.json({ message: 'Expense updated successfully' });
      }
    }
  });
};
