const Discord = require("discord.js");
const db = require('quick.db');

exports.run = (client, message, args) => {
    if(!["", ""].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) return;

//------------------------------------KANALLAR-----------------------------------\\ STG

  const tag = "STRIGA"; //Tagınızı giriniz. (BAŞA GELECEK) Not! Tagınız yoksa boş bırakabilirsiniz.
  
  const erkekd = message.guild.roles.cache.find(r => r.id === "ROL ID"); //Erkek rolünün IDsini girin.
  
  const kadın = message.guild.roles.cache.find(r => r.id === "ROL ID"); //Kadın rolünün IDsini girin.
  
  const unregister = message.guild.roles.cache.find(r => r.id === "ROL ID"); //Kayıtsız rolünün IDsini girin.
  
//------------------------------------KANALLAR-----------------------------------\\ STG
  
  const log = message.guild.channels.cache.find(c => c.id === "LOG ID"); //Kayıt kanalının IDsini girin.
    
//------------------------------------KANALLAR-----------------------------------\\    STG
    
//------------------------------------------------ROL-VERME-----------------------------------------------\\     STG
  
  let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
  if(!member) return message.channel.send("Bir kullanıcı girin.")
  const stg = message.guild.member(member)
  const nick = args[1];
  const yas = args[2];
  if(!nick) return message.channel.send("Bir isim girin.")
  if(!yas) return message.channel.send("Bir yaş girin.")
  stg.setNickname(`${tag} ${nick} | ${yas}`)
  
//------------------------------------------------ROL-VERME-----------------------------------------------\\     STG
  const embed = new Discord.MessageEmbed()
  .setTitle("Striga #Code")
  .setDescription(`<@${stg.user.id}> adlı Kullanıcının Kayıt işleminin tamamlanması için cinstiyetini Belirlemelisin.
Erkek ise ♂ Emojisine, Kadın ise ♀ Emojisine Basın.`)
  .setFooter("Striga #Code")
  .setColor("GOLD")
  log.send(embed).then(async mesaj => {
    await mesaj.react('♂') 
    await mesaj.react('♀')
    
    const erkekemoji = (reaction, user) => reaction.emoji.name === '♂' && user.id === message.author.id;
    const kadinemoji = (reaction, user) => reaction.emoji.name === '♀' && user.id === message.author.id;
    
    const erkek = mesaj.createReactionCollector(erkekemoji, { time: 10000 });
    const kadin = mesaj.createReactionCollector(kadinemoji, { time: 10000 });
    
    erkek.on('collect', async striga => {
      mesaj.reactions.removeAll()
      stg.roles.add(erkekd)
      stg.roles.remove(unregister)
      
      const erkekEmbed = new Discord.MessageEmbed()
      .setColor(erkekd.color ? erkekd.color : "#51adcf")
      .setTitle("Striga #Code")
      .setDescription(`• Kayıt İşlemi **Başarılı!**
• Yetkili: ${message.author.username}
• Kullanıcı: <@${stg.user.id}>
• Verilen Rol: <@&${erkekd.id}>`)
      .setFooter("Striga #Code")
      mesaj.edit(erkekEmbed)
      await mesaj.react("✨")
    })
    
    kadin.on('collect', async striga => {
      mesaj.reactions.removeAll()
      stg.roles.add(kadın)
      stg.roles.remove(unregister)
      
      const kadinEmbed = new Discord.MessageEmbed()
      .setColor(kadın.color ? kadın.color : "RANDOM")
      .setTitle("Striga #Code")
      .setDescription(`• Kayıt İşlemi **Başarılı!**
• Yetkili: ${message.author.username}
• Kullanıcı: <@${stg.user.id}>
• Verilen Rol: <@&${kadın.id}>`)
      .setFooter("Striga #Code")
      mesaj.edit(kadinEmbed)
      await mesaj.react("✨")
    })
  })

//------------------------------------------------ROL-VERME-----------------------------------------------\\     STG
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["k", "register"],
  permLevel: 0
};
exports.help = {
  name: "kayıt",
  description: "",
  usage: ""
};
   