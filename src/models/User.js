const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nom és obligatori'],
      trim: true,
      minlength: [2, 'Mínim 2 caràcters'],
      maxlength: [50, 'Màxim 50 caràcters'],
    },
    email: {
      type: String,
      required: [true, "L'email és obligatori"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Format incorrecte'],
    },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['client', 'admin'], default: 'client' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);


userSchema.pre('validate', async function () {
  if (!this._password) return;
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this._password, salt);
});

module.exports = mongoose.model('User', userSchema);