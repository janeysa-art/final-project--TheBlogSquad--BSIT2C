const express = require('express');
const router = express.Router();

// GET all users (sample endpoint)
router.get('/', (req, res) => {
    res.json({ message: "User routes working!" });
});

module.exports = router;