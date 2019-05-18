const express = require("express");
const router = express.Router();
const config = require("config");
const sha512 = require("js-sha512");
const conn = require("../db");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res, next) => {
  const username = req.body.email;
  const password = sha512(req.body.password + config.get("salt"));

  const checksql = "SELECT count(1) as count FROM Users WHERE Email = ?";

  conn.query(checksql, [username], (err, results, fields) => {
    const count = results[0].count;

    if (count > 0) {
      res.status(409).json({
        error: "Email already in use with another account."
      });
    } else {
      const sql = "INSERT INTO users (Email, Password) VALUES (?, ?)";

      conn.query(sql, [email, password], (err, results, fields) => {
        if (err) {
          throw new Error("register failed");
        } else {
          const token = jwt.sign({ username }, config.get("secret"));
          res.json({
            token: token
          });
        }
      });
    }
  });
});

router.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = sha512(req.body.password + config.get("salt"));

  const sql =
    "SELECT count(1) as count FROM Users WHERE Email = ? AND password = ?";

  conn.query(sql, [username, password], (err, results, fields) => {
    const count = results[0].count;

    if (count >= 1) {
      const token = jwt.sign({ username }, config.get("secret"));

      res.json({
        token
      });
    } else {
      res.status(401).json({
        error: "Invalid Email or password"
      });
    }
  });
});

router.get("/Contacts/:email", (req, res, next) => {
  const email = req.params.email;

  const sql = `
  SELECT 
    c.FirstName, c.LastName, c.PhoneNumber
  FROM 
    Users u
  LEFT JOIN 
    Contacts c
  ON 
    u.id = c.User_id
  WHERE 
    u.Email = ?`;

  conn.query(sql, [email], (error, results, fields) => {
    console.log(error);
    res.json(results);
  });
});

module.exports = router;
