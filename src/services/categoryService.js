const mongoose = require('mongoose');
const Category = require('../models/Categoria');

const httpError = (status, message, code) =>
  Object.assign(new Error(message), { statusCode: status, code });

const checkId = (id) => {
  if (!mongoose.isValidObjectId(id)) throw httpError(400, 'ID no vàlid', 'INVALID_ID');
};

const create = ({ name, slug, description, active }) =>
  Category.create({ name, slug, description, active });

const list = () => Category.find();

const getById = async (id) => {
  checkId(id);
  const cat = await Category.findById(id);
  if (!cat) throw httpError(404, 'Categoria no trobada', 'NOT_FOUND');
  return cat;
};

const update = async (id, { name, slug, description, active }) => {
  checkId(id);
  const cat = await Category.findByIdAndUpdate(
    id, { name, slug, description, active },
    { new: true, runValidators: true }
  );
  if (!cat) throw httpError(404, 'Categoria no trobada', 'NOT_FOUND');
  return cat;
};

const remove = async (id) => {
  checkId(id);
  const cat = await Category.findByIdAndDelete(id);
  if (!cat) throw httpError(404, 'Categoria no trobada', 'NOT_FOUND');
};

module.exports = { create, list, getById, update, remove };