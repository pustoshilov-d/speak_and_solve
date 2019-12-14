const send = require('../functions/send.js');
const updateDBUser = require('../db/updateDBUser.js');
const {CHAT} = require('../config.js');

module.exports = async (userId, speakingWith) => {
    await updateDBUser(userId,'tasks_r_accepted','+1');
    await updateDBUser(speakingWith,'tasks_s_accepted','+1');
    await send(speakingWith, 'Пользователь согласился на общение. Скорее заходи в ваш чат: ' + CHAT, 'rating');
    await send(userId, 'Супер! Скорее заходи в ваш чат: ' + CHAT, null);

};

