import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as cdk from '@aws-cdk/core';


export class CdkCwDashboardStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dashboard = new cloudwatch.Dashboard(this, 'test', {
      dashboardName: 'SimpleDashboard'
    });
    const myGraphWidget = new cloudwatch.GraphWidget({
      height: 5,
      width: 5
    });
    dashboard.addWidgets(myGraphWidget);

    //Add Metric
  }
}
