import cdk = require('@aws-cdk/cdk');
import cloudwatch = require('@aws-cdk/aws-cloudwatch');
import {GraphWidget, Metric} from "@aws-cdk/aws-cloudwatch";

export class CdkAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);    const dashboard = new cloudwatch.Dashboard(this, 'RedshiftMonitoringDashboard', {dashboardName: 'RedshiftMonitoringDashboard'});    this.node.requireContext('env');
    const env = this.node.getContext('env');    dashboard.add(
      this.buildRedshiftWidget(env, 'AverageQueryTime'),
      this.buildRedshiftWidget(env, 'AvgSkewRatio'),
      this.buildRedshiftWidget(env, 'MaxSkewRatio'),
      this.buildRedshiftWidget(env, 'ColumnsNotCompressed'),
    );    dashboard.add(
      this.buildRedshiftWidget(env, 'AvgCommitQueueTime'),
      this.buildRedshiftWidget(env, 'AvgSkewSortRatio'),
      this.buildRedshiftWidget(env, 'MaxSkewSortRatio'),
      this.buildRedshiftWidget(env, 'DiskBasedQueries'),
    );    dashboard.add(
      this.buildRedshiftWidget(env, 'MaxUnsorted'),
      this.buildRedshiftWidget(env, 'MaxVarcharSize'),
      this.buildRedshiftWidget(env, 'TotalAlerts'),
      this.buildRedshiftWidget(env, 'QueriesScanNoSort'),
    );    dashboard.add(
      this.buildRedshiftWidget(env, 'Tables'),
      this.buildRedshiftWidget(env, 'TablesNotCompressed'),
      this.buildRedshiftWidget(env, 'TablesStatsOff'),
      this.buildRedshiftWidget(env, 'Rows'),
    );    dashboard.add(
      this.buildRedshiftWidget(env, 'QueriesWithHighTraffic'),
      this.buildRedshiftWidget(env, 'Packets'),
      this.buildRedshiftWidget(env, 'TotalWLMQueueTime'),
    );
  }  
  
  buildRedshiftWidget(env: string, metricName: string, statistic: string = 'avg'): GraphWidget {
    return new GraphWidget({
      title: metricName,
      left: [new Metric({
        namespace: 'Redshift',
        metricName: metricName,
        dimensions: {
          ClusterIdentifier: cdk.Fn.importValue(`${env}-PokaAnalyticsRedshift:ClusterName`)
        },
        statistic: statistic
      })]
    })
  }
}