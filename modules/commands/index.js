const Keyboard = require("telegraf-keyboard");

const logger = require("../logger");

const keyboard = new Keyboard();

exports.start = (ctx) => {
  ctx.session.counter = ctx.session.counter || 0;
  ctx.session.counter++;
  keyboard
    .add("/refresh", "/meme", "/hmmm")
    .add("/greentext", "/cursed", "/dankmeme");
  console.log("Start command receved");
  ctx.reply(
    `Hello ${ctx.update.message.from.first_name}! This is the ${ctx.session.counter} time you come.`,
    keyboard.draw()
  );
};
