const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

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
      id: Discord.getUUID()
    })
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://media.discordapp.net/attachments/1283807613687169176/1286688668316336169/240px-Battleground_Mobile_India.png?ex=66eed1b4&is=66ed8034&hm=fa1412d5d6eb9736ef29b4c09b29c6b9dd508433c444f8b810fc98abd9fb7acf&=&format=webp&quality=lossless')
    .setAssetsLargeText('Battleground Mobile India')
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1101483858878283877/1280947566649016470/verified-verificado.gif?ex=66ee5e22&is=66ed0ca2&hm=af9754faa46d6a83a2e06866c2d7cbb14feee673e12aaeddb419b9ff2a037cc9&=')
    .setAssetsSmallText('Verified')
    .addButton('Join My Discord', 'https://discord.gg/SVqQYEMp8m')
    .addButton('Follow My Instagram', 'https://www.instagram.com/kalpesh.___3080');

  try {
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
    }, 1000); // Update every second
  } catch (error) {
    console.error('Error setting activity or presence:', error);
  }
});

const mySecret = process.env['TOKEN'];
client.login(mySecret).catch(err => console.error('Login error:', err));
