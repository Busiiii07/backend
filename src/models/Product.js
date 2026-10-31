const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'El nom és obligatori'],
      trim: true,
      maxlength: 100,
    },
    descripcio: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    preu: {
      type: Number,
      required: [true, 'El preu és obligatori'],
      min: [0, 'El preu no pot ser negatiu'],
      validate: { 
        validator: (v) => Math.abs(Math.round(v * 100) - v * 100) < 1e-8,
        message: (props) => `${props.value} té més de 2 decimals`,
      },
    },
    stock: {
      type: Number,
      required: true, 
      default: 0,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: 'El stock ha de ser un nombre enter',
      },
    },
    imatge: {
      type: String,
      trim: true,
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categoria',
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ categoria: 1, preu: 1 });
productSchema.index({ nom: 'text', descripcio: 'text' });

module.exports = mongoose.model('Product', productSchema);