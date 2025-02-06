const { query } = require("express-validator");
const statuses = ["Draft", "Pending", "Paid"];

const validateFilter = [
  query("status")
    .optional()
    .isString()
    .withMessage("Status must be a string")
    // .isIn(statuses)
    // .withMessage("Status must be Draft, Pending or Paid"),
];

module.exports = validateFilter;
