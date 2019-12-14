const {TOKEN} = require('../config');
const api = require('vk-easy');

module.exports = async (userId) => {
    ans = await api('users.get', {
                user_ids: userId,
                access_token: TOKEN,
            });

    return ans
};

