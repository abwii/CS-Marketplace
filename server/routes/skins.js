const express = require('express');
const router = express.Router();
const axios = require('axios');

let skinsCache = null;

router.get('/', async (req, res) => {
    try {
        if (skinsCache) {
            return res.json(skinsCache);
        }

        const response = await axios.get('https://bymykel.github.io/CSGO-API/api/en/skins.json');
        skinsCache = response.data;

        res.json(skinsCache);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
