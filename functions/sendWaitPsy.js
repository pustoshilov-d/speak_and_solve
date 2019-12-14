const send = require('../functions/send.js');
const updateDBUser = require('../db/updateDBUser.js');
const addDBUser = require('../db/addDBUser.js');
const selectUsers = require('../db/selectUsers');
const userInfo = require('../db/userDBInfo');
const returnSpeakingWith = require('../db/returnSpeakingWith.js');
const {CHAT, PSY_ID, GROUP} = require('../config.js');

module.exports = async (userId) => {
    ans = await userInfo(userId);
    str = `Новый клиент! С тобой хочет пообщаться ${ans.name} \nКатегория: ${ans.problem_category} \nПроблема: ${ans.problem_info}\nСсылка на диалог: https://vk.com/gim${GROUP}?sel=${userId}`;
    await send(PSY_ID,str, null);
    await send(userId, 'Заявка отправлена. Психолог свяжется с тобой через этот чат. Пока ожидаешь ответа, попробуй пообщаться с другими людьми.')
};


