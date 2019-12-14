const send = require('../functions/send.js');
const updateDBUser = require('../db/updateDBUser.js');
const addDBUser = require('../db/addDBUser.js');
const selectUsers = require('../db/selectUsers');
const userInfo = require('../db/userDBInfo');
const returnSpeakingWith = require('../db/returnSpeakingWith.js');
const {CHAT} = require('../config.js');

module.exports = async (userId, massId) => {
    const sel_val =  await selectUsers(userId);
    const choose_id = sel_val[0][massId];

    await updateDBUser(userId,'speaking_with',choose_id);
    await updateDBUser(userId,'tasks_sended','+1');
    await send(userId, 'Ожидай согласия пользователя.', null);

    const ans = await userInfo(userId);
    str = `Привет! С тобой хочет пообщаться ${ans.name} \nКатегория: ${ans.problem_category} \nПроблема: ${ans.problem_info}\n\n`;

    await updateDBUser(choose_id,'speaking_with',userId);
    await updateDBUser(choose_id,'tasks_received','+1');
    await send(choose_id, str, null);
    await send(choose_id,'Согласиться на общение?', 'ok_speaking');

};

