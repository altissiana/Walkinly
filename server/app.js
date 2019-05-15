var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
var ejwt = require('express-jwt')
const config = require('config')
const pino = require('express-pino-logger')();
const mobile = require('twilio')(
  'AC005d10553fc35846b7e3cab0bed0a724', 
  '35cd09289ba0c7a70f240d82c38b1547'
);
const client = require('twilio')(
  'AC005d10553fc35846b7e3cab0bed0a724', 
  '35cd09289ba0c7a70f240d82c38b1547'
);

/* var indexRouter = require('./routes/index');
var privateRouter = require('./routes/private') */

var app = express();

/* app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: 17736722822,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

/* app.use('/api', indexRouter);
app.use('/api', ejwt({ secret: config.get('secret') }), privateRouter) */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: 'error'
  })
});

module.exports = app;
