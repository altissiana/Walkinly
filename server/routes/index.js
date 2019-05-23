const express = require("express");
const router = express.Router();
const config = require("config");
const sha512 = require("js-sha512");
const conn = require("../db");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res, next) => {
  const email = req.body.email;
  const password = sha512(req.body.password + config.get("salt"));
  const phonenumber = req.body.phonenumber;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  const checksql = `
  SELECT count(1) as count 
  FROM Users 
  WHERE Email = ?
  `;

  conn.query(checksql, [email], (err, results, fields) => {
    const count = results[0].count;

    if (count > 0) {
      res.status(409).json({
        error: "Email already in use with another account."
      });
    } else {
      const sql =
        "INSERT INTO users (Email, Password, PhoneNumber, FirstName, LastName ) VALUES (?, ?, ?, ?, ?)";

      conn.query(
        sql,
        [email, password, phonenumber, firstname, lastname],
        (err, results, fields) => {
          if (err) {
            throw new Error("register failed");
          } else {
            res.json({ email });
          }
        }
      );
    }
  });
});

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = sha512(req.body.password + config.get("salt"));

  const sql = `
  SELECT count(1) as count 
  FROM Users 
  WHERE Email = ? AND Password = ?
  `;

  conn.query(sql, [email, password], (err, results, fields) => {
    const count = results[0].count;

    if (count >= 1) {
      res.json({ email });
    } else {
      res.status(401).json({
        error: "Invalid Email or password"
      });
    }
  });
});

router.get(`/contacts/:email`, (req, res, next) => {
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
    u.Email = ?
  `;

  conn.query(sql, [email], (error, results, fields) => {
    res.json(results);
    if (error) {
      console.log("Contacts query error: " + error);
    }
  });
});

router.get(`/markers/:email`, (req, res, next) => {
  const email = req.params.email;

  const sql = `
  SELECT 
    m.type, m.latitude, m.longitude, m.title, m.description
  FROM 
    Users u
  LEFT JOIN 
    Markers m
  ON 
    u.id = m.User_id
  WHERE 
    u.Email = ?
  `;

  conn.query(sql, [email], (err, results, fields) => {
    if (!error) {
      res.json(results);
    } else {
      res.status(401).json({
        error: err
      });
    }
  });
});

module.exports = router;
