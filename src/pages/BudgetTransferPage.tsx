
import React from 'react';
import BudgetTransferForm from '@/components/budget-transfer/BudgetTransferForm';
import BudgetTransferTable from '@/components/budget-transfer/BudgetTransferTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BudgetTransferPage = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Budget Transfer / Reallocation</h1>
        <p className="text-muted-foreground">
          Shift budget between GLs or particulars
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Budget Transfer</CardTitle>
            <CardDescription>Transfer budgets between heads, particulars, or GLs</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetTransferForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transfer History</CardTitle>
            <CardDescription>View all budget transfers and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetTransferTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetTransferPage;
