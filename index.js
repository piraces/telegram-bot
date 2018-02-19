'use strict';

const TelegramBot = require('node-telegram-bot-api');

const config = require('./config');
const pollyService = require('./services/polly.aws.service');
const dynamoDBService = require('./services/dynamoDB.aws.service');
const s3Service = require('./services/s3.aws.service');

const bot = new TelegramBot(config.telegram.token, {polling: false});

exports.handler = (event, context, callback) => {
    const body = JSON.parse(event.body);

    const text = body.message.text || config.telegram.defaultMessage;
    const chatId = body.message.chat.id;
    const userId = body.message.from.id;

    return pollyService
        .synthesizeSpeech(text)
        .then(voice => bot
            .sendVoice(chatId, voice.AudioStream)
            .then(() => s3Service.uploadAudio(voice.AudioStream, userId))
            .then(s3Data => dynamoDBService.saveUserData(userId, voice.ContentType, s3Data.Key))
        )
        .then(() => callback(null, {statusCode: 200}))
        .catch(err => {
            if (config.telegram.doErrorMessageNeeded && chatId) {
                bot.sendMessage(chatId, JSON.stringify(err, null, 2));
            }
            dynamoDBService.logToDynamoDB(JSON.stringify(err), config.aws.dynamoDB.tables.logs.types.error);
            callback(null, {statusCode: 200});
        });
};
