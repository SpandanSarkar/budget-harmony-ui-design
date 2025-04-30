
import React from 'react';
import BudgetExtensionForm from '@/components/budget-extension/BudgetExtensionForm';
import BudgetExtensionTable from '@/components/budget-extension/BudgetExtensionTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BudgetExtensionPage = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Budget Extension Request</h1>
        <p className="text-muted-foreground">
          Request additional budget beyond the approved amount
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>New Extension Request</CardTitle>
            <CardDescription>Request additional budget for a particular head</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetExtensionForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Extension Requests</CardTitle>
            <CardDescription>View all your extension requests and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetExtensionTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetExtensionPage;
