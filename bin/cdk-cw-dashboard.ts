#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdkCwDashboardStack } from '../lib/cdk-cw-dashboard-stack';

const app = new cdk.App();
new CdkCwDashboardStack(app, 'CdkCwDashboardStack');
