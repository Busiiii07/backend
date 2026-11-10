const mongoose = require('mongoose');
 
const tokenSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Se guarda el HASH del refresh token, nunca el token en claro
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    revoked: { type: Boolean, default: false },
  },
  { timestamps: true }
);
 
// MongoDB elimina solo los tokens caducados (índice TTL)
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
 
module.exports = mongoose.model('Token', tokenSchema);
 