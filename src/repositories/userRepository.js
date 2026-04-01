const db = require("../database/db");

function upsertUser(user) {
  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO users (email, name, age, country)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(email) DO UPDATE SET
        name=excluded.name,
        age=excluded.age,
        country=excluded.country
      `,
      [
        user.email,
        `${user.name.first} ${user.name.last}`,
        user.dob.age,
        user.location.country
      ],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID ? "inserted" : "updated");
      }
    );
  });
}

module.exports = { upsertUser };
