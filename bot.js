const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  if (message.content.startsWith('$crypto')) {
    try {
      const response = await axios.get(API_URL);
      const data = response.data;
      const bitcoinPrice = data.bitcoin.usd;
      const ethereumPrice = data.ethereum.usd;

      message.channel.send(
        `Bitcoin Price: $${bitcoinPrice}\nEthereum Price: $${ethereumPrice}`
      );
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
      message.channel.send('Failed to retrieve data. Try again later.');
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
