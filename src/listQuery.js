
const AppError = require('./utils/AppError');

const MAX_LIMIT = 50;

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const badRequest = (field, message) =>
  new AppError(
    400,
    'INVALID_QUERY',
    'Parámetros de consulta no válidos',
    [{ field, message }]
  );

const positiveInt = (value, field, defaultValue, max) => {
  if (value === undefined) return defaultValue;

  if (
    typeof value !== 'string' ||
    !/^\d+$/.test(value) ||
    Number(value) < 1
  ) {
    throw badRequest(field, 'Debe ser un entero positivo');
  }

  return Math.min(Number(value), max);
};

function buildListQuery(
  query,
  { allowedSort, defaultSort = '-createdAt' }
) {
  const filter = {};

  // Filtro por estado activo
  if (query.active !== undefined) {
    if (!['true', 'false'].includes(query.active)) {
      throw badRequest('active', 'Debe ser true o false');
    }

    filter.active = query.active === 'true';
  }

  // Búsqueda por nombre
  if (query.name !== undefined) {
    if (typeof query.name !== 'string') {
      throw badRequest('name', 'Debe ser un texto');
    }

    if (query.name.trim()) {
      filter.name = {
        $regex: escapeRegex(query.name.trim()),
        $options: 'i'
      };
    }
  }

  // Ordenación
  const sortParam = query.sort || defaultSort;

  if (typeof sortParam !== 'string') {
    throw badRequest('sort', 'Formato de ordenación incorrecto');
  }

  const field = sortParam.startsWith('-')
    ? sortParam.slice(1)
    : sortParam;

  if (!allowedSort.includes(field)) {
    throw badRequest(
      'sort',
      `Campo no permitido. Permitidos: ${allowedSort.join(', ')}`
    );
  }

  const sort = {
    [field]: sortParam.startsWith('-') ? -1 : 1
  };

  // Paginación
  const page = positiveInt(query.page, 'page', 1, Number.MAX_SAFE_INTEGER);
  const limit = positiveInt(query.limit, 'limit', 10, MAX_LIMIT);

  const skip = (page - 1) * limit;

  return { filter, sort, page, limit, skip };
}

module.exports = { buildListQuery };
