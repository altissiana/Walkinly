const express = require("express");
const router = express.Router();
const db = require("../db");
const config = require("config");
const sha512 = require("js-sha512");
const jwt = require("jsonwebtoken");

router.get("/user-contacts", function(req, res, next) {
  const email = req.body.email;
  const sql = `
  SELECT u.id, u.FirstName, u.LastName, u.PhoneNumber, c.FirstName as ContactFirstName, c.LastName as ContactLastName, c.PhoneNumber as ContactPhoneNumber
  FROM Users u
  LEFT JOIN Contacts c
    ON u.id = c.User_id
  WHERE u.Email = ?
  `;

  db.query(sql, [email], (err, results, fields) => {
    res.json(results[0]);
  });
});

// router.post("/users", function(req, res, next) {
//   const username = req.body.username;
//   const password = sha512(req.body.password + config.get("salt"));

//   const sql = `
//   SELECT count(1) as count FROM Users WHERE Email = ? AND Password = ?
//   `;
//   db.query(sql, [email, password]),
//     (err, results, fields) => {
//       const count = results[0].count;

//       if (count >= 1) {
//         const token = jwt.sign({ Email });
//       }
//     };

//   res.json({
//     foo: "bar"
//   });
// });

module.exports = router;
