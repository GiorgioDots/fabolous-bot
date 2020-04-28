const { Telegraf } = require("telegraf");
const session = require("telegraf/session");

const commands = require("../commands");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());

bot.command("/start", commands.start);

module.exports = bot;
