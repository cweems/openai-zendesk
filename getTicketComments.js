require('dotenv').config()
console.log(process.env)

const zendesk = require('node-zendesk')

const getTicketComments = function(ticketId) {
    const client = zendesk.createClient({
        username: process.env.ZENDESK_EMAIL,
        token: process.env.ZENDESK_API_KEY,
        remoteUri: 'https://d3v-swiftly.zendesk.com/api/v2'
    })

    client.tickets.getComments(ticketId)
        .then(function (result) {
            // console.log(JSON.stringify(result));

            result.map((comment) => {
                let user = '';
                let message = comment.plain_body.replace(/\r?\n|\r/g, " ");

                if (comment.via.channel === 'web') {
                    user = 'Support agent'
                } else {
                    user = 'Customer'
                }
                console.log(`${user}: ${message}`);
            })
            // console.log(JSON.stringify(result[0], null, 2, true));//gets the first page
        })
        .catch(function (error) {
            console.log(error);
        });
}

getTicketComments(2);