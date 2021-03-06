const request = require("request-promise-native");

const logger = require("../logger");

const redditRs = ["dankmeme", "hmmm", "greentext", "Cursed_Images", "meme"];

exports.getRsImages = async (ctx) => {
  ctx.session.memeImages = [];
  ctx.session.hmmmImages = [];
  ctx.session.greenTextImages = [];
  ctx.session.cursedImages = [];
  ctx.session.dankmemeImages = [];
  let res;
  try {
    for (let r of redditRs) {
      logger.info(`Fetching ${r} images.`);
      res = await request.get(
        `https://www.reddit.com/r/${r}/.json?&show=all&limit=1000`
      );
      logger.info(`Storing to session ${r} images.`);
      storeRImages(JSON.parse(res), r, ctx);
    }
    return Promise.resolve(true);
  } catch (error) {
    logger.error(`Something went wrong while fetching the images:`);
    console.error(error);
    throw error;
  }
};

exports.getRImages = async (r, ctx) => {
  try {
    logger.info(`Fetching ${r} images.`);
    const res = await request.get(
      `https://www.reddit.com/r/${r}/.json?&show=all&limit=1000`
    );
    logger.info(`Storing to session ${r} images.`);
    storeRImages(JSON.parse(res), r, ctx);
    return Promise.resolve(true);
  } catch (error) {
    logger.error(`Something went wrong while fetching the ${r} images:`);
    console.error(error);
    throw error;
  }
};

/***UTILS***/
const storeRImages = (json, r, ctx) => {
  let imageType;
  for (let children of json.data.children) {
    imageType = children.data.url.slice(-3);
    if (r == "meme") {
      if (imageType === "jpg" || imageType === "png") {
        ctx.session.memeImages.push(children.data.url);
      }
    }
    if (r == "hmmm") {
      if (imageType === "jpg" || imageType === "png") {
        ctx.session.hmmmImages.push(children.data.url);
      }
    }
    if (r == "greentext") {
      if (imageType === "jpg" || imageType === "png") {
        ctx.session.greenTextImages.push(children.data.url);
      }
    }
    if (r == "Cursed_Images") {
      if (imageType === "jpg" || imageType === "png") {
        ctx.session.cursedImages.push(children.data.url);
      }
    }
    if (r == "dankmeme") {
      if (imageType === "jpg" || imageType === "png") {
        ctx.session.dankmemeImages.push(children.data.url);
      }
    }
  }
};
