
import React from 'react';
import BudgetReportingFilters from '@/components/budget-reporting/BudgetReportingFilters';
import BudgetReportingCharts from '@/components/budget-reporting/BudgetReportingCharts';
import BudgetReportingTable from '@/components/budget-reporting/BudgetReportingTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BudgetReportingPage = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Budget Reporting & Audit View</h1>
        <p className="text-muted-foreground">
          Analyze budget performance and generate reports
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
          <CardDescription>Select parameters for your budget report</CardDescription>
        </CardHeader>
        <CardContent>
          <BudgetReportingFilters />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visual Reports</CardTitle>
          <CardDescription>Budget data visualized in charts</CardDescription>
        </CardHeader>
        <CardContent>
          <BudgetReportingCharts />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tabular Data</CardTitle>
          <CardDescription>Detailed budget data in tabular format</CardDescription>
        </CardHeader>
        <CardContent>
          <BudgetReportingTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetReportingPage;
