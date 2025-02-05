const express = require("express");
const validate = require("../validators/validate");
const validateInvoiceId = require("../validators/invoiceid");
const validateNewInvoice = require("../validators/newinvoice");
const validateFilter = require("../validators/filter");
const validatePagination = require("../validators/pagination");
const { protect, allowAccessTo } = require("../controllers/authController");
const {
  createNewInvoice,
  getAllInvoices,
  updateThisInvoice,
  deleteThisInvoice,
  filterInvoicesByStatus,
  getOneInvoice,
} = require("../controllers/invoiceController");

const router = express.Router();

router
  .route("/")
  .post(
    protect,
    allowAccessTo("admin"),
    validateNewInvoice,
    validate,
    createNewInvoice
  )
  .get(validatePagination, validate, getAllInvoices);

router.route("/filter").get(validateFilter, validate, filterInvoicesByStatus);
router
  .route("/:id")
  .get(validateInvoiceId, validate, getOneInvoice)
  .patch(
    protect,
    allowAccessTo("admin"),
    validateNewInvoice,
    validateInvoiceId,
    validate,
    updateThisInvoice
  )
  .delete(
    protect,
    allowAccessTo("admin"),
    validateInvoiceId,
    validate,
    deleteThisInvoice
  );

module.exports = router;
