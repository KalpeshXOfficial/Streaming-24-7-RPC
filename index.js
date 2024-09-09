const express = require('express');
const server = express();
const Discord = require('discord.js-selfbot-v13');
const axios = require('axios');
const config = require('./config.json');

const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

const mySecret = process.env['TOKEN'];
const statuses = config.statuses;
let status_index = 0;

server.all("/", (req, res) => {
  res.send('<meta http-equiv="refresh" content="0; URL=https://mrdarkshadoow.github.io"/>');
});

function formatTime() {
  const date = new Date();
  const options = {
    timeZone: 'Asia/Kolkata',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - Successfully Logged On!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1280906241501036544')
    .setType('STREAMING')
    .setURL('https://www.twitch.tv/discord')
    .setState('Streaming with Squad')
    .setName('Battlegrounds Mobile India')
    .setDetails(`Streaming BGMI [${formatTime()}]`)
    .setParty({
      max: 8130,
      current: 973,
      id: Discord.getUUID(),
    })
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://media.discordapp.net/attachments/1101483858878283877/1281280403860230194/Battleground_Mobile_India.png?ex=66dfc21d&is=66de709d&hm=522e9c0b8070d61c4dc2fd22a122006c3f97c4341bcdda3e69ae09a5727328df&=&format=webp&quality=lossless')
    .setAssetsLargeText('Battleground Mobile India')
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1101483858878283877/1280947566649016470/verified-verificado.gif?ex=66dfdda2&is=66de8c22&hm=e237c83dcd3fa1cd3eef2910c897b97d9766472c415f043325ebaa55e0abb977&=')
    .setAssetsSmallText('Verified')
    .addButton('Join My Discord', 'https://discord.gg/SVqQYEMp8m')
    .addButton('Follow My Instagram', 'https://www.instagram.com/kalpesh.___3080');

  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" });

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `BGMI Playing [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000);

  setInterval(() => {
    axios.patch('https://discordapp.com/api/v6/users/@me/settings', {
      custom_status: {
        text: statuses[status_index++ % statuses.length],
        expires_at: null
      }
    }, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.305 Chrome/69.0.3497.128 Electron/4.0.8 Safari/537.36',
        'Authorization': mySecret,
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        console.log('Status updated');
      })
      .catch(err => {
        console.error('Error updating status:', err);
      });
  }, config.time);
});

client.login(mySecret);
