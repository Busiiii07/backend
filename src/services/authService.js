const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const SALT_ROUNDS = 10;

const generarToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

exports.register = async ({ name, email, password } = {}) => {
  const details = [];
  if (typeof name !== 'string' || name.trim().length < 3)
    details.push({ field: 'name', message: 'Mínim 3 caràcters' });
  if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email))
    details.push({ field: 'email', message: 'Format incorrecte' });
  if (typeof password !== 'string' || password.length < 12)
    details.push({ field: 'password', message: 'Mínim 12 caràcters' });
  if (details.length)
    throw new AppError(422, 'VALIDATION_ERROR', 'Les dades no són vàlides', details);

  const existent = await User.findOne({ email: email.toLowerCase() });
  if (existent) throw new AppError(409, 'DUPLICATE_EMAIL', 'Aquest email ja està registrat');

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase(),
    passwordHash,
    role: 'client', // mai s'accepta del body
  });
  return publicUser(user);
};

exports.login = async ({ email, password } = {}) => {
  if (typeof email !== 'string' || typeof password !== 'string' || !email || !password)
    throw new AppError(400, 'BAD_REQUEST', 'Email i contrasenya obligatoris');

  const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');

  // Mateix missatge si l'usuari no existeix o la contrasenya és incorrecta
  if (!user || !user.active || !(await bcrypt.compare(password, user.passwordHash)))
    throw new AppError(401, 'INVALID_CREDENTIALS', 'Credencials incorrectes');

  return { token: generarToken(user), user: publicUser(user) };
};