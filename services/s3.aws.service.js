'use strict';

const config = require('../config');
const AWS = require('../libs/AWS.lib');

const s3 = new AWS.S3();

const moduleExports = {};

moduleExports.uploadAudio = (audio, userId) => {
    return new Promise((resolve, reject) => {
        s3.upload({
            Bucket: config.aws.s3.backet, 
            Key: `${config.aws.s3.key}/${userId}/${Date.now()}`, 
            Body: audio
        }, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        }); 
    });
};

module.exports = moduleExports;
