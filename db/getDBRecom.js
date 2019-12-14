const createPool = require('./dbConnection.js');
const pg = require('pg');

module.exports = async (problemName) => {
    const pool = await createPool();
    const sql = `SELECT recommendations FROM problems WHERE name = \'${problemName}\'`

    try {
        var res = await pool.query(sql);
    } catch (err) {
        console.log('ошибка ' + err)
    }
    await pool.end();
    console.log(res.rows[0].recommendations)
    return res.rows[0].recommendations;
};
