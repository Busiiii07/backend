const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const userService = require('./userService');

const invalidCredentials = () =>
  new AppError(401, 'INVALID_CREDENTIALS', 'Credencials incorrectes');

// Registre: valida l'email i delega la creació (hash inclòs) a userService
const registrar = async ({ name, email, password } = {}) => {
  if (typeof email === 'string') {
    const existe = await User.findOne({ email: email.toLowerCase().trim() });
    if (existe) throw new AppError(409, 'EMAIL_IN_USE', 'Email ja està en ús');
  }
  return userService.createUser({ name, email, password });
};

// Login: comprova la contrasenya i genera el token JWT
const login = async ({ email, password } = {}) => {
  if (typeof email !== 'string' || typeof password !== 'string') {
    throw invalidCredentials();
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() })
    .select('+passwordHash');

  const ok = user && user.active && (await bcrypt.compare(password, user.passwordHash));
  if (!ok) throw invalidCredentials();

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return { token };
};

module.exports = { registrar, login };