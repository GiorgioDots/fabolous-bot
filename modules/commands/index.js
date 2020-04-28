const Keyboard = require("telegraf-keyboard");

const logger = require("../logger");
const reddit = require("../reddit");

const keyboard = new Keyboard();

exports.start = (ctx) => {
  keyboard
    .add("/refresh", "/meme", "/hmmm")
    .add("/greentext", "/cursed", "/dankmeme");
  ctx.reply(
    `Hello ${ctx.update.message.from.first_name}!\n` +
      `I can do some things:\n` +
      `1. Send me /refresh to refresh the images\n` +
      `2. Send me /meme to get a new fresh meme and enjoy the world of reddit!\n` +
      `3. Send me /hmmm to hmmm!\n` +
      `4. Send me /greentext - 4chan?\n` +
      `5. Send me /cursed to get cursed..\n` +
      `6. Send me /dankmeme to cry..\n`,
    keyboard.draw()
  );
};

exports.refresh = async (ctx) => {
  try {
    const isDone = await reddit.getRsImages(ctx);
    if (isDone) {
      ctx.reply("Refresh done.");
    }
  } catch (error) {
    ctx.reply("An error occured while refreshing the images.");
  }
};

exports.dankMeme = async (ctx) => {
  console.log(ctx.session);
  try {
    if (!ctx.session.dankmemeImages) {
      await reddit.getRImages("dankmeme", ctx);
    }
    if (ctx.session.dankmemeImages.length == 0) {
      await reddit.getRImages("dankmeme", ctx);
    }
    msg.replyWithPhoto({ url: dankmemeImages.pop() });
    msg.reply(`Images remaining: ${dankmemeImages.length}`);
  } catch (error) {
    ctx.reply("An error occured while fetching dankmemeimages the images.");
  }
};
