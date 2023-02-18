let client;

(function () {
    client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height: '400px' });
    client.get('ticket').then((data) => {
        console.log(data)
    })
}());

async function transfer() {

    try {
        const ticketData = await client.get('ticket.id')
        const ticketId = ticketData['ticket.id'];

        console.log({ticketId});

        const response = await fetch(`http://localhost:3000/transfer?id=${ticketId}`, { mode: 'no-cors' })
        console.log(response);
    } catch(err) {
        console.warn('Ticket data request error: ', err);
    }

}