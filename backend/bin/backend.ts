#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BackendStack } from '../lib/backend-stack';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = new cdk.App();

// Create the stack with domain configuration if available
new BackendStack(app, process.env.STACK_NAME || 'PortfolioStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  // Pass domain configuration if available
  ...(process.env.DOMAIN_NAME && process.env.HOSTED_ZONE_ID ? {
    domainName: process.env.DOMAIN_NAME,
    hostedZoneId: process.env.HOSTED_ZONE_ID,
  } : {}),
  // Pass frontend path if provided
  ...(process.env.FRONTEND_PATH ? {
    frontendPath: process.env.FRONTEND_PATH,
  } : {}),
});