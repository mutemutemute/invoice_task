const {
  createInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice,
  filterInvoices,
  getInvoice,
} = require("../models/invoiceModel");
const { customAlphabet } = require("nanoid");

const generateCustomId = () => {
  const letters = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 2);
  const numbers = customAlphabet("0123456789", 4);

  return `#${letters()}${numbers()}`;
};

exports.createNewInvoice = async (req, res, next) => {
  const { due_date, customer_name, amount, status } = req.body;

  try {
    const customId = generateCustomId();
    const newInvoice = {
      invoice_id: customId,
      due_date,
      customer_name,
      amount,
      status: status || "Draft",
    };

    const invoice = await createInvoice(newInvoice);
    res.status(201).json({
      status: "success",
      data: invoice,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllInvoices = async (req, res, next) => {
  try {
    let { page, limit } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    const invoices = await getInvoices(limit, offset);
    res.status(200).json({
      status: "success",
      data: invoices,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateThisInvoice = async (req, res, next) => {
  const id = req.params.id;
  const updatedInvoice = req.body;

  try {
    const invoice = await updateInvoice(id, updatedInvoice);
    res.status(200).json({
      status: "success",
      data: invoice,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteThisInvoice = async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteInvoice(id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

exports.filterInvoicesByStatus = async (req, res, next) => {
  try {
    let { status, page, limit } = req.query;

    let filter = null;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 5;

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return res.status(400).json({
        status: "error",
        message: "Invalid page or limit values",
      });
    }

    const offset = (page - 1) * limit;

    if (!filter && status) {
      filter = { status: status.trim().toUpperCase() };
    } else if (typeof filter === "string") {
      try {
        filter = JSON.parse(filter);
      } catch (error) {
        return res.status(400).json({
          status: "error",
          message: "Invalid filter format",
        });
      }
    }

    const filteredInvoices = await filterInvoices(filter, limit, offset);

    console.log("Filtered invoices:", filteredInvoices);

    res.status(200).json({
      status: "success",
      data: filteredInvoices,
    });
  } catch (error) {
    next(error);
  }
};

exports.getOneInvoice = async (req, res, next) => {
  const { id } = req.params;
  try {
    const invoice = await getInvoice(id);
    res.status(200).json({
      status: "success",
      data: invoice,
    });
  } catch (error) {
    next(error);
  }
};
