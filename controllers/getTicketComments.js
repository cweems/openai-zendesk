const zendesk = require('node-zendesk')

async function getTicketComments (ticketId) {

    const client = zendesk.createClient({
        username: process.env.ZENDESK_EMAIL,
        token: process.env.ZENDESK_API_KEY,
        remoteUri: 'https://d3v-swiftly.zendesk.com/api/v2'
    })


    try {
        const comments = await client.tickets.getComments(ticketId)

        const formattedComments = comments.map((comment) => {
            let user = '';
            let message = comment.plain_body.replace(/\r?\n|\r/g, " ");

            if (comment.via.channel === 'web') {
                user = 'Support agent'
            } else {
                user = 'Customer'
            }

            return `${user}: ${message}`;
        }).join('\n');

        return formattedComments;
    } catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

module.exports = getTicketComments