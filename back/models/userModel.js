const { sql } = require("../dbConnection");

exports.createUser = async (newUser) => {
  const users = await sql`
INSERT INTO users ${sql(newUser, "username", "email", "password", "role")}
RETURNING *
`;
  return users[0];
};

exports.getUserByEmail = async (email) => {
  const [user] = await sql`
    SELECT users.* 
    FROM users 
    WHERE users.email = ${email}`;
  return user;
};

exports.getUserById = async (id) => {
  const [user] = await sql`
    SELECT users.* 
    FROM users 
    WHERE users.id = ${id}`;
  return user;
};
