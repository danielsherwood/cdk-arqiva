import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// Import Lambda L2 construct
import * as lambda from 'aws-cdk-lib/aws-lambda';
//Import API Gateway L2 construct
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
// Import S3 buckets
import * as s3 from 'aws-cdk-lib/aws-s3';

export class CdkArqivaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the AWS bucket

    const bucket = new s3.Bucket(this, 'S3Bucket', {
      bucketName: `dan-bucket-281000`,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    // The code that defines your stack goes here
    // Define the Lambda function resource
    const helloWorldFunction = new lambda.Function(this, 'HelloWorldFunction', {
      runtime: lambda.Runtime.NODEJS_20_X, // Choose any supported Node.js runtime
      code: lambda.Code.fromAsset('lambda'), // Points to the lambda directory
      handler: 'hello.handler', // Points to the 'hello' file in the lambda directory
    });

    // Add access to the bucket
    bucket.grantRead(helloWorldFunction);

    // Define the API Gateway resource
    const api = new apigateway.LambdaRestApi(this, 'HelloWorldApi', {
      handler: helloWorldFunction,
      proxy: false,
    });

    // Define the '/hello' resource with a GET method
    const helloResource = api.root.addResource('hello');
    helloResource.addMethod('GET');

  }
}
