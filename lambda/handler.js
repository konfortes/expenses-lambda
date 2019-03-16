"use strict"

// const XLSX = require('xlsx');
const AWS = require("aws-sdk")
const S3 = new AWS.S3()
const xlsParser = require("./xls-parser")

module.exports.parse = async (event, context) => {
  const s3Record = event.Records[0].s3
  const Bucket = s3Record.bucket.name
  const Key = s3Record.object.key

  const params = {
    Bucket,
    Key
  }

  const response = await S3.getObject(params).promise()
  const parsed = xlsParser(response.Body)
  console.log("PARSED: " + JSON.stringify(parsed, null, 4))
  // const parsed = XLSX.read(response.Body)
}
