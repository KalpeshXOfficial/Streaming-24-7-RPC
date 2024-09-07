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
    .setType('PLAYING') //STREAMING, PLAYING, LISTENING
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
    .setAssetsLargeImage('https://media.discordapp.net/attachments/1101483858878283877/1281280403860230194/Battleground_Mobile_India.png?ex=66dd1f1d&is=66dbcd9d&hm=6da45c8e1253a47249747061369cecd3afd94ad9627ec21b3139672997218ef6&=&format=webp&quality=lossless') //You can put links in tenor or discord and etc
    .setAssetsLargeText('Battlegrounds Mobile India') //Text when you hover the Large image
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1101483858878283877/1281279281820864563/discord-verification-verification.png?ex=66dd1e11&is=66dbcc91&hm=9387d830ac8f3b4c9b5efdc67daa2630daf63e9433c49bda45db92976df02768&=&format=webp&quality=lossless') //You can put links in tenor or discord and etc
    .setAssetsSmallText('BGMI') //Text when you hover the Small image
    .addButton('My Profile', 'https://www.instagram.com/kalpesh.___3080')
    .addButton('My WebSite', 'https://cyberfoxofficial.blogspot.com');

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
