
import React from 'react';
import BudgetReviewFilters from '@/components/budget-review/BudgetReviewFilters';
import BudgetReviewTabs from '@/components/budget-review/BudgetReviewTabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BudgetReviewPage = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Budget Review & Adjustment</h1>
        <p className="text-muted-foreground">
          Compare proposals with estimates and finalize budgets
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Budget Review Filters</CardTitle>
          <CardDescription>Filter budget items by year, head, and particular</CardDescription>
        </CardHeader>
        <CardContent>
          <BudgetReviewFilters />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget Items</CardTitle>
          <CardDescription>Review and adjust budget items</CardDescription>
        </CardHeader>
        <CardContent>
          <BudgetReviewTabs />
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetReviewPage;
