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
  WHERE Email = ?;
  `

  conn.query(checksql, [email], (err, results, fields) => {
    const count = results[0].count;

    if (count > 0) {
      res.status(409).json({
        error: "Email already in use with another account."
      });
    } else {
      const sql = `
      INSERT INTO Users (Email, Password, PhoneNumber, FirstName, LastName ) VALUES (?, ?, ?, ?, ?);
      `

      conn.query(sql, [email, password, phonenumber, firstname, lastname], (err, results, fields) => {
        if (err) {
          throw new Error("register failed");
        } else {
          res.json({ email, name: firstname + ' ' + lastname, phonenumber });
        }
      })
    }
  })
})

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password

  const sql = `
  SELECT count(1) as count, FirstName, LastName, PhoneNumber 
  FROM Users 
  WHERE Email = ? AND Password = ?
  GROUP BY id;
  `

  conn.query(sql, [email, password], (err, results, fields) => {
    const count = results[0].count;

    if (count >= 1) {
      res.json({ email, name: results[0].FirstName + ' ' + results[0].LastName, phonenumber: results[0].PhoneNumber });
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
    u.Email = ?;
  `

  conn.query(sql, [email], (error, results, fields) => {
    res.json(results);
    if (error) {
      console.log("Contacts query error: " + error);
    }
  })
})

router.get(`/markers/:email`, (req, res, next) => {
  const email = req.params.email;

  const sql = `
  SELECT m.type, m.latitude, m.longitude, m.title, m.description
  FROM Users u
  LEFT JOIN Markers m
  ON u.id = m.User_id
  WHERE u.Email = ?;
  `

  conn.query(sql, [email], (err, results, fields) => {
    if (err) {
      throw new Error("marker query failed")
    } else {
      res.json(results);
    }
  })
})

router.patch('/changePassword', (req, res, next) => {
  const email = req.body.email;
  const newPassword = sha512(req.body.newPassword + config.get("salt"))

  const sql = `
  UPDATE Users
  SET Password = ?
  WHERE Email = ?;
  `

  conn.query(sql, [newPassword, email], (err, results, fields) => {
    res.json(results)
    if (err) {
      console.log("Change password error: " + err)
    }
  })
})

router.post('/newConnection', (req, res, next) => {
  const { userEmail, phonenumber, firstname, lastname } = req.body;

  const getUserSql = `
  SELECT id
  FROM Users
  WHERE Email = ?;
  `

  conn.query(getUserSql, [userEmail], (err, results, fields) => {
    
    if (err) {
      res.status(409).json({
        error: 'Error adding new connection'
      })
    } else {
      const userId = results[0].id;

      const sql = `
      INSERT INTO Contacts (User_id, PhoneNumber, FirstName, LastName)
      VALUES (?, ?, ?, ?);
      `

      conn.query(sql, [userId, phonenumber, firstname, lastname], (err, results, fields) => {

        if (err) {
          res.status(409).json({
            error: 'Error adding new connection'
          })
        } else {
          res.send('Add new connection success')
        }

      })
    }
  })
})

router.patch('/editConnection', (req, res, next) => {
  const { userEmail, phonenumber, firstname, lastname } = req.body;

  const getUserIdSql = `
  SELECT id
  FROM Users
  WHERE Email = ?
  `

  conn.query(getUserIdSql, [userEmail], (err, results, fields) => {

    if (err) {
      res.status(409).json({
        error: 'Error editing connection'
      })
    } else {
      const userId = results[0].id;

      const editConnSql = `
      UPDATE Contacts
      SET FirstName = ?,
          LastName = ?,
          PhoneNumber = ?
      WHERE User_id = ? AND PhoneNumber = ?
      `

      conn.query(editConnSql, [firstname, lastname, phonenumber, userId, phonenumber], (err, results, fields) => {

        if (err) {
          res.status(409).json({
            error: 'Error editing connection'
          })
        } else {
          res.send('Connection edit success')
        }

      })
    }

  })
})

router.delete('/deleteConnection', (req, res, next) => {
  const { userEmail, phonenumber } = req.body;
  console.log('req.body: ' + JSON.stringify(req.body))

  const getUserIdSql = `
  SELECT id
  FROM Users
  WHERE Email = ?
  `

  conn.query(getUserIdSql, [userEmail], (err, results, fields) => {

    if (err) {
      res.status(409).json({
        error: 'Error deleting connection'
      })
    } else {
      const userId = results[0].id;

      const deleteContactSql = `
      DELETE
      FROM Contacts
      WHERE User_id = ? AND PhoneNumber = ?
      `

      conn.query(deleteContactSql, [userId, phonenumber], (err, results, fields) => {

        if (err) {
          res.status(409).json({
            error: 'Error deleting connection'
          })
        } else {
          res.send('Connection deletion success')
        }

      })
    }

  })
})

router.get('/forgotPassword', (req, res, next) => {

})

router.patch('/changePassword', (req, res, next) => {
  const email = req.body.email;
  const newPassword = sha512(req.body.newPassword + config.get("salt"));

  const sql = `
  UPDATE Users 
  SET Password = ?
  WHERE Email = ?
  `

  conn.query(sql, [newPassword, email], (err, results, fields) => {
    res.json(results)
    if (err) {
      console.log("Change password err: " + error)
    }
  });
})

module.exports = router;
