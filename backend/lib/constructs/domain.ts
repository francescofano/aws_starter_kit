import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';

export interface DomainProps {
  domainName: string;
  hostedZoneId: string;
  skipDomainSetup?: boolean;
}

export class Domain extends Construct {
  public readonly hostedZone?: route53.IHostedZone;
  public readonly certificate?: acm.ICertificate;

  constructor(scope: Construct, id: string, props: DomainProps) {
    super(scope, id);

    if (!props.skipDomainSetup) {
      // Use existing Route 53 hosted zone
      this.hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
        hostedZoneId: props.hostedZoneId,
        zoneName: props.domainName,
      });

      // Create ACM certificate
      this.certificate = new acm.Certificate(this, 'Certificate', {
        domainName: props.domainName,
        subjectAlternativeNames: [`www.${props.domainName}`],
        validation: acm.CertificateValidation.fromDns(this.hostedZone),
      });

      // Output the hosted zone nameservers
      new cdk.CfnOutput(this, 'NameServers', {
        value: JSON.stringify(this.hostedZone.hostedZoneNameServers || []),
        description: 'Nameservers for the hosted zone',
      });
    }
  }
} 