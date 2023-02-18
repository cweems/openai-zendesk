(function () {
    var client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height: '400px' });
    client.get('ticket').then((data) => {

        console.log(data)
    })
}());

function transfer() {
    fetch('http://localhost:3000/transfer', { mode: 'no-cors' })
        .then(() => {
            console.log('success')
        })
        .catch(() => {
            console.log('err')
        })
}