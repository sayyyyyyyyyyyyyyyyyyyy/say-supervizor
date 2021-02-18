const { MessageEmbed } = require('discord.js')
const data = require('quick.db')
const settings = require('../managment/settings.json')
exports.run = async (client, message, args) => {
if(!message.member.roles.cache.get(settings.roller.teyitcirol) && !message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`Bu komutu kullanmak için <@&${settings.roller.teyitcirol}> yetkisine sahip olmalısın.`)
.setColor(settings.renk.kirmizi))
.then(x => x.delete({ timeout: 6500 }));
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let Name = args[1]
let Age = args[2]
if(!member) return message.channel.send(new MessageEmbed().setDescription(`Geçerli bir kullanıcı/ID belirtmelisin.  \nÖrnek \`.isim @say/id\``).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor(settings.renk.kirmizi)).then(x => x.delete({timeout: 6500}));
if(!Name || !Age) return message.channel.send(new MessageEmbed().setDescription(`Geçerli bir yaş belirtmelisin.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor(settings.renk.kirmizi)).then(x => x.delete({timeout: 6500}));
if(Age < 13) return message.channel.send(new MessageEmbed().setDescription(`13 yaşından küçük üyeler kayıt edilemez.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor(settings.renk.kirmizi)).then(x => x.delete({timeout: 6500}));
if(member.id === message.author.id) return message.channel.send(new MessageEmbed().setDescription(`Kendini kayıt edemezsin.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor(settings.renk.kirmizi)).then(x => x.delete({timeout: 6500}));
if(member.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setDescription(`Sunucu sahibine bu komutu kullanamazsın.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor(settings.renk.kirmizi)).then(x => x.delete({timeout: 6500}));
if(member.id === client.user.id) return message.channel.send(new MessageEmbed().setDescription(`Bir bota bu komutu kullanamazsın.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor(settings.renk.kirmizi)).then(x => x.delete({timeout: 6500}));
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`Bu kullanıcı sizden üst/aynı pozisyonda.`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor(settings.renk.kirmizi)).then(x => x.delete({timeout: 6500}));
const Tagisim = `${member.user.username.includes(settings.taglar.servertag) ? settings.taglar.servertag : settings.taglar.untag} ${Name} | ${Age}`;
member.setNickname(`${Tagisim}`)

message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`${member} üyesinin ismi \`${Tagisim}\` olarak güncellendi. ${settings.durumlar.dogru}`)
.setFooter("say 🖤 was here")
.setColor(settings.renk.sayblue))}


exports.conf = {enabled: true, guildOnly: true, aliases: ["nick", "i"]};
exports.help = {name: 'isim'};
  