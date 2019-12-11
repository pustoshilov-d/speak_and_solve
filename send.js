const api = require('vk-easy');
const {TOKEN, GROUP} = require('./config');

const keyboards = [];
keyboards['ok_rules'] = JSON.stringify({
    one_time: false,
    buttons: [
        [{
            action: {
                type: "text",
                label: "Да",
                payload: {command: "ok_rules"}
            },
            "color": "positive"
        }],
    ]});
keyboards['categories'] = JSON.stringify({
    one_time: false,
    buttons: [
        [{
            action: {
                type: "text",
                label: "Смерть родственника",
                payload: {
                    command: "categories",
                    type: "1"}
            },
        }],
        [{
            action: {
                type: "text",
                label: "Свидетельство смерти",
                payload: {
                    command: "categories",
                    type: "2"}
            },
        }],
        [{
            action: {
                type: "text",
                label: "Сессия",
                payload: {
                    command: "categories",
                    type: "3"}
            },
        }],
    ]});
keyboards['user_choose'] = JSON.stringify({
    one_time: false,
    buttons: [
        [{
            action: {
                type: "text",
                label: "1",
                payload: {
                    command: "user_choose",
                    type: "1"
                }
            },
            "color": "default"
        }],
        [{
            action: {
                type: "text",
                label: "2",
                payload: {
                    command: "user_choose",
                    type: "2"
                }
            },
            "color": "default"
        }],
        [{
            action: {
                type: "text",
                label: "3",
                payload: {
                    command: "user_choose",
                    type: "3"
                }
            },
            "color": "default"
        }],
    ]});
keyboards['ok_speaking'] = JSON.stringify({
    one_time: false,
    buttons: [
        [{
            action: {
                type: "text",
                label: "Да",
                payload: {
                    command: "ok_speaking",
                    type: "yes"}
            },
            "color": "positive"
        }],
        [{
            action: {
                type: "text",
                label: "Нет",
                payload: {
                    command: "ok_speaking",
                    type: "no"}
            },
            "color": "negative"
        }],
    ]});
keyboards['rating'] = JSON.stringify({
    one_time: false,
    buttons: [
        [{
            action: {
                type: "text",
                label: "Супер",
                payload: {
                    command: "rating",
                    type: "3"
                }
            },
            "color": "positive"
        }],
        [{
            action: {
                type: "text",
                label: "Средне",
                payload: {
                    command: "rating",
                    type: "2"
                }
            },
            "color": "default"
        }],
        [{
            action: {
                type: "text",
                label: "Не оч",
                payload: {
                    command: "rating",
                    type: "1"
                }
            },
            "color": "negative"
        }],
    ]});
keyboards[null] = JSON.stringify({
    one_time: false,
    buttons: [
    ]});



module.exports = async (userId, text, typeMenu) => {
    await api('messages.send', {
        user_id: userId,
        random_id:  Math.floor(Math.random()*999999999),
        message: text,
        group_id: GROUP,
        keyboard: keyboards[typeMenu],
        access_token: TOKEN
    })
};