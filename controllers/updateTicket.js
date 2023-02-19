const zendesk = require('node-zendesk')

async function updateTicket(ticketId, ticketProperties) {

    const client = zendesk.createClient({
        username: process.env.ZENDESK_EMAIL,
        token: process.env.ZENDESK_API_KEY,
        remoteUri: 'https://d3v-swiftly.zendesk.com/api/v2'
    })
    
    const { summary, priority, assignee } = ticketProperties;

    const ticketData = {
        "ticket": {
            "comment": {
                "body": summary,
                "public": false
            },
            "priority": priority,
            "assignee": assignee
        }
    }

    try {
        const response = await client.tickets.update(ticketId, ticketData)
        return;
    } catch (err) {
        console.log(ticketId, ticketProperties)
        throw new Error(err);
    }
}

module.exports = updateTicket;