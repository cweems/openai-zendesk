const zendesk = require('node-zendesk')
const matchGroupNameToId = require('./utils/matchGroupNameToId');

async function updateTicket(ticketId, ticketProperties) {

    const client = zendesk.createClient({
        username: process.env.ZENDESK_EMAIL,
        token: process.env.ZENDESK_API_KEY,
        remoteUri: process.env.ZENDESK_REMOTE_URI
    })
    
    const { summary, priority, assignee } = ticketProperties;
    const groupId = await matchGroupNameToId(assignee);

    const ticketData = {
        "ticket": {
            "comment": {
                "body": summary,
                "public": false
            },
            "priority": priority,
            "group_id": groupId,
        }
    }

    console.log(ticketData);

    try {
        const response = await client.tickets.update(ticketId, ticketData)
        return;
    } catch (err) {
        console.log(ticketId, ticketProperties)
        throw new Error(err);
    }
}

module.exports = updateTicket;