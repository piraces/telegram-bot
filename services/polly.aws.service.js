'use strict';

const AWS = require('../libs/AWS.lib');
const config = require('../config');

const polly = new AWS.Polly();

const moduleExports = {};

moduleExports.synthesizeSpeech = (text) => {
    return new Promise((resolve, reject) => {
        polly.synthesizeSpeech({
            OutputFormat: config.aws.polly.outputFormat,
            Text: text,
            VoiceId: config.aws.polly.voiceId,
            TextType: config.aws.polly.textType
        }, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    })
};

module.exports = moduleExports;
