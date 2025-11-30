const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    skin: {
        id: String,
        name: String,
        image: String,
        float: Number,
        pattern: Number,
        rarity: String
    },
    isSold: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', ItemSchema);
