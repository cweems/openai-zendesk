const zendesk = require('node-zendesk')

async function updateTicket(ticketId, commentText) {

    const client = zendesk.createClient({
        username: process.env.ZENDESK_EMAIL,
        token: process.env.ZENDESK_API_KEY,
        remoteUri: 'https://d3v-swiftly.zendesk.com/api/v2'
    })

    console.log(ticketId, commentText[0].text);

    const ticketData = {
        "ticket": {
            "comment": {
                "body": commentText[0].text,
                "public": false
            },
        }
    }

    try {
        const response = await client.tickets.update(ticketId, ticketData)
    } catch (err) {
        console.log(ticketId, commentText)
        throw new Error(err);
    }
}

module.exports = updateTicket;