import * as route53 from 'aws-cdk-lib/aws-route53';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import { Construct } from 'constructs';

interface DnsProps {
  domainName: string;
  hostedZoneId: string;
  distribution: cloudfront.Distribution;
  hostedZone: route53.IHostedZone;
  certificate: acm.ICertificate;
}

export class Dns extends Construct {
  constructor(scope: Construct, id: string, props: DnsProps) {
    super(scope, id);

    // Create Route 53 record for apex domain
    new route53.ARecord(this, 'AliasRecord', {
      zone: props.hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(props.distribution)
      ),
      recordName: props.domainName,
    });

    // Create Route 53 record for www subdomain
    new route53.ARecord(this, 'WwwAliasRecord', {
      zone: props.hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(props.distribution)
      ),
      recordName: `www.${props.domainName}`,
    });
  }
} 