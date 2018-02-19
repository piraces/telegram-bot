'use strict';

module.exports = {
    telegram: {
        token: process.env.TELEGRAM_TOKEN,
        defaultMessage: process.env.TELEGRAM_DEFAULT_MESSAGE || 'Enter the message with the text.',
        doErrorMessageNeeded: process.env.TELEGRAM_DO_ERROR_MESSAGE_NEEDED 
            ? process.env.TELEGRAM_DO_ERROR_MESSAGE_NEEDED === 'true' || process.env.TELEGRAM_DO_ERROR_MESSAGE_NEEDED === true
            : false
    },
    aws: {
        credentials: {
            accessKeyId: process.env.AWS_CRED_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_CRED_SECRET_ACCESS_KEY
        },
        config: {
            region: process.env.AWS_CONF_REGION
        },
        dynamoDB: {
            tables: {
                logs: {
                    name: process.env.AWS_DYNAMO_DB_TABLE_LOGS_NAME || 'logs',
                    defaultType: process.env.AWS_DYNAMO_DB_TABLE_LOGS_DEFAULT_TYPE || 'info',
                    returnConsumedCapacity: process.env.AWS_DYNAMO_DB_TABLE_LOGS_RETURN_CONSUMED_CAPACITY,
                    types: {
                        error: 'error',
                        info: 'info'
                    }
                },
                userData: {
                    name: process.env.AWS_DYNAMO_DB_TABLE_USER_DATA_NAME || 'user_data',
                    returnConsumedCapacity: process.env.AWS_DYNAMO_DB_TABLE_USER_DATA_RETURN_CONSUMED_CAPACITY
                }
            },
            defaultReturnConsumedCapacity: process.env.AWS_DYNAMO_DB_DEFAULT_CONSUMED_CAPACITY || 'TOTAL'
        },
        s3: {
            backet: process.env.AWS_S3_BACKET_NAME,
            key: process.env.AWS_S3_KEY || 'bot/telegram'
        },
        polly: {
            voiceId: process.env.AWS_POLLY_VOICE_ID || 'Brian',
            outputFormat: process.env.AWS_POLLY_OUTPUT_FORMAT || 'ogg_vorbis',
            textType: process.env.AWS_POLLY_TEXT_TYPE || 'text',
        }
    }
};
