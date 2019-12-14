const {TOKEN} = require('./config');
const api = require('vk-easy');

    ans = api('users.get', {
        user_ids: 1,
        access_token: TOKEN,
    });
    console.log(TOKEN)
ans.then(    console.log)


