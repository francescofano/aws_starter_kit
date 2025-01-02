import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as path from 'path';
import { Construct } from 'constructs';

interface WebsiteHostingProps {
  domainName?: string;
  certificate?: acm.ICertificate;
  frontendPath?: string;
}

export class WebsiteHosting extends Construct {
  public readonly bucket: s3.Bucket;
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props?: WebsiteHostingProps) {
    super(scope, id);

    // S3 bucket for website hosting
    this.bucket = new s3.Bucket(this, 'WebsiteBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
    });

    // Create a custom cache policy
    const cachePolicy = new cloudfront.CachePolicy(this, 'CustomCachePolicy', {
      defaultTtl: cdk.Duration.days(0), // No caching by default
      minTtl: cdk.Duration.days(0),
      maxTtl: cdk.Duration.days(365),
      enableAcceptEncodingBrotli: true,
      enableAcceptEncodingGzip: true,
      headerBehavior: cloudfront.CacheHeaderBehavior.allowList('Authorization'),
      queryStringBehavior: cloudfront.CacheQueryStringBehavior.none(),
      cookieBehavior: cloudfront.CacheCookieBehavior.none(),
    });

    // CloudFront distribution
    this.distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(this.bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachePolicy: cachePolicy,
        originRequestPolicy: cloudfront.OriginRequestPolicy.CORS_S3_ORIGIN,
        responseHeadersPolicy: cloudfront.ResponseHeadersPolicy.CORS_ALLOW_ALL_ORIGINS,
      },
      domainNames: props?.domainName ? [props.domainName] : undefined,
      certificate: props?.certificate,
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.days(0), // Don't cache error responses
        },
      ],
    });

    // Deploy frontend files if path is provided
    if (props?.frontendPath) {
      // Resolve path relative to project root (backend directory)
      const projectRoot = path.join(__dirname, '../..');
      const absolutePath = path.join(projectRoot, props.frontendPath);
      
      new s3deploy.BucketDeployment(this, 'DeployWebsite', {
        sources: [
          s3deploy.Source.asset(absolutePath),
        ],
        destinationBucket: this.bucket,
        distribution: this.distribution,
        distributionPaths: ['/*'],
        memoryLimit: 1024, // Increase memory for faster deployments
        prune: true, // Remove old files
      });
    }
  }
} 