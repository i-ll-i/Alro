const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Alro',
    password: 'HikigayaHachiman',
    port: 5432
});

module.exports = { pool };