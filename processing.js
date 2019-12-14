const send = require('./functions/send.js');
const updateDBUser = require('./db/updateDBUser.js');
const addDBUser = require('./db/addDBUser.js');
const selectUsers = require('./db/selectUsers');
const userInfo = require('./db/userDBInfo');
const returnSpeakingWith = require('./db/returnSpeakingWith.js');

const sendRules = require('./functions/sendRules')
const sendProblemInfo = require('./functions/sendProblemInfo')
const sendRecom = require('./functions/sendRecom')
const sendWaitPsy = require('./functions/sendWaitPsy.js')
const sendUserChoice = require('./functions/sendUserChoice')
const sendConverRequest = require('./functions/sendConverRequest')
const sendChat = require('./functions/sendChat')
const sendRequestRejected = require('./functions/sendRequestRejected')
const sendEnd = require('./functions/sendEnd')





module.exports = async ({from_id: userId, text: text, payload}) => {
    try{
    console.log(`UserID: ${userId}, Command: ${JSON.parse(payload).command}`)
    } catch (e) {
        console.log(`UserID: ${userId}, Command: None`)
    }
    // {"command":"start"}
    if (payload === undefined) {
        if (text === "start") {
            await sendRules(userId)

        } else {
            await updateDBUser(userId, 'problem_info', text);
            await sendRecom(userId);
            await send(userId, 'Выбери, с кем бы ты хотел решить свою проблему.', 'resolve_type');
        }
    }
    else{
        try {

            let command = JSON.parse(payload).command;

            switch (command){
                case 'start':
                    await sendRules(userId);
                    break;

                case 'ok_rules':
                    await send(userId, 'Категория твоей проблемы?', 'categories');
                    break;

                case 'categories':
                    await sendProblemInfo(userId, JSON.parse(payload).type);
                    break;

                case "resolve_type":
                    if (JSON.parse(payload).type === 'psy'){
                        await sendWaitPsy(userId);
                        await sendUserChoice(userId);
                        break;
                    }
                    else {
                        await sendUserChoice(userId);
                        break;
                    }

                case 'user_choose':
                    await sendConverRequest(userId, JSON.parse(payload).type-1);
                    break;

                case 'ok_speaking':
                    if (JSON.parse(payload).type === 'yes'){
                        const speakingWith = await returnSpeakingWith(userId);
                        await sendChat(userId,speakingWith);
                        await send(userId, 'После общения оцени наш сервис.', 'rating');
                    }
                    else{
                        sendRequestRejected(userId)
                    }
                    break;

                case 'rating':
                    await sendEnd(userId, JSON.parse(payload).type);
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