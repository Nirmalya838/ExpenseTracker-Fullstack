// homecontrollers.js
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

// Controller function for the homepage route
exports.getHomePage = (req, res) => {
  const sqlQuery = "SELECT id, amount, type, date FROM expense";

  connection.query(sqlQuery, (error, results) => {
    if (error) {
      // Handle database error
      res.status(500).json({ message: 'Error retrieving user data' });
    } else {
      // Format the date before passing it to the template
      const formattedResults = results.map(expense => {
        const formattedDate = expense.date.toLocaleDateString();
        return { ...expense, date: formattedDate };
      });

      // Render the homepage and pass the formatted user data to the template
      res.render('index', { expense: formattedResults });
    }
  });
};
