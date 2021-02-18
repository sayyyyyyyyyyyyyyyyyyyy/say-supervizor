const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const moment = require('moment')
const settings = require('../managment/settings.json')
exports.run = async (client, message, args) => {

if(!message.member.roles.cache.get(settings.roller.botcommand) && !message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`Bu komutu kullanmak için \`<@&${settings.roller.botcommand}>\` yetkisine sahip olmalısın.`)
.setColor(settings.renk.saykırmızı))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(new MessageEmbed().setDescription(`Geçerli Bir Kullanıcı Etiketlemelisin !`).setColor("RANDOM")).then(msg => msg.delete({timeout: 5000}))

if(message.member.roles.highest.position <= member.roles.highest.position) return 
if(member.manageable)  member.setNickname(member.user.username).catch();
let digerroller = [];
member.roles.cache.filter(r => r.id).map(r => {digerroller.push(r.id)})
member.roles.remove(digerroller)
await member.roles.add(settings.roller.kayıtsızrol)
message.channel.send(new MessageEmbed().setDescription(`${member} Adlı kullanıcı ${message.author} tarafından kayıtsıza atıldı! | <@&saykayıtsızid>`).setFooter("say 🖤 was here")).then(msg => msg.delete({timeout: 4000}))

message.react(settings.durumlar.dogru)
}  

exports.conf = { enabled: true, guildOnly: true , aliases: ["kayıtsız", "unregsiter"]}

exports.help = { name: "kayıtsız"}