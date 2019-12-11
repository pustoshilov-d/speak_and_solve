const createPool = require('./dbConnection.js');
const pg = require('pg');

module.exports = async (userId) => {
    const pool = await createPool();
    var sql = `SELECT * FROM users WHERE id IN (SELECT max(id) FROM users WHERE id_vk !=${userId} GROUP BY id_vk)`;
    try {
        var res = await pool.query(sql);
    } catch (err) {
        console.log('ошибка ' + err)
    }
    await pool.end();

    var mass = [];
    var str = "";

    for (i in res.rows) {
        I = parseInt(i)+1;
        mass.push(res.rows[i].id_vk);
        str = str + `${I}. ${res.rows[i].name} \nКатегория: ${res.rows[i].problem_category} \nПроблема: ${res.rows[i].problem_info}\n\n`
    }

    return [mass, str]
};
