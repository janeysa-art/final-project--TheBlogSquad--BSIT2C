const express = require('express');
const router = express.Router();

// GET all travel data (sample endpoint)
router.get('/', (req, res) => {
    res.json({ message: "Travel routes working!" });
});

module.exports = router;