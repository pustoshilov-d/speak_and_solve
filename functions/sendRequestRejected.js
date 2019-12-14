const send = require('../functions/send.js');
const selectUsers = require('../db/selectUsers');
const returnSpeakingWith = require('../db/returnSpeakingWith.js');
const {CHAT} = require('../config.js');

module.exports = async (userId) => {
    const speakingWith = await returnSpeakingWith(userId);
    const str =  await selectUsers(speakingWith)[1];
    await send(speakingWith, 'Пользователь отказался. Выбери другого:', null);
    await send(speakingWith, str, 'user_choose');

};

