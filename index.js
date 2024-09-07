const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

require('dotenv').config();

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

  const activityType = process.env.ACTIVITY_TYPE || 'PLAYING';

  const r = new Discord.RichPresence()
    .setApplicationId('534203414247112723')
    .setType(activityType)
    .setURL('https://www.youtube.com/@Kalpesh-cc5wn')
    .setState('Playing With Friends')
    .setName('Battlegrounds Mobile India')
    .setDetails(`BGMI Playing [${formatTime()}]`)
    .setParty({
      max: 8130,
      current: 973,
      id: Discord.getUUID(),
    })
    .setStartTimestamp(Date.now())
    .setAssetsLargeImage('https://tenor.googleapis.com/v2/media?id=2232437380951958796&format=optimizedgif&client_key=tenor_web&appversion=browser-r20240903-1&access_token=ya29.a0AcM612xVDjpdQ3gjn-sdYYzrSdwTy8b-MrZbjR36m7BdxPdRQZosuAFtaOvZLyTqwSXP4uJb9ursuFKU2-QsJDBBrth4JKsybMGszeuAv9ag2OE89F1BosrM8EhX-vDdNSJcM--gfMjQU7MOXkVHsHXBYfnlm6_jowaCgYKAQASARMSFQHGX2Mi96ns4u36RdvPPj_yf8lg1w0169&key=AIzaSyC-P6_qz3FzCoXGLk6tgitZo4jEJ5mLzD8')
    .setAssetsLargeText('Battleground Mobile India')
    .setAssetsSmallImage('https://tenor.googleapis.com/v2/media?id=15310629048740341586&format=optimizedgif&client_key=tenor_web&appversion=browser-r20240903-1&access_token=ya29.a0AcM612xVDjpdQ3gjn-sdYYzrSdwTy8b-MrZbjR36m7BdxPdRQZosuAFtaOvZLyTqwSXP4uJb9ursuFKU2-QsJDBBrth4JKsybMGszeuAv9ag2OE89F1BosrM8EhX-vDdNSJcM--gfMjQU7MOXkVHsHXBYfnlm6_jowaCgYKAQASARMSFQHGX2Mi96ns4u36RdvPPj_yf8lg1w0169&key=AIzaSyC-P6_qz3FzCoXGLk6tgitZo4jEJ5mLzD8')
    .setAssetsSmallText('BGMI')
    .addButton('My Server', 'https://discord.gg/SVqQYEMp8m')
    .addButton('My Profile', 'https://www.instagram.com/kalpesh.___3080');

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
});

client.login(process.env.TOKEN);
