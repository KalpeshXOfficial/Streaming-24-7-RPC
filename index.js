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
    .setAssetsLargeImage('https://media.discordapp.net/attachments/1101483858878283877/1281280403860230194/Battleground_Mobile_India.png?ex=66e1139d&is=66dfc21d&hm=a52bacc6431499ea488bb409717b6b6e6d1bb85a916500edc563bb4d10349fd5&=&format=webp&quality=lossless')
    .setAssetsLargeText('Battleground Mobile India')
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1101483858878283877/1280947566649016470/verified-verificado.gif?ex=66e12f22&is=66dfdda2&hm=797df7b42d493e1aa50596ddb4dab1a76bc5034800cd80f96d08c3e592df4298&=')
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
