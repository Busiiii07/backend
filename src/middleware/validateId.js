const mongoose = require('mongoose');
const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw new AppError(400, 'INVALID_ID', "L'ID no és vàlid");
  }
  next();
};