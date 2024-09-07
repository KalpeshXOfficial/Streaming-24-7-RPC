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
    .setAssetsLargeImage('https://tenor.googleapis.com/v2/media?id=2232437380951958796&format=optimizedgif&client_key=tenor_web&appversion=browser-r20240903-1&access_token=ya29.a0AcM612xVDjpdQ3gjn-sdYYzrSdwTy8b-MrZbjR36m7BdxPdRQZosuAFtaOvZLyTqwSXP4uJb9ursuFKU2-QsJDBBrth4JKsybMGszeuAv9ag2OE89F1BosrM8EhX-vDdNSJcM--gfMjQU7MOXkVHsHXBYfnlm6_jowaCgYKAQASARMSFQHGX2Mi96ns4u36RdvPPj_yf8lg1w0169&key=AIzaSyC-P6_qz3FzCoXGLk6tgitZo4jEJ5mLzD8') //You can put links in tenor or discord and etc
    .setAssetsLargeText('Battleground Mobile India') //Text when you hover the Large image
    .setAssetsSmallImage('https://tenor.googleapis.com/v2/media?id=2232437380951958796&format=optimizedgif&client_key=tenor_web&appversion=browser-r20240903-1&access_token=ya29.a0AcM612xVDjpdQ3gjn-sdYYzrSdwTy8b-MrZbjR36m7BdxPdRQZosuAFtaOvZLyTqwSXP4uJb9ursuFKU2-QsJDBBrth4JKsybMGszeuAv9ag2OE89F1BosrM8EhX-vDdNSJcM--gfMjQU7MOXkVHsHXBYfnlm6_jowaCgYKAQASARMSFQHGX2Mi96ns4u36RdvPPj_yf8lg1w0169&key=AIzaSyC-P6_qz3FzCoXGLk6tgitZo4jEJ5mLzD8') //You can put links in tenor or discord and etc
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