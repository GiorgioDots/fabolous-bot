require("dotenv").config();

const bot = require("./modules/telegraf");
const logger = require("./modules/logger");

logger.info("starting bot..");

logger.info("setting bot webhook..");

bot.telegram.setWebhook(
  `${process.env.BOT_HEROKU_URL}/bot${process.env.BOT_TOKEN}`
);

logger.info("starting bot webhook..");

bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null, process.env.PORT);

//FOR DEVELOPMENT
// bot.launch();

logger.info("bot started");
