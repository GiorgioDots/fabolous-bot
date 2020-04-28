const { Telegraf } = require("telegraf");
const session = require("telegraf/session");

const commands = require("../commands");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());

bot.command("/start", commands.start);

bot.command("/refresh", commands.refresh);

bot.command("/dankmeme", commands.dankMeme);

bot.command("/hmmm", commands.hmmm);

bot.command("/greentext", commands.greenText);

bot.command("/cursed", commands.cursed);

bot.command("/meme", commands.meme);

module.exports = bot;
