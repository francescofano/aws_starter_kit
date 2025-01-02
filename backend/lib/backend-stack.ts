import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { WebsiteHosting } from './constructs/website-hosting';
import { Api } from './constructs/api';
import { Dns } from './constructs/dns';
import { Domain } from './constructs/domain';
import { Outputs } from './constructs/outputs';

interface BackendStackProps extends cdk.StackProps {
  domainName?: string;
  hostedZoneId?: string;
  frontendPath?: string;
}

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: BackendStackProps) {
    super(scope, id, props);

    // Domain and certificate setup if domain is configured
    const domain = props?.domainName && props?.hostedZoneId
      ? new Domain(this, 'Domain', {
          domainName: props.domainName,
          hostedZoneId: props.hostedZoneId,
        })
      : undefined;

    // Create website hosting with certificate if available
    const websiteHosting = new WebsiteHosting(this, 'WebsiteHosting', {
      domainName: props?.domainName,
      certificate: domain?.certificate,
      frontendPath: props?.frontendPath,
    });

    // Create DNS records if domain and certificate are configured
    if (domain?.hostedZone && domain?.certificate && props?.domainName && props?.hostedZoneId) {
      new Dns(this, 'Dns', {
        domainName: props.domainName,
        hostedZoneId: props.hostedZoneId,
        distribution: websiteHosting.distribution,
        hostedZone: domain.hostedZone,
        certificate: domain.certificate,
      });
    }

    // Create API
    const api = new Api(this, 'Api');

    // Create outputs
    new Outputs(this, 'Outputs', {
      distribution: websiteHosting.distribution,
      api: api.api,
      domainName: props?.domainName,
    });
  }
}
