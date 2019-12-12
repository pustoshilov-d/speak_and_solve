const {HOST, PORT_DB, DATABASE, USER, PASSWORD} = require('./config.js')
const {Pool} = require('pg');


    pool = new Pool({
        host: HOST,
        port: PORT_DB,
        database: DATABASE,
        user: USER,
        password: PASSWORD
    });

    pool.query('SELECT NOW()')
pool.end()