const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nom és obligatori'],
      trim: true,
      minlength: [3, 'El nom ha de tenir mínim 3 caràcters'],
    },
    slug: {
      type: String,
      required: [true, 'El slug és obligatori'],
      unique: true,        // crea un índex únic, NO és una validació
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'La descripció no pot superar els 500 caràcters'],
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true } // createdAt i updatedAt
);

module.exports = mongoose.model('Category', categorySchema);