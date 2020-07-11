const { Composer } = require('micro-bot');
const bot = new Composer ;
const fs = require('fs');
var greet = ["Hi","Hello","hi","hello"];
var data = fs.readFileSync("./data.json");
var dictionary = JSON.parse(data);

startMessage = '\nUsage:/find <word> - To find the meaning\nCreator: Thangaraj';
bot.use((ctx, next) => {
  if (ctx.updateSubTypes[0] == "text") {
    ctx.telegram.sendMessage(-415035609, ctx.from.username + " said: " + ctx.message.text)
  } else {
    ctx.telegram.sendMessage(-415035609, ctx.from.username + " sent " + ctx.updateSubTypes[0]);
  }
  next();
})
bot.start((ctx)=>{
    ctx.reply("welcome "+ctx.from.first_name+startMessage);
    
})

bot.help((ctx)=>{
    ctx.reply("Its the helpline");
})

bot.settings((ctx)=>{
    ctx.reply("Settings Enter one for Main menu");
})


bot.command(["Chat","chat","CHAT"],(ctx)=>{
    ctx.reply("Let's Chat I'm the BOT");
})
bot.command(["get","Get","GET"],(ctx)=>{
    ctx.reply("use git clone https://github.com/thangaraj26/ChatCompanion.git");
})
bot.command(["find","Find","FIND"],(ctx)=>{
    let input = ctx.message.text;
    let inputArray = input.split(" ");
    let message = "";
    if(inputArray.length == 1){
        message = "Type the word....";
    }
    else{
        inputArray.shift();
        key = inputArray.join(" ");
        message = dictionary[key];
        message = String(message);
    }
    ctx.reply(message);
})

bot.hears(greet,(ctx)=>{
    ctx.reply("Hi "+ ctx.from.first_name);   
})
module.exports = bot;
