const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const badRequest = (field, message) =>
  Object.assign(new Error('Paràmetres de consulta no vàlids'), {
    statusCode: 400,
    code: 'INVALID_QUERY',
    details: [{ field, message }]
  });

const positiveInt = (value, field, def, max) => {
  if (value === undefined) return def;
  if (!/^\d+$/.test(value) || Number(value) < 1) {
    throw badRequest(field, 'Ha de ser un enter positiu');
  }
  return Math.min(Number(value), max);
};

const MAX_LIMIT = 50;

function buildListQuery(query, { allowedSort, defaultSort = '-createdAt' }) {
  const filter = {};

  if (query.active !== undefined) {
    if (!['true', 'false'].includes(query.active)) {
      throw badRequest('active', 'Ha de ser true o false');
    }
    filter.active = query.active === 'true';
  }

  if (query.name) {
    filter.name = { $regex: escapeRegex(String(query.name)), $options: 'i' };
  }

  const sortParam = query.sort || defaultSort;
  const field = sortParam.startsWith('-') ? sortParam.slice(1) : sortParam;
  if (!allowedSort.includes(field)) {
    throw badRequest('sort', `Camp no permès. Permesos: ${allowedSort.join(', ')}`);
  }
  const sort = { [field]: sortParam.startsWith('-') ? -1 : 1 };

  const page = positiveInt(query.page, 'page', 1, Number.MAX_SAFE_INTEGER);
  const limit = positiveInt(query.limit, 'limit', 10, MAX_LIMIT);

  return { filter, sort, page, limit, skip: (page - 1) * limit };
}

module.exports = { buildListQuery };