const db = require("../config/dbConfig"); // Importera din databasanslutning

getAllUsers = (callback) => {
  db.query("SELECT * FROM user_table;", (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

const getUserById = (userId, callback) => {
  db.query(
    "SELECT * FROM user_table WHERE user_id = ?;",
    [userId],
    (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results[0]);
    }
  );
};

const updateUser = async (userId, userData) => {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(userData)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  values.push(userId);

  const sql = `UPDATE user_table SET ${fields.join(", ")} WHERE user_id = ?`;
  await db.query(sql, values);

  const [updatedUser] = await db.query(
    "SELECT * FROM user_table WHERE user_id = ?",
    [userId]
  );
  return updatedUser[0];
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
};
