const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const createError = require('http-errors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger');

const app = express();
const apiRouter = require('./routes/api');

// middleware
app.use(logger('[API] :method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.disable('x-powered-by');

// security
app.use(helmet());

// routes
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
