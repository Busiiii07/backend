const mongoose = require('mongoose');

const adrecaSchema = new mongoose.Schema(
  {
    usuari: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    carrer: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    ciutat: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    codiPostal: {
      type: String,
      required: true,
      trim: true,
      maxlength: 15,
    },
    pais: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

adrecaSchema.index({ usuari: 1 });

module.exports = mongoose.model('Adreca', adrecaSchema);