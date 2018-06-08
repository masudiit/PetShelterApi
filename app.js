const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('config');

const app = express();
const port = process.env.PORT || config.get('App.Port');

const nav = [{}];
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const routes = require('./src/routes');

app.use('/api/pets', routes.petRouteFunc(nav));
app.use('/api/services', routes.serviceRouteFunc(nav));

app.get('/', (req, res) => {
  res.send('Pet Shelter Api');
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.code || 500)
      .json({
        status: 'error',
        message: err
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .json({
      status: 'error',
      message: err.message
    });
});


module.exports = app;
