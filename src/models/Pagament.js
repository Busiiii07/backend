const mongoose = require('mongoose');

const pagamentSchema = new mongoose.Schema(
  {
    comanda: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comanda',
      required: true,
    },
    data: {
      type: Date,
      default: Date.now,
    },
    import: {
      type: Number,
      required: true,
      min: 0,
    },
    metode: {
      type: String,
      required: true,
      enum: ['targeta', 'paypal', 'transferencia', 'efectiu'],
    },
    estat: {
      type: String,
      required: true,
      enum: ['pendent', 'completat', 'fallit', 'reemborsat'],
      default: 'pendent',
    },
  },
  { timestamps: true }
);

pagamentSchema.index({ comanda: 1 });

module.exports = mongoose.model('Pagament', pagamentSchema);