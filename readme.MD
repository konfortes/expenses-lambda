# Expenses Lambda

## serverless Workflow

```bash
npm install -g serverless
serverless create -t aws-nodejs

serverless config credentials --provider aws --key <YOUR_KEY> --secret <YOUR_SECRET> -o

serverless deploy --region eu-central-1 --stage <SOME_NAME>

```
