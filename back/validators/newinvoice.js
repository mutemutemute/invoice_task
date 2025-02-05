const { body } = require("express-validator");

const statuses = ["Draft", "Pending", "Paid"];
const regEx = /^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

const validateNewInvoice = [
  body("due_date")
    .notEmpty()
    .withMessage("Due date is required")
    .matches(regEx)
    .withMessage("Due date must be a valid date"),

  body("customer_name")
    .notEmpty()
    .withMessage("Customer full name is required")
    .isString()
    .withMessage("Customer full name must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Customer full name must be between 3 and 100 characters"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ min: 0.01 })
    .withMessage("Price must be a positive decimal number"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(statuses)
    .withMessage(`Status must be one of ${statuses.join(", ")}`),
];

module.exports = validateNewInvoice;
