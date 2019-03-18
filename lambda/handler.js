"use strict"

// const XLSX = require('xlsx');
const AWS = require("aws-sdk")
const S3 = new AWS.S3()
const xlsParser = require("./xls-parser")

module.exports.parse = async (event, context) => {
  console.log('EVENT: ', event);
  const s3Record = event.Records[0].s3
  const params = {
    Bucket: s3Record.bucket.name,
    Key: s3Record.object.key
  }

  const response = await S3.getObject(params).promise()
  const parsed = xlsParser(response.Body)
  console.log("PARSED: " + JSON.stringify(parsed, null, 4))
}