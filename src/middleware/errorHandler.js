const AppError = require('../utils/AppError');

module.exports = (err, req, res, next) => {
  let status = 500;
  let code = 'INTERNAL_ERROR';
  let message = 'Error intern del servidor';
  let details;

  if (err instanceof AppError) {
    ({ status, code, message, details } = err);
  } else if (err.name === 'ValidationError') {
    status = 422;
    code = 'VALIDATION_ERROR';
    message = 'Les dades no són vàlides';
    details = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
  } else if (err.code === 11000) {
    status = 409;
    code = 'DUPLICATE_KEY';
    message = 'Ja existeix un registre amb aquest valor';
    details = Object.keys(err.keyPattern || {}).map((f) => ({ field: f, message: 'Valor duplicat' }));
  } else if (err.name === 'CastError') {
    status = 400;
    code = 'INVALID_ID';
    message = 'Valor no vàlid';
  } else if (err.type === 'entity.parse.failed') {
    status = 400;
    code = 'INVALID_JSON';
    message = 'JSON mal format';
  }

  if (status === 500) console.error(err); // només al log, mai a la resposta

  res.status(status).json({ success: false, error: { code, message, details } });
};