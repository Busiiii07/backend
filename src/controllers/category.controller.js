
const service = require('../services/categoryService');
exports.create = async (req, res, next) => {
  try {
    res.status(201).json({
      success: true,
      data: await service.create(req.body)
    });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      ...(await service.findAll(req.query))
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: await service.findById(req.params.id)
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: await service.update(req.params.id, req.body)
    });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await service.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
