const express = require('express');
const router = express.Router();
const db = require('../db');

// POST create assignment
router.post('/', async (req, res) => {
    const { asset_id, employee_id, notes } = req.body;

    if (!asset_id || !employee_id) {
        return res.status(400).json({ error: 'Asset ID and Employee ID are required' });
    }

    const client = await db.pool.connect();

    try {
        await client.query('BEGIN');

        // 1. Create Assignment Record
        const insertRes = await client.query(
            `INSERT INTO asset_assignments (asset_id, employee_id, notes) 
             VALUES ($1, $2, $3) RETURNING *`,
            [asset_id, employee_id, notes]
        );

        // 2. Update Asset Status
        await client.query(
            `UPDATE assets SET status = 'ASSIGNED' WHERE id = $1`,
            [asset_id]
        );

        await client.query('COMMIT');

        res.status(201).json(insertRes.rows[0]);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Assignment Transaction Failed:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    } finally {
        client.release();
    }
});

// POST return asset (Unassign)
router.post('/return', async (req, res) => {
    const { asset_id } = req.body;

    if (!asset_id) {
        return res.status(400).json({ error: 'Asset ID is required' });
    }

    const client = await db.pool.connect();

    try {
        await client.query('BEGIN');

        // 1. Close Assignment Record (Set returned_date)
        const updateAssignmentRes = await client.query(
            `UPDATE asset_assignments 
             SET return_date = NOW() 
             WHERE asset_id = $1 AND return_date IS NULL
             RETURNING *`,
            [asset_id]
        );

        if (updateAssignmentRes.rows.length === 0) {
            throw new Error('No active assignment found for this asset');
        }

        // 2. Update Asset Status to AVAILABLE
        await client.query(
            `UPDATE assets SET status = 'AVAILABLE' WHERE id = $1`,
            [asset_id]
        );

        await client.query('COMMIT');

        res.status(200).json({ message: 'Asset returned successfully' });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Return Transaction Failed:', err);
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
});

module.exports = router;
