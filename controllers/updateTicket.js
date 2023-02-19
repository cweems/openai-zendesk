const zendeskClient = require('./utils/zendeskClient')
const matchGroupNameToId = require('./utils/matchGroupNameToId');

async function updateTicket(ticketId, ticketProperties) {

    const client = zendeskClient();
    
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