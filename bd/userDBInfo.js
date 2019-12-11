const createPool = require('./dbConnection.js');
const pg = require('pg');

module.exports = async (userId) => {
    const pool = createPool();
    var sql = `SELECT * FROM users WHERE id IN (SELECT max(id) FROM users WHERE id_vk =${userId})`;
    try {
        var res = await pool.query(sql);
    } catch (err) {
        console.log('ошибка ' + err)
    }
    await pool.end();

    var str = "";
        I = parseInt(i)+1;
        str = str + `Привет! С тобой хочет пообщаться ${res.rows[0].name} \nКатегория: ${res.rows[0].problem_category} \nПроблема: ${res.rows[0].problem_info}\n\n`
    return str
};
