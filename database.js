const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Ademiju7',
    port: 5433,
})
pool.on("connect", () => {
    console.log("connected to db successfully");
});
pool.on("error", (err) => {
    console.log("could not connect to database", err);
});
module.exports = pool