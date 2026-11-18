const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all departments
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM departments ORDER BY name ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
