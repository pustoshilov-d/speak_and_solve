const createPool = require('./dbConnection.js');
const pg = require('pg');

module.exports = async (userId) => {
    const pool = createPool();
    var sql = `SELECT speaking_with FROM users WHERE id IN (SELECT max(id) FROM users WHERE id_vk = ${userId})`

    try {
        var res = await pool.query(sql);
    } catch (err) {
        console.log('ошибка ' + err)
    }
    await pool.end();
    return res.rows[0].speaking_with;
};
