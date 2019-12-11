
const send = require('./send.js');
const updateDBUser = require('./bd/updateDBUser.js');
const addDBUser = require('./bd/addDBUser.js');
const selectUsers = require('./bd/selectUsers');
const userInfo = require('./bd/userDBInfo');
const returnSpeakingWith = require('./bd/returnSpeakingWith.js');
const {CHAT} = require('./config.js');

module.exports = async ({from_id: userId, text: text, payload}) => {
    try{
console.log(`UserID: ${userId}, Command: ${JSON.parse(payload).command}`)
    } catch (e) {
        console.log(`UserID: ${userId}, Command: None`)
    }
    // {"command":"start"}
    if (payload === undefined) {
        if (text === "start") {
            await addDBUser(userId);
            await send(userId, 'Главное правило сервиса: твои персональные данные никто не увидит без твоего желания. Согласен с правилами?', 'ok_rules');
        } else {
            await updateDBUser(userId, 'problem_info', text);
            const sel_val =  await selectUsers(userId);
            var sel_mass = sel_val[0];
            const str = sel_val[1];
            await send(userId, 'Выбери пользователя, с которым хочешь общаться.', null);
            await send(userId, str, 'user_choose');
        }
    }
    else{
        try {

            let command = JSON.parse(payload).command;

            switch (command){
                case 'start':
                    // name?
                    await addDBUser(userId);
                    await send(userId, 'Главное правило сервиса: твои персональные данные никто не увидит без твоего желания. Согласен с правилами?', 'ok_rules');
                    break;

                case 'ok_rules':
                    await send(userId, 'Категория твоей проблемы?', 'categories');
                    break;

                case 'categories':
                    await updateDBUser(userId, 'problem_category', JSON.parse(payload).type);
                    await send(userId, 'Опиши подробнее свою проблему.', null);
                    break;

                case 'user_choose':
                    const sel_val =  await selectUsers(userId);
                    var sel_mass = sel_val[0];
                    const choose_id = sel_mass[JSON.parse(payload).type-1]
                    await updateDBUser(userId,'speaking_with',choose_id)
                    await updateDBUser(choose_id,'speaking_with',userId)
                    await updateDBUser(userId,'tasks_sended','+1')
                    await updateDBUser(choose_id,'tasks_received','+1')

                    await send(userId, 'Ожидай согласия пользователя.', null);

                    const str = await userInfo(userId)

                    await send(choose_id, str, null)
                    await send(choose_id,'Согласиться на общение?', 'ok_speaking');
                    break;

                case 'ok_speaking':
                    if (JSON.parse(payload).type === 'yes'){

                        const speakingWith = await returnSpeakingWith(userId)

                        await updateDBUser(userId,'tasks_r_accepted','+1');
                        await updateDBUser(speakingWith,'tasks_s_accepted','+1');

                        await send(speakingWith, 'Пользователь согласился на общение. Скорее заходи в ваш чат: ' + CHAT, 'rating');
                        await send(speakingWith, 'После общения оцени наш сервис.', 'rating');

                        await send(userId, 'Супер! Скорее заходи в ваш чат: ' + CHAT, null);
                    }
                    else{
                        const speakingWith = await returnSpeakingWith(userId);
                        const sel_val =  await selectUsers(speakingWith);
                        var sel_mass = sel_val[0];
                        const str = sel_val[1];
                        await send(speakingWith, 'Пользователь отказался. Выбери другого:', null);
                        await send(speakingWith, str, 'user_choose');
                    }

                    break;

                case 'rating':
                    updateDBUser(userId, 'rating', JSON.parse(payload).type);
                    await send(userId, 'Спасибо за оценку!', null);
                    break;
            }

        } catch (error) {
          console.log(error)
        }
    }



}



//коннект с базой
//сообщение -- действие
// старт, категория проблемы, описание проблемы, выбор пользователя, согласие на общение, оценка сервиса