'use strict';

const AWS = require('aws-sdk');

const config = require('../config');

AWS.config.update({
    region: config.aws.config.region,
    accessKeyId: config.aws.credentials.accessKeyId,
    secretAccessKey: config.aws.credentials.secretAccessKey
});

module.exports = AWS;
