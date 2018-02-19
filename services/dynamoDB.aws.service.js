'use strict';

const uuidV4 = require('uuid');

const config = require('../config');
const AWS = require('../libs/AWS.lib');

const dynamoDB = new AWS.DynamoDB();
const moduleExports = {};

moduleExports.logToDynamoDB = (message, type) => new Promise((resolve, reject) => {
    dynamoDB.putItem({
        Item: createLogItem(message, type),
        ReturnConsumedCapacity: config.aws.dynamoDB.tables.userData.returnConsumedCapacity 
            || config.aws.dynamoDB.defaultReturnConsumedCapacity, 
        TableName: config.aws.dynamoDB.tables.logs.name
    }, (err, data) => {
        if (err) {
            return reject(err);
        }
        resolve(data);
    });
});

moduleExports.saveUserData = (userId, type, path) => new Promise((resolve, reject) => {
    dynamoDB.putItem({
        Item: createUserDataItem(userId, type, path),
        ReturnConsumedCapacity: config.aws.dynamoDB.tables.userData.returnConsumedCapacity 
            || config.aws.dynamoDB.defaultReturnConsumedCapacity, 
        TableName: config.aws.dynamoDB.tables.userData.name
    }, (err, data) => {
        if (err) {
            return reject(err);
        }
        resolve(data);
    });
});

module.exports = moduleExports;

function createLogItem(logMessage, type) {
    return {
        log_id: {
            S: uuidV4()
        },  
        date: {
            S: new Date().toString()
        },
        type: {
            S: type || config.aws.dynamoDB.tables.logs.defaultType
        },
        log: {
            S: logMessage
        }
    };
}

function createUserDataItem(userId, type, path) {
    return {
        user_data_id: {
            S: uuidV4()
        },  
        date: {
            S: new Date().toString()
        },
        user_id: {
            S: `${userId}`
        },
        data_type: {
            S: type
        },
        data_path: {
            S: path
        }
    };
}
