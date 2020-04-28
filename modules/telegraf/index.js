const { Telegraf } = require("telegraf");
const session = require("telegraf/session");

const commands = require("../commands");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());

bot.command("/start", commands.start);

bot.command("/refresh", commands.refresh);

bot.command("/dankmeme", commands.dankMeme);

// bot.command("/hmmm");

// bot.command("/greentext");

// bot.command("/cursed");

// bot.command("/meme");

module.exports = bot;
