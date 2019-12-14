const send = require('../functions/send.js');
const updateDBUser = require('../db/updateDBUser.js');
const addDBUser = require('../db/addDBUser.js');
const selectUsers = require('../db/selectUsers');
const userInfo = require('../db/userDBInfo');
const returnSpeakingWith = require('../db/returnSpeakingWith.js');
const {CHAT} = require('../config.js');

module.exports = async (userId, problem) => {
    await updateDBUser(userId, 'problem_category', problem);
    await send(userId, 'Опиши подробнее свою проблему.', null);
};

