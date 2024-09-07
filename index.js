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
    .setAssetsLargeImage('https://media.discordapp.net/attachments/1101483858878283877/1281280403860230194/Battleground_Mobile_India.png?ex=66db24dd&is=66d9d35d&hm=0693f1efca4b68772fff09647d93e6f185255a86b142077c6eec4c3c6f4e88a0&=&format=webp&quality=lossless') //You can put links in tenor or discord and etc
    .setAssetsLargeText('Cyber X Official') //Text when you hover the Large image
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1101483858878283877/1280947566649016470/verified-verificado.gif?ex=66da97a2&is=66d94622&hm=3b97a8f94d081512578ebb8a786d85014bb043dc72f466e010fe1c9c9cc81bd4&=') //You can put links in tenor or discord and etc
    .setAssetsSmallText('CXO') //Text when you hover the Small image
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