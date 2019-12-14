const send = require('../functions/send.js');
const selectUsers = require('../db/selectUsers');

module.exports = async (userId) =>{
    const sel_val =  await selectUsers(userId);
    const str = sel_val[1];
    await send(userId, 'Выбери пользователя, с которым хочешь общаться.', null);
    await send(userId, str, 'user_choose');
}