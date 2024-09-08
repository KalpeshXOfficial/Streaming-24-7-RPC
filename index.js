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
    .setApplicationId('534203414247112723')
    .setType('LISTENING') //STREAMING, PLAYING, LISTENING
    .setURL('https://www.youtube.com/@Kalpesh-cc5wn') //Must be a youtube video link 
    .setState('Playing With Friends')
    .setName('Battlegrounds Mobile India')
    .setDetails(`BGMI Playing [${formatTime()}]`)
    .setParty({
      max: 8130,
      current: 973,
      id: Discord.getUUID(),
    })
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://media.discordapp.net/attachments/1101483858878283877/1281280403860230194/Battleground_Mobile_India.png?ex=66de709d&is=66dd1f1d&hm=14ac8032606c9fba52bf4903ec964d79e34100a6292b45eb5fc04febb59328a8&=&format=webp&quality=lossless') //You can put links in tenor or discord and etc
    .setAssetsLargeText('Battleground Mobile India') //Text when you hover the Large image
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1101483858878283877/1280947566649016470/verified-verificado.gif?ex=66de8c22&is=66dd3aa2&hm=3ab3a1fdb7e335ea6386d40e705d5b2db256961113485623d6e6dc34581e926a&=') //You can put links in tenor or discord and etc
    .setAssetsSmallText('BGMI') //Text when you hover the Small image
    .addButton('My Server', 'https://discord.gg/SVqQYEMp8m')
    .addButton('My Profile', 'https://www.instagram.com/kalpesh.___3080');

  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" }); //dnd, online, idle, offline

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