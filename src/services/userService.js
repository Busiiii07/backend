
const bcrypt = require('bcrypt');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const { buildListQuery } = require('../listQuery');

const createUser = async ({ name, email, password, role } = {}) => {
  if (!name || !email || !password) {
    throw new AppError(400, 'BAD_REQUEST', 'Nombre, email y contraseña son obligatorios');
  }

  const normalizedEmail = email.toLowerCase().trim();

  const exists = await User.findOne({ email: normalizedEmail });
  if (exists) {
    throw new AppError(409, 'EMAIL_IN_USE', 'El email ya está registrado');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: normalizedEmail,
    passwordHash,
    role: role === 'admin' ? 'admin' : 'client'
  });

  return user;
};

const getAllUsers = async (query = {}) => {
  const { filter, sort, page, limit, skip } = buildListQuery(query, {
    allowedSort: ['name', 'email', 'role', 'createdAt', 'updatedAt'],
    defaultSort: '-createdAt'
  });

  const [data, total] = await Promise.all([
    User.find(filter).sort(sort).skip(skip).limit(limit),
    User.countDocuments(filter)
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new AppError(404, 'USER_NOT_FOUND', 'Usuario no encontrado');
  return user;
};

const updateUser = async (id, data = {}) => {
  const allowed = {};

  if (data.name !== undefined) allowed.name = data.name;
  if (data.email !== undefined) allowed.email = data.email.toLowerCase().trim();
  if (data.active !== undefined) allowed.active = data.active;
  if (data.role !== undefined) allowed.role = data.role;

  const user = await User.findByIdAndUpdate(id, allowed, {
    new: true,
    runValidators: true
  });

  if (!user) throw new AppError(404, 'USER_NOT_FOUND', 'Usuario no encontrado');

  return user;
};

const deactivateUser = async (id) => {
  const user = await User.findByIdAndUpdate(
    id,
    { active: false },
    { new: true }
  );

  if (!user) throw new AppError(404, 'USER_NOT_FOUND', 'Usuario no encontrado');

  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deactivateUser
};
