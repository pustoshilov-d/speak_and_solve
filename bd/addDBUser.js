const createPool = require('./dbConnection.js');
const getUser = require('../getUser');

module.exports = async (userId) => {
    await getUser(userId).then(async res => {
        const pool = createPool();
        const sql = `INSERT INTO users (id_vk, name, last_name) VALUES ($1, $2, $3)`;
        const value = [userId,res.response[0].first_name,res.response[0].last_name ];
        try {
            const res = await pool.query(sql, value);
        } catch (err) {
            console.log(err.stack)
        }
        await pool.end();
    })
};
