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
    timeZone: 'Asia/Kolkata', //https://www.zeitverschiebung.net/en/
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
  .setType('STREAMING') //STREAMING, PLAYING, LISTENING
  .setURL('https://www.twitch.tv/daemonaj') // Twitch link required for STREAMING type
  .setState('Streaming with Squad') // Custom status message
  .setName('Battlegrounds Mobile India') // Custom game name
  .setDetails(`Streaming BGMI [${formatTime()}]`) // Custom details with a dynamic time
  .setParty({
    max: 8130,
    current: 973,
    id: Discord.getUUID(), // Party ID for the session
  })
  .setStartTimestamp(Date.now()) // Starts the timestamp from now
  .setAssetsLargeImage('https://media.discordapp.net/attachments/1101483858878283877/1281280403860230194/Battleground_Mobile_India.png?ex=66dfc21d&is=66de709d&hm=522e9c0b8070d61c4dc2fd22a122006c3f97c4341bcdda3e69ae09a5727328df&=&format=webp&quality=lossless') // Large image for the game
  .setAssetsLargeText('Battleground Mobile India') // Text on hover for large image
  .setAssetsSmallImage('https://media.discordapp.net/attachments/1101483858878283877/1280947566649016470/verified-verificado.gif?ex=66dfdda2&is=66de8c22&hm=e237c83dcd3fa1cd3eef2910c897b97d9766472c415f043325ebaa55e0abb977&=') // Small verified icon
  .setAssetsSmallText('Verified') // Text on hover for small image
  .addButton('Join My Discord', 'https://discord.gg/SVqQYEMp8m') // First custom button
  .addButton('Follow My Instagram', 'https://www.instagram.com/kalpesh.___3080'); // Second custom button


  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" }); // online, idle, dnd, offline

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
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);