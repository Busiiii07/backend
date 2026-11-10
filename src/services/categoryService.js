const mongoose = require('mongoose');
const Category = require('../models/Categoria');
const Product = require('../models/Product');
const AppError = require('../utils/AppError');
const { buildListQuery } = require('../listQuery');

const assertValidId = (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError(400, 'INVALID_ID', 'ID no válido');
  }
};

const handleDuplicate = (err) => {
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'campo';

    throw new AppError(
      409,
      'DUPLICATE_CATEGORY',
      `Ya existe una categoría con ese ${field}`
    );
  }

  throw err;
};

// Crear categoría
exports.create = async (data) => {
  try {
    return await Category.create(data);
  } catch (err) {
    handleDuplicate(err);
  }
};

// Listar categorías con filtros, ordenación y paginación
exports.findAll = async (query = {}) => {
  const { filter, sort, page, limit, skip } = buildListQuery(query, {
    allowedSort: ['name', 'createdAt', 'updatedAt'],
    defaultSort: 'name'
  });

  const [data, total] = await Promise.all([
    Category.find(filter).sort(sort).skip(skip).limit(limit),
    Category.countDocuments(filter)
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

// Buscar categoría por ID
exports.findById = async (id) => {
  assertValidId(id);

  const category = await Category.findById(id);

  if (!category) {
    throw new AppError(404, 'CATEGORY_NOT_FOUND', 'Categoría no encontrada');
  }

  return category;
};

// Actualizar categoría
exports.update = async (id, data) => {
  assertValidId(id);

  try {
    const category = await Category.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    if (!category) {
      throw new AppError(404, 'CATEGORY_NOT_FOUND', 'Categoría no encontrada');
    }

    return category;
  } catch (err) {
    handleDuplicate(err);
  }
};

// Eliminar categoría
exports.remove = async (id) => {
  assertValidId(id);

  const inUse = await Product.countDocuments({ category: id });

  if (inUse > 0) {
    throw new AppError(
      409,
      'CATEGORY_IN_USE',
      `No se puede eliminar: tiene ${inUse} productos asociados`
    );
  }

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new AppError(404, 'CATEGORY_NOT_FOUND', 'Categoría no encontrada');
  }

  return category;
};
