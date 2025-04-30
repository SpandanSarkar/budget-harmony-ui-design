
import React from 'react';
import BudgetApprovalTable from '@/components/budget-approval/BudgetApprovalTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BudgetApprovalPage = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Budget Extension Approval</h1>
        <p className="text-muted-foreground">
          Review and approve/reject budget extension requests
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Extension Requests</CardTitle>
          <CardDescription>Review budget extension requests requiring your approval</CardDescription>
        </CardHeader>
        <CardContent>
          <BudgetApprovalTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetApprovalPage;
