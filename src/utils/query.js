const AppError = require('./AppError');

const MAX_LIMIT = 100;

function parsePagination(query) {
  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? 10);
  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1) {
    throw new AppError(400, 'INVALID_QUERY', 'page i limit han de ser enters positius');
  }
  return { page, limit: Math.min(limit, MAX_LIMIT) };
}

function parseSort(sort, allowed, fallback = '-createdAt') {
  const value = sort || fallback;
  const desc = value.startsWith('-');
  const field = desc ? value.slice(1) : value;
  if (!allowed.includes(field)) {
    throw new AppError(400, 'INVALID_QUERY', `Ordenació no permesa. Camps: ${allowed.join(', ')}`);
  }
  return { [field]: desc ? -1 : 1 };
}

function parseActive(value) {
  if (value === undefined) return undefined;
  if (value !== 'true' && value !== 'false') {
    throw new AppError(400, 'INVALID_QUERY', 'active ha de ser true o false');
  }
  return value === 'true';
}

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const pick = (obj, allowed) =>
  Object.fromEntries(Object.entries(obj || {}).filter(([k]) => allowed.includes(k)));

module.exports = { parsePagination, parseSort, parseActive, escapeRegex, pick };