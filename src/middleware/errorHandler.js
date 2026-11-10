module.exports = (err, req, res, next) => {
  let status = err.status || err.statusCode || 500;
  let code = err.code && typeof err.code === 'string' ? err.code : 'ERROR';
  let message = err.message;
  let details = [];

  // Validación de Mongoose (required, minlength, maxlength...) -> 422
  if (err.name === 'ValidationError') {
    status = 422;
    code = 'VALIDATION_ERROR';
    message = 'Les dades no són vàlides';
    details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }
  // ObjectId mal formado -> 400
  else if (err.name === 'CastError') {
    status = 400;
    code = 'INVALID_ID';
    message = 'ID no vàlid';
  }
  // Índice único (slug o email duplicado) -> 409
  else if (err.code === 11000) {
    status = 409;
    code = 'DUPLICATE_KEY';
    const field = Object.keys(err.keyPattern || err.keyValue || {})[0];
    message = `Ja existeix un registre amb aquest ${field}`;
    details = [{ field, message: 'Valor duplicat' }];
  }
  // JSON mal escrito en el body -> 400
  else if (err.type === 'entity.parse.failed') {
    status = 400;
    code = 'INVALID_JSON';
    message = 'El cos de la petició no és un JSON vàlid';
  }
  // Error inesperado -> 500, sin enseñar detalles internos
  else if (status === 500) {
    console.error(err);
    code = 'INTERNAL_ERROR';
    message = 'Error intern del servidor';
  }
  // Errores propios (por ejemplo, un 404 lanzado desde un servicio)
  else if (status === 404 && code === 'ERROR') code = 'NOT_FOUND';
  else if (status === 400 && code === 'ERROR') code = 'BAD_REQUEST';

  res.status(status).json({
    success: false,
    error: { code, message, details },
  });
};