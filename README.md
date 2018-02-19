# Telegram bot at NodeJS AWS lambda

## Introduce
This test application allows you to create a Telegram bot which will convert your text messages to a voice. 

On the AWS side lambda will handle the request and after converting text to a voice it will send this voice back. After that it will save converted audio to s3 backet and add a new item to a `user_data` collection (here we store a path to audios for each users for future references). 

If there were an error while processing request from Telegram it will log it to a `logs` collection with message type `error`.

## Installation

* First of all you need to clone a project and then run
```bash
$ npm install
```

* Create a lambda function on AWS
* Create a dynamoDB instance with two tables there (for logging and for storing user data)
* Create a s3 backet (here we will store our audios for users)
* Create an AWS API GATEWAY
* Set created API gateway as trigger for lambda
* Create a telegram bot
* Set web hook for telegram bot to AWS API gateway url

## Environment variables ( * - required) 
* **`TELEGRAM_TOKEN (*)`** - telegram token
* **`TELEGRAM_DEFAULT_MESSAGE`** - default message (`Enter the message with the text.`) when there will be no text message from chat
* **`TELEGRAM_DO_ERROR_MESSAGE_NEEDED`** - error message will send to customer as JSON (default is `false`)
* **`AWS_CRED_ACCESS_KEY_ID (*)`** - access key id from aws account
* **`AWS_CRED_SECRET_ACCESS_KEY (*)`** - secret access key from aws account
* **`AWS_CONF_REGION (*)`** - aws region
* **`AWS_DYNAMO_DB_TABLE_LOGS_NAME`** - dynamoDB table name for logging (default: `logs`)
* **`AWS_DYNAMO_DB_TABLE_LOGS_DEFAULT_TYPE`** - default type for log message (default: `info`)
* **`AWS_DYNAMO_DB_TABLE_LOGS_RETURN_CONSUMED_CAPACITY`** - `ReturnConsumedCapacity` param for log table (default is `AWS_DYNAMO_DB_DEFAULT_CONSUMED_CAPACITY` env)
* **`AWS_DYNAMO_DB_TABLE_USER_DATA_NAME`**- dynamoDB table name for user data (default: `user_data`)
* **`AWS_DYNAMO_DB_TABLE_USER_DATA_RETURN_CONSUMED_CAPACITY`**- `ReturnConsumedCapacity` param for user data table (default is `AWS_DYNAMO_DB_DEFAULT_CONSUMED_CAPACITY` env)
* **`AWS_DYNAMO_DB_DEFAULT_CONSUMED_CAPACITY`** - default `ReturnConsumedCapacity` param for all tables (default: `TOTAL`)
* **`AWS_S3_BACKET_NAME (*)`** - s3 backet name
* **`AWS_S3_KEY`** - s3 key name (default: `bot/telegram`)
* **`AWS_POLLY_VOICE_ID`** - voice id for polly (default: `Brian`)
* **`AWS_POLLY_OUTPUT_FORMAT`** - polly's output format (default: `ogg_vorbis`)
* **`AWS_POLLY_TEXT_TYPE`** - polly's text type (default: `text`)