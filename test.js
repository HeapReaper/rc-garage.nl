const webhookUrl = "https://discord.com/api/webhooks/1412183031824912486/173_WcXJG5rCJta9flKwCX8rmURxwsFKUVdI3mMgAHXtGiDrPb73NRrc2Og4N3OdM1XI";


// Maak de JSON-body voor de webhook.
const body = {
    content: `Nieuw artikel: `
};

try {
    await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
} catch (error) {
    console.error('Fout bij het versturen van de webhook:', error);
}
