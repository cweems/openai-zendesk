const zendeskClient = require('./utils/zendeskClient')

async function addTicketComment(ticketId, summary) {

    const client = zendeskClient();

    const ticketData = {
        "ticket": {
            "comment": {
                "body": summary,
                "public": false
            },
        }
    }

    try {
        await client.tickets.update(ticketId, ticketData)
    } catch (err) {
        console.log(ticketId, ticketProperties)
        throw new Error(err);
    }
}

module.exports = addTicketComment;