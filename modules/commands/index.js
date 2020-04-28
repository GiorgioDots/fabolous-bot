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
    ctx.reply("Refreshing, please wait..");
    const isDone = await reddit.getRsImages(ctx);
    if (isDone) {
      ctx.reply("Refresh done.");
    }
  } catch (error) {
    console.error(error);
    ctx.reply("An error occured while refreshing the images.");
  }
};

exports.dankMeme = async (ctx) => {
  try {
    if (!ctx.session.dankmemeImages) {
      ctx.session.dankmemeImages = [];
      await reddit.getRImages("dankmeme", ctx);
    }
    if (ctx.session.dankmemeImages.length == 0) {
      ctx.session.dankmemeImages = [];
      await reddit.getRImages("dankmeme", ctx);
    }
    ctx.replyWithPhoto({ url: ctx.session.dankmemeImages.pop() });
    ctx.reply(`Images remaining: ${ctx.session.dankmemeImages.length}`);
  } catch (error) {
    console.error(error);
    ctx.reply("An error occured while fetching dankmeme images.");
  }
};

exports.hmmm = async (ctx) => {
  try {
    if (!ctx.session.hmmmImages) {
      ctx.session.hmmmImages = [];
      await reddit.getRImages("hmmm", ctx);
    }
    if (ctx.session.hmmmImages.length == 0) {
      ctx.session.hmmmImages = [];
      await reddit.getRImages("hmmm", ctx);
    }
    ctx.reply(`Images remaining: ${ctx.session.hmmmImages.length}`);
    ctx.replyWithPhoto({ url: ctx.session.hmmmImages.pop() });
  } catch (error) {
    console.error(error);
    ctx.reply("An error occured while fetching hmmm images.");
  }
};

exports.greenText = async (ctx) => {
  try {
    if (!ctx.session.greenTextImages) {
      ctx.session.greenTextImages = [];
      await reddit.getRImages("greentext", ctx);
    }
    if (ctx.session.greenTextImages.length == 0) {
      ctx.session.greenTextImages = [];
      await reddit.getRImages("greentext", ctx);
    }
    ctx.replyWithPhoto({ url: ctx.session.greenTextImages.pop() });
    ctx.reply(`Images remaining: ${ctx.session.greenTextImages.length}`);
  } catch (error) {
    console.error(error);
    ctx.reply("An error occured while fetching greentext images.");
  }
};

exports.cursed = async (ctx) => {
  try {
    if (!ctx.session.cursedImages) {
      ctx.session.cursedImages = [];
      await reddit.getRImages("Cursed_Images", ctx);
    }
    if (ctx.session.cursedImages.length == 0) {
      ctx.session.cursedImages = [];
      await reddit.getRImages("Cursed_Images", ctx);
    }
    ctx.replyWithPhoto({ url: ctx.session.cursedImages.pop() });
    ctx.reply(`Images remaining: ${ctx.session.cursedImages.length}`);
  } catch (error) {
    console.error(error);
    ctx.reply("An error occured while fetching cursed images.");
  }
};

exports.meme = async (ctx) => {
  try {
    if (!ctx.session.memeImages) {
      ctx.session.memeImages = [];
      await reddit.getRImages("meme", ctx);
    }
    if (ctx.session.memeImages.length == 0) {
      ctx.session.memeImages = [];
      await reddit.getRImages("meme", ctx);
    }
    ctx.replyWithPhoto({ url: ctx.session.memeImages.pop() });
    ctx.reply(`Images remaining: ${ctx.session.memeImages.length}`);
  } catch (error) {
    console.error(error);
    ctx.reply("An error occured while fetching meme images.");
  }
};
