require('dotenv').config()
console.log(process.env)

const zendesk = require('node-zendesk')

const updateTicket = function(ticketId, commentText) {
    console.log(process.env.ZENDESK_EMAIL, process.env.ZENDESK_API_KEY)

    const client = zendesk.createClient({
        username: process.env.ZENDESK_EMAIL,
        token: process.env.ZENDESK_API_KEY,
        remoteUri: 'https://d3v-swiftly.zendesk.com/api/v2'
    })

    const ticketData = {
        "ticket": {
            "comment": {
                "body": commentText,
                "public": false
            },
        }
    }

    client.tickets.update(ticketId, ticketData)
        .then(function (result) {
            console.log(JSON.stringify(result[0], null, 2, true));//gets the first page
        })
        .catch(function (error) {
            console.log(error);
        });

}

updateTicket(1, 'This is an internal automated update from GPT-3.\n *Issue:* Line break');