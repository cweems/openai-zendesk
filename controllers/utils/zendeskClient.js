const zendesk = require('node-zendesk')

function zendeskClient () {
    return zendesk.createClient({
        username: process.env.ZENDESK_EMAIL,
        token: process.env.ZENDESK_API_KEY,
        remoteUri: process.env.ZENDESK_REMOTE_URI
    })
}

module.exports = zendeskClient;