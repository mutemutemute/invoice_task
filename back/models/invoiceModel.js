const { sql } = require("../dbConnection");

exports.createInvoice = async (newInvoice) => {
  const [invoice] = await sql`
    INSERT INTO invoices ${sql(newInvoice, "invoice_id", "due_date", "customer_name", "amount", "status")}
    RETURNING *;
    `;
  return invoice;
};

exports.getInvoices = async (limit, offset) => {
  const invoices = await sql`SELECT invoices.*
    FROM invoices
    ORDER BY invoices.id
    ${
      !isNaN(limit) && !isNaN(offset)
        ? sql`LIMIT ${limit} OFFSET ${offset}`
        : sql``
    } `;
  const totalInvoices =
    await sql`SELECT COUNT(invoices.id) AS total FROM invoices`;
  const total_count = totalInvoices[0].total;

  return { invoices, total_count };
};

exports.getInvoice = async (id) => {
  const [invoice] = await sql`
    SELECT invoices.*
    FROM invoices
    WHERE invoices.id = ${id}
    `;
  return invoice;
};
exports.updateInvoice = async (id, updatedInvoice) => {
  const [invoice] = await sql`
    UPDATE invoices
    SET ${sql(updatedInvoice, "due_date", "customer_name", "amount", "status")}
    WHERE invoices.id = ${id}
    RETURNING *;
    `;
  return invoice;
};

exports.deleteInvoice = async (id) => {
  const [invoice] = await sql`
    DELETE FROM invoices
    WHERE invoices.id = ${id}
    RETURNING *;
    `;
  return invoice;
};

exports.filterInvoices = async (filter, limit, offset) => {
  const validStatuses = ["DRAFT", "PENDING", "PAID"];
  console.log(filter);
  const statusFilter = validStatuses.includes(filter.status.toUpperCase())
    ? filter.status.toUpperCase()
    : null;

  const invoices = await sql`
    SELECT invoices.*
    FROM invoices
    WHERE UPPER(invoices.status) = ${statusFilter}
    ORDER BY invoices.invoice_id
    ${
      !isNaN(limit) && !isNaN(offset)
        ? sql`LIMIT ${limit} OFFSET ${offset}`
        : sql``
    } `;
  return invoices;
};
