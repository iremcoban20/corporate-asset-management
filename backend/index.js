const express = require('express');
const cors = require('cors');
const db = require('./db');
const assetsRouter = require('./routes/assets');
const employeesRouter = require('./routes/employees');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/assets', assetsRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/assignments', require('./routes/assignments'));
app.use('/api/departments', require('./routes/departments'));

app.get('/api/status', (req, res) => {
    res.json({ status: 'active', message: 'Backend is running!' });
});

// Database Connection Retry Logic (for startup)
const connectWithRetry = async (retries = 5, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const client = await db.pool.connect();
            console.log('Database connected successfully!');
            const result = await client.query('SELECT NOW()');
            console.log('Database Time:', result.rows[0]);
            client.release();
            return;
        } catch (err) {
            console.error(`Database connection failed (Attempt ${i + 1}/${retries}). Retrying in ${delay / 1000}s...`, err.message);
            if (i === retries - 1) {
                console.error('Max retries reached. Exiting.');
                process.exit(1);
            }
            await new Promise(res => setTimeout(res, delay));
        }
    }
};

connectWithRetry();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
