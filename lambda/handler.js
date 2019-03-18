"use strict"

const AWS = require("aws-sdk")
const s3Endpoint = process.env.S3_ENDPOINT
const s3Config = s3Endpoint ? {
  endpoint: s3Endpoint
} : {}
const S3 = new AWS.S3(s3Config)
const xlsParser = require("./xls-parser")

module.exports.parse = async (event, context) => {
  const s3Record = event.Records[0].s3
  const params = {
    Bucket: s3Record.bucket.name,
    Key: s3Record.object.key
  }

  const response = await S3.getObject(params).promise()
  const parsed = xlsParser(response.Body)
  console.log("PARSED: " + JSON.stringify(parsed, null, 4))
}