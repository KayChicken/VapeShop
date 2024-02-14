const Pool = require('pg').Pool

const pool = new Pool({
    user : 'postgres',
    password : '3701',
    host : 'localhost',
    port : 5432,
    database : 'teslaDB'
})




module.exports = pool