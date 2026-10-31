const mongoose = require('mongoose');

const liniaComandaSchema = new mongoose.Schema(
  {
    comanda: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comanda',
      required: true,
    },
    producte: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantitat: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isInteger,
    },
    preuUnitari: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

liniaComandaSchema.index({ comanda: 1, producte: 1 });

module.exports = mongoose.model('LiniaComanda', liniaComandaSchema);