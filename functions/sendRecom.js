const send = require('../functions/send.js');
const updateDBUser = require('../db/updateDBUser.js');
const addDBUser = require('../db/addDBUser.js');
const selectUsers = require('../db/selectUsers');
const userInfo = require('../db/userDBInfo');
const returnSpeakingWith = require('../db/returnSpeakingWith.js');
const getDBRecom  = require('../db/getDBRecom')
const {CHAT} = require('../config.js');

module.exports = async (userId) => {
    const ans = await userInfo(userId);
    const recommend = await getDBRecom(ans.problem_category)
    await send(userId, 'Держи типовые рекомендации по решению твоей проблемы: ', null)
    await send(userId, recommend, null)

};

