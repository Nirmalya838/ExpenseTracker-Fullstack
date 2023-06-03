const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const router = express.Router();

const homeController = require('../controllers/homecontrollers');

const expenseController = require('../controllers/expensecontrollers');

const deleteController = require('../controllers/deletecontrollers');

const getExpenseController = require('../controllers/getexpensecontrollers');

const updateController = require('../controllers/editcontrollers');

router.get('/', homeController.getHomePage);

router.post('/expense/add-expense', expenseController.addExpense);

router.delete('/expense/delete-expense/:id', deleteController.deleteExpense);

router.get('/expense/:id', getExpenseController.getExpenseById);

router.put('/expense/update-expense/:id', updateController.updateExpense);

module.exports = router;
