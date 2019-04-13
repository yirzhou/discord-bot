const Discord = require('discord.js')
const axios = require('axios')
const client = new Discord.Client()
const http = require('http');

require('dotenv').config()

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {  
    // Set a response type of plain text for the response
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Send back a response and end the connection
    res.end('Hello World!\n');
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');  
console.log('Node server running on port 3000');  

client.on('message', msg=> {
    axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate', {
        params: {
            key: process.env.YANDEX_API_KEY,
            text: msg.content,
            lang: 'en'
        }
    }).then(res => {
        if (res.data.text[0] !== msg.content) {
            msg.reply(res.data.text[0])
        }
    })
})

client.login(process.env.BOT_TOKEN)
