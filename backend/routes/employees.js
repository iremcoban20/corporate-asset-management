const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all employees
router.get('/', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT e.id, e.first_name, e.last_name, e.email, d.name as department_name, e.created_at
            FROM employees e
            LEFT JOIN departments d ON e.department_id = d.id
            ORDER BY e.id ASC
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST new employee
router.post('/', async (req, res) => {
    const { first_name, last_name, email, department_id } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO employees (first_name, last_name, email, department_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [first_name, last_name, email, department_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
