const AWS = require("aws-sdk")
const s3Config = getConfig()
const S3 = new AWS.S3(s3Config)
const xlsParser = require("./xls-parser")
const {
  Client
} = require('@elastic/elasticsearch')

module.exports.parse = async (event, context) => {
  const s3Record = event.Records[0].s3
  const params = {
    Bucket: s3Record.bucket.name,
    Key: s3Record.object.key
  }

  const response = await S3.getObject(params).promise()
  const parsed = xlsParser(response.Body)
  console.log("PARSED: " + JSON.stringify(parsed, null, 4))


  const elasticClient = new Client({
    node: 'http://localhost:9200'
  })

  for (const expense of parsed) {
    try {
      await elasticClient.index({
        index: 'expenses',
        id: `${expense.date}:${expense.name}`,
        body: {
          ...expense,
          debitAmount: transformAmount(expense.debitAmount)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
}

function getConfig() {
  return {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.AWS_REGION,
    sslEnabled: process.env.SSL_ENABLED,
    s3ForcePathStyle: process.env.S3_FORCE_PATH_STYLE
  }
}

function transformAmount(amountText) {
  return parseInt(amountText.replace(/[^\d.-]/g, ''))
}