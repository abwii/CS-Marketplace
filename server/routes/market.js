const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Item = require('../models/Item');
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const items = await Item.find({ isSold: false }).populate('seller', 'username');
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/sell', auth, async (req, res) => {
    const { skinId, price } = req.body;

    try {
        const user = await User.findById(req.user.id);
        const skinIndex = user.inventory.findIndex(item => item.id === skinId);

        if (skinIndex === -1) {
            return res.status(404).json({ msg: 'Skin not found in inventory' });
        }

        const skin = user.inventory[skinIndex];

        user.inventory.splice(skinIndex, 1);
        await user.save();

        const newItem = new Item({
            seller: req.user.id,
            price,
            skin
        });

        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/buy/:id', auth, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }
        if (item.isSold) {
            return res.status(400).json({ msg: 'Item already sold' });
        }

        if (item.seller.toString() === req.user.id) {
            return res.status(400).json({ msg: 'Cannot buy your own item' });
        }

        const buyer = await User.findById(req.user.id);
        const seller = await User.findById(item.seller);

        if (buyer.balance < item.price) {
            return res.status(400).json({ msg: 'Insufficient funds' });
        }

        buyer.balance -= item.price;
        seller.balance += item.price;

        buyer.inventory.push(item.skin);

        await buyer.save();
        await seller.save();

        item.isSold = true;
        await item.save();

        res.json({ msg: 'Item purchased', item });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
