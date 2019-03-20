# Expenses Lambda

## serverless Workflow

```bash
npm install -g serverless
serverless create -t aws-nodejs

serverless config credentials --provider aws --key <YOUR_KEY> --secret <YOUR_SECRET> -o

serverless deploy --region eu-central-1 --stage <SOME_NAME>

```

## localstack

This app is using the aws localstack  
To start localstack run `yarn start`  
Services are accessible via:  
`aws --endpoint-url=http://localhost:4567 lambda` shortend to `yarn lambda`  
`aws --endpoint-url=http://localhost:4568 s3` shortend to `yarn s3`  
**example**: `yarn s3 mb s3://mybucket`; `yarn s3 ls`
