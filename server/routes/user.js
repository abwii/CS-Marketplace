const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/deposit', auth, async (req, res) => {
    const { amount } = req.body;
    try {
        const user = await User.findById(req.user.id);
        user.balance += parseFloat(amount);
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/inventory/add', auth, async (req, res) => {
    const { skin } = req.body;
    try {
        const user = await User.findById(req.user.id);

        const newSkin = {
            ...skin,
            id: uuidv4(),
            acquiredAt: Date.now()
        };

        user.inventory.push(newSkin);
        await user.save();
        res.json(user.inventory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
