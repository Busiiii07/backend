const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: [true, 'El name és obligatori'], minlength: [3, 'Mínim 3 caràcters'], trim: true },
  slug: { type: String, required: [true, 'El slug és obligatori'], unique: true, lowercase: true, trim: true },
  description: { type: String, maxlength: [500, 'Màxim 500 caràcters'], trim: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);