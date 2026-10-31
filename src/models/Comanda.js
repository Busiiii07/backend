const mongoose = require('mongoose');

const comandaSchema = new mongoose.Schema(
  {
    usuari: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    data: {
      type: Date,
      default: Date.now,
    },
    estat: {
      type: String,
      enum: ['pendent', 'pagada', 'enviada', 'lliurada', 'cancel·lada'],
      default: 'pendent',
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

comandaSchema.index({ usuari: 1, data: -1 });

module.exports = mongoose.model('Comanda', comandaSchema);