import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import { Construct } from 'constructs';

interface ApiProps {
  // Add any API-specific props here
}

export class Api extends Construct {
  public readonly api: apigateway.RestApi;
  public readonly exampleFunction: nodejs.NodejsFunction;

  constructor(scope: Construct, id: string, props?: ApiProps) {
    super(scope, id);

    // API Gateway REST API
    this.api = new apigateway.RestApi(this, 'PortfolioApi', {
      restApiName: 'Portfolio Service',
      description: 'This is the Portfolio API',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    // Example Lambda function
    this.exampleFunction = new nodejs.NodejsFunction(this, 'ExampleFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: path.join(__dirname, '../../lambda/example/index.ts'),
      environment: {
        // Add environment variables here
      },
      bundling: {
        externalModules: ['aws-sdk'],
        minify: true,
      },
    });

    // Add Lambda integration to API Gateway
    const exampleIntegration = new apigateway.LambdaIntegration(this.exampleFunction);
    this.api.root.addMethod('GET', exampleIntegration);
  }
} 