const createPool = require('./dbConnection.js');

//
// const pool = createPool();
// const sql = `INSERT INTO users (id_vk, name, last_name) VALUES ($1, $2, $3)`;
// const value = [userId,res.response[0].first_name,res.response[0].last_name ];
//
// console.log(sql);
// try {
//     const res = await pool.query(sql, value);
//     console.log(res)
// } catch (err) {
//     console.log(err.stack)
// }
// await pool.end();
// })
// };


    module.exports = async (userId, field, value) => {
        const pool = createPool();

        if (value === "+1"){
            var sql = `update users set ${field} = ${field} + 1 where (id_vk = ${userId}) and id = (select max(id) from users where id_vk= ${userId})`;
        }
        else {
            var sql = `update users set ${field} = \'${value}\' where (id_vk = ${userId}) and id = (select max(id) from users where id_vk= ${userId})`;
        }
        try {
            const res = await pool.query(sql);
        } catch (err) {
            console.log(err.stack)
        }
        await pool.end();
    };
