const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

// Valida Authorization: Bearer <accessToken> (firma y caducidad)
exports.requireAuth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer '))
    throw new AppError(401, 'UNAUTHORIZED', 'Token no proporcionat');

  try {
    req.user = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET); // { id, role }
    next();
  } catch (err) {
    const msg = err.name === 'TokenExpiredError' ? 'Access token caducat' : 'Access token invàlid';
    throw new AppError(401, 'UNAUTHORIZED', msg);
  }
};

// Opcional: restringir por rol, p.ex. requireRole('admin')
exports.requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role))
    throw new AppError(403, 'FORBIDDEN', 'No tens permisos');
  next();
};