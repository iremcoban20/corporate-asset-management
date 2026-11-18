const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all categories
router.get('/categories', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM asset_categories ORDER BY name ASC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET all assets
router.get('/', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT 
                a.id, 
                a.serial_number, 
                c.name as category_name, 
                a.brand, 
                a.model, 
                a.status, 
                a.purchase_date,
                e.first_name || ' ' || e.last_name as assigned_to
            FROM assets a
            LEFT JOIN asset_categories c ON a.category_id = c.id
            LEFT JOIN asset_assignments aa ON a.id = aa.asset_id AND aa.return_date IS NULL
            LEFT JOIN employees e ON aa.employee_id = e.id
            ORDER BY a.id ASC
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET single asset
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM assets WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Asset not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST new asset
router.post('/', async (req, res) => {
    const { serial_number, category_id, brand, model, purchase_date, status } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO assets (serial_number, category_id, brand, model, purchase_date, status) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [serial_number, category_id, brand, model, purchase_date, status || 'AVAILABLE']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT update asset
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { serial_number, category_id, brand, model, purchase_date, status } = req.body;
    try {
        const result = await db.query(
            `UPDATE assets 
             SET serial_number = $1, category_id = $2, brand = $3, model = $4, purchase_date = $5, status = $6
             WHERE id = $7 RETURNING *`,
            [serial_number, category_id, brand, model, purchase_date, status, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Asset not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE asset
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM assets WHERE id = $1', [id]);
        res.json({ message: 'Asset deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
