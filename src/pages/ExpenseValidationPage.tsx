
import React from 'react';
import ExpenseValidationForm from '@/components/expense-validation/ExpenseValidationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ExpenseValidationPage = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Expense Validation</h1>
        <p className="text-muted-foreground">
          Validate expenses against the approved budget
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Validate Expense</CardTitle>
          <CardDescription>Check if an expense is within the remaining budget</CardDescription>
        </CardHeader>
        <CardContent>
          <ExpenseValidationForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseValidationPage;
