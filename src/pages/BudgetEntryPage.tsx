import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExpenseBudgetEntry from '@/components/budget-entry/ExpenseBudgetEntry';
import IncomeBudgetEntry from '@/components/budget-entry/IncomeBudgetEntry';

const BudgetEntryPage = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Budget Entry</h1>
        <p className="text-muted-foreground">
          Enter budget data for expenses and income
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Budget Entry Management</CardTitle>
          <CardDescription>Manage expense and income budget entries</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="expense" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="expense">Expense Budget Entry</TabsTrigger>
              <TabsTrigger value="income">Income Budget Entry</TabsTrigger>
            </TabsList>
            <TabsContent value="expense" className="space-y-4">
              <ExpenseBudgetEntry />
            </TabsContent>
            <TabsContent value="income" className="space-y-4">
              <IncomeBudgetEntry />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetEntryPage;