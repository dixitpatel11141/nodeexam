const express = require("express");
const customerController = require("../controller/customer");
const customerRouter = express.Router();
const verifyToken = require("../middleware/customer");
const { query, body } = require('express-validator');

customerRouter.post('/auth/register', body('password').isLength({ min: 8 }), body('email').isEmail(), customerController.createCustomer);
customerRouter.post('/auth/login', body('email').isEmail(), customerController.checkCustomer);
customerRouter.get('/auth/customers', verifyToken.authenticateToken, customerController.getCustomers);
customerRouter.get('/customers/:id', verifyToken.authenticateToken, customerController.getCustomer);
customerRouter.post('/customers', verifyToken.authenticateToken, customerController.createCustomer);
customerRouter.put('/customers/:id', verifyToken.authenticateToken, customerController.updateCustomer);
customerRouter.delete('/customers/:id', verifyToken.authenticateToken, customerController.deleteCustomer);

module.exports = customerRouter;