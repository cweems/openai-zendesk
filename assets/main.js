let client;

// Invoke Zendesk JS Client on page load
(function () {
    client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height: '400px' });
    client.get('ticket').then((data) => {
        console.log(data)
    })
}());

// Handle summarize button click
async function summarize() {
    try {
        const ticketData = await client.get('ticket.id')
        const ticketId = ticketData['ticket.id'];

        // Check if we're running from dev and configure request
        // Avoiding needing to compile frontened assets for now...
        const environment = window.location.origin.includes('localhost:4567') ? "dev" : "prod";        
        const corsMode = environment === 'dev' ? 'no-cors' : 'cors';
        const url = environment === 'dev' ? 'http://localhost:3000' : window.location.origin;

        const response = await fetch(`${url}/summarize?id=${ticketId}`, { mode: corsMode })
        console.log(response);
    } catch(err) {
        console.warn('Ticket data request error: ', err);
    }
}