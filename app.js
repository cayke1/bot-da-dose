const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

client.on('message', async (msg) => {
    if(msg.body === '!dose') {
        const chat = await msg.getChat();
        let seconds = randomSec();
        let mentions = [];
        participants = chat.participants.length;
        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            
            mentions.push(contact);
        }
        
        let randomNumber = randomizer(chat.participants.length);
            

        await chat.sendMessage(`Seu wagner mandou o ${mentions[randomNumber].name} beber, ${seconds} segundos`);
    }
});

function randomizer(max) {
    let num = Math.floor(Math.random() * (max - 1) + 1);
    return num;
}

function randomSec() {
    let num = Math.floor(Math.random() * (10 - 4) + 4);
    return num;
}

 

 