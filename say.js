const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const settings = require('./managment/settings.json')
var prefix = ayarlar.prefix;

const log = message => {console.log(`${message}`);};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
if (err) console.error(err);
log(`Toplam ${files.length} Destekçi Ve Komut Yükleniyor...`);
files.forEach(f => {
let props = require(`./komutlar/${f}`);
log(`BOT | ${props.help.name} Komutu Yüklendi.`);
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {client.aliases.set(alias, props.help.name);});});});

client.reload = command => {return new Promise((resolve, reject) => {try {delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {if (cmd === command) client.aliases.delete(alias);});
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {client.aliases.set(alias, cmd.help.name);});resolve();} catch (e) {reject(e);}});};

client.load = command => {return new Promise((resolve, reject) => {try {let cmd = require(`./komutlar/${command}`);
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {client.aliases.set(alias, cmd.help.name);});resolve();} catch (e) {reject(e);}});};

client.unload = command => { return new Promise((resolve, reject) => { try {delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {if (cmd === command) client.aliases.delete(alias);});resolve();} catch (e) {reject(e);}});};

client.on("ready", async () => {
  let botVoiceChannel = client.channels.cache.get(ayarlar.botVoiceChannelID);
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
});

client.elevation = message => {
if (!message.guild) {return;}
let permlvl = 0;
if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
if (message.author.id === ayarlar.sahip) permlvl = 4; return permlvl;};
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));});
client.on('error', e => {console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));});
client.login(ayarlar.token);

client.on("guildMemberAdd", member => {
  member.roles.add(settings.roller.kayıtsızrol)
  member.roles.add(settings.roller.kayıtsızrol)
  member.roles.add(settings.roller.kayıtsızrol)
  member.roles.add(settings.roller.kayıtsızrol)//botun pinglenmemesi için.
})
 
 
//-------------------------------YENİ-HESAP--------------------------------------//

client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(7, 'days').fromNow()
   var user = member.user
   x = x.replace("birkaç saniye önce", " ")
   if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
  const kytsz = member.guild.roles.cache.get(settings.roller.kayıtsızrol) 
  const reglog = member.guild.channels.cache.find(r => r.id === "register kanal id");
   var rol = member.guild.roles.cache.get(settings.roller.karantinarol)
   var kayıtsız = member.guild.roles.cache.get(kytsz)
   member.roles.add(rol)
   member.roles.remove(kytsz)

   member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
   reglog.send(`${member} - ( \`${member.id}\` ) sunucuya katıldı fakat hesabı \`saniyeler önce\` oluşturulduğu için cezalıya atıldı.`)
setTimeout(() => {

}, 1000)


   }
        else {

        }
    });

//----------------------------------TAGA-ROL-----------------------------//

client.on("userUpdate", async (say, yeni) => {
  var sunucu = client.guilds.cache.get(''); 
  var uye = sunucu.members.cache.get(yeni.id);
  var normalTag = settings.taglar.untag;
  var ekipTag = settings.taglar.servertag; 
  var ekipRolü = settings.roller.ekiprol; 
  var logKanali = settings.kanallar.taglog; 

  if (!sunucu.members.cache.has(yeni.id) || yeni.bot || say.username === yeni.username) return;
  
  if ((yeni.username).includes(ekipTag) && !uye.roles.cache.has(ekipRolü)) {
    try {
      await uye.roles.add(ekipRolü);
      await uye.setNickname((uye.displayName).replace(normalTag, ekipTag));
      await uye.send(`Tagımızı aldığın için teşekkür ederiz yetkili olmak istersen \`YETKİLİ ALIMI DM\` rolündeki yetkililerimize ulaşabilirsin`);
      await client.channels.cache.get(settings.kanallar.taglog).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
    } catch (err) { console.error(err) };
  };
  
  if (!(yeni.username).includes(ekipTag) && uye.roles.cache.has(ekipRolü)) {
    try {
      await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(ekipRolü).position));
      await uye.setNickname((uye.displayName).replace(ekipTag, normalTag));
      await uye.send(`Selam dostum tagımızı bıraktığın için çok üzüldük eğer tekrardan aramıza katılmak istern buyur \`${ekipTag}\` **İYİ GÜNLER DOSTUM**`);
      await client.channels.cache.get(settings.kanallar.taglog).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
    } catch(err) { console.error(err) };
  };
});


