const { Telegraf } = require("telegraf");
const session = require("telegraf/session");

const commands = require("../commands");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());

bot.command("/start", commands.start);

bot.command("/refresh", commands.refresh);

module.exports = bot;
