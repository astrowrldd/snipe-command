const { Collection, Intents, MessageEmbed } = require('discord.js')

const Discord = require('discord.js')
const client = new Discord.Client()
const config = require("./config.json")
const prefix = ","
client.snipes = new Map()

client.on('messageDelete', function (message, channel) {
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
})

client.on('ready', () => {
    console.log('i am ready!')
});



client.on('message', message => {
    let args = message.content.substring(prefix.length).split(" ")

    if (message.content.startsWith(`${prefix}snipe`)) {
        const msg = client.snipes.get(message.channel.id);
        if (!msg) return message.channel.send('there is nothing to snipe!')

        const EMBED = new Discord.MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setDescription(msg.content)
        .setColor("BLACK")
        .setImage(msg.image)
        .setFooter('sniped message')
        .setTimestamp()

        message.channel.send(EMBED)
    }
})

client.login(config.token);