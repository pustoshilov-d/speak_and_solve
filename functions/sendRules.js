const addDBUser = require('../db/addDBUser.js');
const send = require('../functions/send.js');

module.exports = async (userId) =>{
    await addDBUser(userId);
    await send(userId, 'Главное правило сервиса: твои персональные данные никто не увидит без твоего желания. Согласен с правилами?', 'ok_rules');
}