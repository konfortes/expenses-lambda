(async () => {
    const AWS = require("aws-sdk")
    const s3Config = {
        endpoint: "http://localhost:4568",
        region: 'eu-central-1',
        sslEnabled: false,
        s3ForcePathStyle: true
    }

    const S3 = new AWS.S3(s3Config)

    const params = {
        Bucket: 'expenses',
        Key: 'Transactions_14_03_2019.xls'
    }
    try {
        const response = await S3.getObject(params).promise()
        console.log(response);
    } catch (error) {
        console.error(error)
    }
})()