//---------------------TAG-İLE-KATILMA--------------------//

client.on("guildMemberAdd", member => {
  let sunucuid = ""; 
  let tag = settings.taglar.servertag; 
  let rol = settings.roller.ekiprol; 
  let channel = client.guilds.cache.get(sunucuid).channels.cache.find(x => x.name == 'auto'); 
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()  
      .setColor("RED")
      .setDescription(`${member} - ( \`${member.id}\` ) id li üye sunucumuza tagımızı alarak katıldı !`)
      .setTimestamp()
     client.channels.cache.get(settings.kanallar.taglog).send(tagalma)
}
})

const invites = {};
const wait = require("util").promisify(setTimeout);
client.on("ready", () => {
  wait(1000);
  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("guildMemberAdd", member => {
    
    if (member.user.bot) return;

    member.guild.fetchInvites().then(async guildInvites => {
      const ei = invites[member.guild.id];
  
      invites[member.guild.id] = guildInvites;
  
      const invite = await guildInvites.find(
        i => (ei.get(i.code) == null ? i.uses - 1 : ei.get(i.code).uses) < i.uses
      );
  
      const daveteden = member.guild.members.cache.get(invite.inviter.id);
  
      db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
  
      db.set(`bunudavet_${member.id}`, invite.inviter.id);
  
      let davetsayiv2 = await db.fetch(
        `davet_${invite.inviter.id}_${member.guild.id}`
      );
  
      let davetsayi;
  
      if (!davetsayiv2) davetsayi = 0;
      else
        davetsayi = await db.fetch(
          `davet_${invite.inviter.id}_${member.guild.id}`
        );
    let date = moment(member.user.createdAt)
       const startedAt = Date.parse(date);
       var msecs = Math.abs(new Date() - startedAt);
         
       const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
       msecs -= years * 1000 * 60 * 60 * 24 * 365;
       const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
       msecs -= months * 1000 * 60 * 60 * 24 * 30;
       const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
       msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
       const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
       msecs -= days * 1000 * 60 * 60 * 24;
       const hours = Math.floor(msecs / (1000 * 60 * 60));
       msecs -= hours * 1000 * 60 * 60;
       const mins = Math.floor((msecs / (1000 * 60)));
       msecs -= mins * 1000 * 60;
       const secs = Math.floor(msecs / 1000);
       msecs -= secs * 1000;
         
       var string = "";
       if (years > 0) string += `${years} yıl ${months} ay`
       else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
       else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
       else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
       else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
       else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
       else if (secs > 0) string += `${secs} saniye`
           
         
       string = string.trim();
   
       let guild = member.client.guilds.cache.get(settings.kanallar.guildID)
       let log = guild.channels.cache.get(settings.kanallar.hgkanal);
       let endAt = member.user.createdAt
       let gün = moment(new Date(endAt).toISOString()).format('DD')
       let ay = moment(new Date(endAt).toISOString()).format('MM').replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
       let yıl = moment(new Date(endAt).toISOString()).format('YYYY')
       let saat = moment(new Date(endAt).toISOString()).format('HH:mm')
       let kuruluş = `${gün} ${ay} ${yıl} ${saat}`;
       hgkanal.send(`Hoş geldin ${member} - ( \`${member.id}\` ) :tada:

Hesabını \`${kuruluş} (${string})\` önce oluşturmuşsun | <@&${config.kayıtcıRolleri}> 

Kuralları #kurallar kısmından okuduğun varsayılarak \`cezai işlem\` uygulanacaktır! Tagımıza ulaşmak için herhangi bir kanalda \`.tag\` yazman yeterlidir.

${daveteden} Adlı üye \`${davetsayi}.\` davetini gerçekleştirerek sunucumuzun ${member.guild.memberCount} üyesi olmanı sağladı :tada::tada::tada:
`)
})});
client.on("guildMemberRemove", async member => {
    let davetçi = await db.fetch(`bunudavet_${member.id}`);
  
    const daveteden = member.guild.members.cache.get(davetçi);
  
    db.add(`davet_${davetçi}_${member.guild.id}`, -1);
  })
