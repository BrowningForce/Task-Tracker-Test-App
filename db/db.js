const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'taskTracker',
    password: 'password',
    port: 5432,
});

module.exports = client;