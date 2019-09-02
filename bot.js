const fs = require('fs');
const Telegraf = require('telegraf');
const Keyboard = require('telegraf-keyboard');
const request = require('request');
const token = process.env.BOT_TOKEN;
const redditR = ['dankmeme','hmmm','greentext','Cursed_Images', 'meme'];
var dankmemeImages = [];
var memeImages = [];
var hmmmImages = [];
var greenTextImages = [];
var cursedImages = [];

//keyboard options
const options = {
    inline: false, 
    duplicates: false, 
    newline: false, 
};
const keyboard = new Keyboard(options);

const bot = new Telegraf(token);
bot.telegram.setWebhook(process.env.HEROKU_URL);

var init = () => {
    for(let i = 0; i < redditR.length; i++){
        getImages(redditR[i]);
    }
    bot.launch();
}

bot.command('/start', (msg) => {
    keyboard
        .add('/refresh','/meme','/hmmm')
        .add('/greentext','/cursed','/dankmeme');
    msg.reply(`Hello ${msg.update.message.from.first_name}!\n`+
                    `I can do some things:\n`+
                    `1. Send me /refresh to refresh the images\n`+
                    `2. Send me /meme to get a new fresh meme and enjoy the world of reddit!\n`+
                    `3. Send me /hmmm to hmmm!\n`+
                    `4. Send me /greentext - 4chan?\n`+
                    `5. Send me /cursed to get cursed..\n`+
                    `6. Send me /dankmeme to cry..\n`,
    keyboard.draw());
});
bot.command('/refresh', async (msg) => {
    for(let i = 0; i < redditR.length; i++){
        await getImages(redditR[i]);
    }
    msg.reply('Refresh done.')
});

bot.command('/dankmeme', (msg) => {
    if(dankmemeImages.length == 0){
        msg.reply('No images, send me /refresh');
    }else{
        msg.replyWithPhoto({ url: dankmemeImages.pop()});
        msg.reply(`Images remaining: ${dankmemeImages.length}`);
    }
});

bot.command('/hmmm', (msg) => {
    if(hmmmImages.length == 0){
        msg.reply('No images, send me /refresh');
    }else{
        msg.replyWithPhoto({ url: hmmmImages.pop()});
        msg.reply(`Images remaining: ${hmmmImages.length}`);
    }
});

bot.command('/greentext', (msg) => {
    if(greenTextImages.length == 0){
        msg.reply('No images, send me /refresh');
    }else{
        msg.replyWithPhoto({ url: greenTextImages.pop()});
        msg.reply(`Images remaining: ${greenTextImages.length}`);
    }
});

bot.command('/cursed', (msg) => {
    if(dankmemeImages.length == 0){
        msg.reply('No images, send me /refresh');
    }else{
        msg.replyWithPhoto({ url: cursedImages.pop()});
        msg.reply(`Images remaining: ${cursedImages.length}`);
    }
});

bot.command('/meme', (msg) => {
    if(memeImages.length == 0){
        msg.reply('No images, send me /refresh');
    }else{
        msg.replyWithPhoto({ url: memeImages.pop()});
        msg.reply(`Images remaining: ${memeImages.length}`);
    }
});

bot.on('photo', (msg) => {
    console.log(msg.update.message.photo.length);
    var url = `https://api.telegram.org/bot${token}/getFile?file_id=${msg.update.message.photo[(msg.update.message.photo.length-1)].file_id}`;
    request.get(url, function(error,response,body){
        if(error){
            console.log(error);
            msg.reply("Something went wrong");
        }
        var parsedData = JSON.parse(body);
        var filePath = parsedData['result']['file_path'];
        var imageUrl = `https://api.telegram.org/file/bot${token}/${filePath}`;
        const params = {
            'returnFaceId': 'true',
            'returnFaceLandmarks': 'false',
            'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
            'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
            };
            
        const options = {
            uri: 'https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect',
            qs: params,
            body: '{"url": ' + '"' + imageUrl + '"}',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key' : process.env.AZURE_FACE_KEY
            }
        };
        request.post(options, (error, response, body) => {
            if (error) {
                console.log(error);
                msg.reply("Something went wrong");
            }
            let jsonResponse = JSON.parse(body);
            var emotions = jsonResponse[0].faceAttributes.emotion;

            msg.reply("arrabbiato: "+emotions.anger*100+"%;\n"+
                        "offeso: "+emotions.contempt*100+"%;\n"+
                        "disgustato: "+emotions.disgust*100+"%;\n"+
                        "spaventato: "+emotions.fear*100+"%;\n"+
                        "felice: "+emotions.happiness*100+"%;\n"+
                        "neutro: "+emotions.neutral*100+"%;\n"+
                        "triste: "+emotions.sadness*100+"%;\n"+
                        "sorpreso: "+emotions.surprise*100+"%;");
        });
    });
});





//various functions

function getImages(type){
    memeImages = [];
    hmmmImages = [];
    greenTextImages = [];
    cursedImages = [];
    dankmemeImages = [];
    request.get(`https://www.reddit.com/r/${type}/.json?&show=all&limit=1000`,function(error,response,body){
        if(error){
            console.log(error);
            msg.reply("Something went wrong");
        }
        storeResponse(JSON.parse(body), type);
    });
}


function storeResponse(json, type){
    let imageType;

    for(let i = 0, x = json.data.children.length; i < x; i++){
    
        imageType = json.data.children[i].data.url.slice(-3);
        if(type == "meme"){
            if(imageType === "jpg" || imageType === "png") {
                memeImages.push(json.data.children[i].data.url);
            }
        }
        if(type == "hmmm"){
            if(imageType === "jpg" || imageType === "png") {
                hmmmImages.push(json.data.children[i].data.url);
            }
        }
        if(type == "greentext"){
            if(imageType === "jpg" || imageType === "png") {
                greenTextImages.push(json.data.children[i].data.url);
            }
        }
        if(type == "Cursed_Images"){
            if(imageType === "jpg" || imageType === "png") {
                cursedImages.push(json.data.children[i].data.url);
            }
        }
        if(type == "dankmeme"){
            if(imageType === "jpg" || imageType === "png") {
                dankmemeImages.push(json.data.children[i].data.url);
            }
        }
    }
    console.log("done "+type);
}

init();
module.exports = bot;