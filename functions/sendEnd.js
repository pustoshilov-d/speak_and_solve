const send = require('../functions/send.js');
const updateDBUser = require('../db/updateDBUser.js');
const addDBUser = require('../db/addDBUser.js');
const selectUsers = require('../db/selectUsers');
const userInfo = require('../db/userDBInfo');
const returnSpeakingWith = require('../db/returnSpeakingWith.js');
const {CHAT} = require('../config.js');

module.exports = async (userId, rateId) => {
    await updateDBUser(userId, 'rating', rateId);
    await send(userId, 'Спасибо за оценку! Если возникнет другая проблема, заходи в этот чат и жми «Начать»', 'start');
};

