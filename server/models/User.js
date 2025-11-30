const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 1000.00 },
  inventory: [{
    id: String,
    name: String,
    image: String,
    float: Number,
    pattern: Number,
    rarity: String,
    price: Number,
    acquiredAt: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('User', UserSchema);
