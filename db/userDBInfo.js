const createPool = require('./dbConnection.js');
const pg = require('pg');

module.exports = async (userId) => {
    const pool = await createPool();
    var sql = `SELECT * FROM users WHERE id IN (SELECT max(id) FROM users WHERE id_vk =${userId})`;
    try {
        var res = await pool.query(sql);
    } catch (err) {
        console.log('ошибка ' + err)
    }
    await pool.end();
    return res.rows[0]
};
