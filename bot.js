const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const db = require('quick.db')
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment') 
require('./util/eventLoader')(client);
var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${  files.undefined} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.elevation = message => {
  if (!message.guild) {
      return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 5;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('ready', () => {
  console.log(client.user.username)
})

client.login(ayarlar.token)
/// KOMUTLAR


// STG CODE
//-----------------------GİRENE-ROL-VERME----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.roles.add(''); //Kayıtsız rolünün IDsini girin.
});

//-----------------------GİRENE-ROL-VERME----------------------\\     STG

//----------------------------------------------------HOŞ-GELDİN-MESAJI---------------------------------------------------\\     STG

client.on("guildMemberAdd", member => {
  const kanalID = "KANAL ID";
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  var kontrol;
  if (kurulus < 1296000000) kontrol = 'Hesap Güvenilir Değil.'
  if (kurulus > 1296000000) kontrol = 'Hesap Güvenilir.'
  moment.locale("tr");
  let kanal = client.channels.cache.get(kanalID);
  kanal.send("Sunucuya Hoşgeldin, " + member + " \n\nHesabını " + moment(member.user.createdAt).format("YYYY DD MMMM dddd hh:mm:ss") + " Önce Oluşturmuşsun." + kontrol + "\n\nSunucmuzda Kurallarımızı Okumanı Tavsiye Ederiz Çünkü Herkes Kuralları Okundu Olarak Kabul Edilir Ve Ona Göre Ceza İşlemi Yapılır. \n\nSeninle Beraber " + member.guild.memberCount + " Kişiyiz, Tagımızı alarak ` STRIGA CODE ` bize destek olabilirsin, Ses Odalarına Girerek <@&REGISTER ID> Rolündekilere Teyit Verebilirsin. \n")
});

//----------------------------------------------------HOŞ-GELDİN-MESAJI---------------------------------------------------\\     STG

//-----------------------ŞÜPHELİ-HESAP----------------------\\     STG

client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(7, 'days').fromNow()
   var user = member.user
   x = x.replace("birkaç saniye önce", " ")
   if(!x.includes("önce") || x.includes("sonra") || x == " ") {
   var rol = member.guild.roles.cache.get("ŞÜPHELİ ROL ID") //Şüpheli rolünün IDsini girin.
   var kayıtsız = member.guild.roles.cache.get("KAYITSIZ ROL ID") //Kayıtsız rolünün IDsini girin.
   member.roles.add(rol)
   member.roles.remove(kayıtsız)
member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
setTimeout(() => {
  member.roles.remove(kayıtsız.id);
}, 1000)
   } else {
     
   }
});

//-----------------------ŞÜPHELİ-HESAP----------------------\\     STG

//-----------------------TAG-ROL----------------------\\     STG

client.on('userUpdate', async user => {
  let sunucuid = ""; //Buraya sunucunuzun IDsini yazın
  let tag = ""; //Buraya tagınızı yazın
  let rol = ""; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = client.guilds.cache.get(sunucuid).channels.cache.find(x => x.name == 'tag-log'); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
  if (!tag) return;
  if (!rol) return;
  if (!channel) return;
  let member = client.guilds.cache.get(sunucuid).members.cache.get(user.id);
  if (!member) return;
  if (!member.roles.cache.has(rol)) {
    if (member.user.username.includes(tag)) {
      member.roles.add(rol)
      const tagalma = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<@${user.id}> adlı kişi, ${tag} tagını aldığından dolayı <@&${rol}> rolünü kazandı.`)
      .setTimestamp()
      channel.send(tagalma)
    }
  }else{
    if (!member.user.username.includes(tag)) {
      member.removeRole(rol)
      const tagsilme = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`<@${user.id}> adlı kişi, ${tag} tagını sildiğinden dolayı <@&${rol}> rolünü kaybetti.`)
      .setTimestamp()
      channel.send(tagsilme)
    }
  }
});

//-----------------------TAG-ROL----------------------\\     STG

//-----------------------TAG-KONTROL----------------------\\     STG

client.on("guildMemberAdd", member => {
let sunucuid = ""; //Buraya sunucunuzun IDsini yazın
let tag = ""; //Buraya tagınızı yazın
let rol = ""; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
let channel = client.guilds.cache.get(sunucuid).channels.cache.find(x => x.name == 'tag-log');
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<@${member.id}> adlı kişi **Taglı Sunucumuza Katıldı !**, ${tag} tagını aldığından dolayı <@&${rol}> rolünü kazandı.`)
      .setTimestamp()
      channel.send(tagalma)
}
})

//-----------------------TAG-KONTROL----------------------\\     STG