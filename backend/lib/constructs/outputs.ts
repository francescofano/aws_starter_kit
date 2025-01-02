import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export interface OutputsProps {
  distribution: cloudfront.IDistribution;
  api: apigateway.RestApi;
  domainName?: string;
}

export class Outputs extends Construct {
  constructor(scope: Construct, id: string, props: OutputsProps) {
    super(scope, id);

    // CloudFront URL
    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: props.distribution.distributionDomainName,
      description: 'The CloudFront distribution domain name',
    });

    // Domain name if configured
    if (props.domainName) {
      new cdk.CfnOutput(this, 'DomainName', {
        value: props.domainName,
        description: 'The custom domain name',
      });
    }

    // API URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: props.api.url,
      description: 'The API Gateway URL',
    });
  }
} 