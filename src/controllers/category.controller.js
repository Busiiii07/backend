const service = require('../services/categoryService');

exports.create = async (req, res, next) => {
  try { res.status(201).json({ status: 'success', data: await service.create(req.body) }); }
  catch (err) { next(err); }
};
exports.list = async (req, res, next) => {
  try { res.status(200).json({ status: 'success', data: await service.list() }); }
  catch (err) { next(err); }
};
exports.getById = async (req, res, next) => {
  try { res.status(200).json({ status: 'success', data: await service.getById(req.params.id) }); }
  catch (err) { next(err); }
};
exports.update = async (req, res, next) => {
  try { res.status(200).json({ status: 'success', data: await service.update(req.params.id, req.body) }); }
  catch (err) { next(err); }
};
exports.remove = async (req, res, next) => {
  try { await service.remove(req.params.id); res.status(204).send(); }
  catch (err) { next(err); }
};