// const fs = require("fs");
// const Telegraf = require("telegraf");
// const Keyboard = require("telegraf-keyboard");
// const request = require("request");
// const token = process.env.BOT_TOKEN;
// const redditR = ["dankmeme", "hmmm", "greentext", "Cursed_Images", "meme"];
// var dankmemeImages = [];
// var memeImages = [];
// var hmmmImages = [];
// var greenTextImages = [];
// var cursedImages = [];

// //keyboard options
// const options = {
//   inline: false,
//   duplicates: false,
//   newline: false,
// };
// const keyboard = new Keyboard(options);

// const bot = new Telegraf(token);
// bot.telegram.setWebhook(process.env.HEROKU_URL);

// var init = () => {
//   for (let i = 0; i < redditR.length; i++) {
//     getImages(redditR[i]);
//   }
//   bot.launch();
// };

// bot.command("/dankmeme", (msg) => {
//   if (dankmemeImages.length == 0) {
//     msg.reply("No images, send me /refresh");
//   } else {
//     msg.replyWithPhoto({ url: dankmemeImages.pop() });
//     msg.reply(`Images remaining: ${dankmemeImages.length}`);
//   }
// });

// bot.command("/hmmm", (msg) => {
//   if (hmmmImages.length == 0) {
//     msg.reply("No images, send me /refresh");
//   } else {
//     msg.replyWithPhoto({ url: hmmmImages.pop() });
//     msg.reply(`Images remaining: ${hmmmImages.length}`);
//   }
// });

// bot.command("/greentext", (msg) => {
//   if (greenTextImages.length == 0) {
//     msg.reply("No images, send me /refresh");
//   } else {
//     msg.replyWithPhoto({ url: greenTextImages.pop() });
//     msg.reply(`Images remaining: ${greenTextImages.length}`);
//   }
// });

// bot.command("/cursed", (msg) => {
//   if (dankmemeImages.length == 0) {
//     msg.reply("No images, send me /refresh");
//   } else {
//     msg.replyWithPhoto({ url: cursedImages.pop() });
//     msg.reply(`Images remaining: ${cursedImages.length}`);
//   }
// });

// bot.command("/meme", (msg) => {
//   if (memeImages.length == 0) {
//     msg.reply("No images, send me /refresh");
//   } else {
//     msg.replyWithPhoto({ url: memeImages.pop() });
//     msg.reply(`Images remaining: ${memeImages.length}`);
//   }
// });

// //various functions

// function getImages(type) {
//   memeImages = [];
//   hmmmImages = [];
//   greenTextImages = [];
//   cursedImages = [];
//   dankmemeImages = [];
//   request.get(
//     `https://www.reddit.com/r/${type}/.json?&show=all&limit=1000`,
//     function (error, response, body) {
//       if (error) {
//         console.log(error);
//         msg.reply("Something went wrong");
//       }
//       storeResponse(JSON.parse(body), type);
//     }
//   );
// }

// function storeResponse(json, type) {
//   let imageType;

//   for (let i = 0, x = json.data.children.length; i < x; i++) {
//     imageType = json.data.children[i].data.url.slice(-3);
//     if (type == "meme") {
//       if (imageType === "jpg" || imageType === "png") {
//         memeImages.push(json.data.children[i].data.url);
//       }
//     }
//     if (type == "hmmm") {
//       if (imageType === "jpg" || imageType === "png") {
//         hmmmImages.push(json.data.children[i].data.url);
//       }
//     }
//     if (type == "greentext") {
//       if (imageType === "jpg" || imageType === "png") {
//         greenTextImages.push(json.data.children[i].data.url);
//       }
//     }
//     if (type == "Cursed_Images") {
//       if (imageType === "jpg" || imageType === "png") {
//         cursedImages.push(json.data.children[i].data.url);
//       }
//     }
//     if (type == "dankmeme") {
//       if (imageType === "jpg" || imageType === "png") {
//         dankmemeImages.push(json.data.children[i].data.url);
//       }
//     }
//   }
// }

// init();
// module.exports = bot;
