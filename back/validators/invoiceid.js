const { param } = require("express-validator");
const { getInvoice } = require("../models/invoiceModel");

const validateInvoiceId = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("ID must be a positive integer")
    .bail()
    .custom(async (id) => {
      const invoice = await getInvoice(id);
      if (!invoice) throw new Error("Invoice not found");
      return true;
    }),
];

module.exports = validateInvoiceId;
