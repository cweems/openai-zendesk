const zendeskClient = require('./utils/zendeskClient')

async function getTicketComments (ticketId) {
  const client = zendeskClient()

  try {
    const comments = await client.tickets.getComments(ticketId)

    const formattedComments = comments.map((comment) => {
      let user = ''
      const message = comment.plain_body.replace(/\r?\n|\r/g, ' ')

      if (comment.via.channel === 'web') {
        user = 'Support agent'
      } else {
        user = 'Customer'
      }

      return `${user}: ${message}`
    }).join('\n')

    return formattedComments
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

module.exports = getTicketComments
