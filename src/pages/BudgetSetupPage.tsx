
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ExpenseHeadForm from '@/components/head-gl-config/ExpenseHeadForm';
import ExpenseHeadTable, { ExpenseHead } from '@/components/head-gl-config/ExpenseHeadTable';
import IncomeHeadForm from '@/components/head-gl-config/IncomeHeadForm';
import IncomeHeadTable, { IncomeHead } from '@/components/head-gl-config/IncomeHeadTable';
import { toast } from 'sonner';

// Mock data
const MOCK_EXPENSE_HEADS: ExpenseHead[] = [
  {
    id: '1',
    expenseGroup: 'Admin',
    expenseHeadName: 'Office Supplies',
    glCode: '5001',
    // fsTag: 'P&L',
    // dimensionTemplate: ['Unit', 'Quantity'],
    dimensionTemplate: ['Quantity'],
    status: true,
  },
  {
    id: '2',
    expenseGroup: 'HR',
    expenseHeadName: 'Employee Salaries',
    glCode: '5002',
    // fsTag: 'P&L',
    // dimensionTemplate: ['Designation', 'Unit'],
    dimensionTemplate: ['Designation'],
    status: true,
  },
];

const MOCK_INCOME_HEADS: IncomeHead[] = [
  {
    id: '1',
    incomeCategory: 'Operating',
    incomeHeadName: 'Interest Income',
    glCode: '4001',
    // fsTag: 'P&L',
    headType: 'Loan-based',
    status: true,
  },
  {
    id: '2',
    incomeCategory: 'Operating',
    incomeHeadName: 'Fee Income',
    glCode: '4002',
    // fsTag: 'P&L',
    headType: 'Regular',
    status: true,
  },
];

const HeadGLConfigPage = () => {
  const [expenseHeads, setExpenseHeads] = useState(MOCK_EXPENSE_HEADS);
  const [incomeHeads, setIncomeHeads] = useState(MOCK_INCOME_HEADS);
  const [editingExpenseHeadId, setEditingExpenseHeadId] = useState<string | null>(null);
  const [editingIncomeHeadId, setEditingIncomeHeadId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('expense');

  const handleExpenseHeadSubmit = (data: any) => {
    if (editingExpenseHeadId) {
      // Update existing expense head
      setExpenseHeads(expenseHeads.map(h => 
        h.id === editingExpenseHeadId ? { ...h, ...data } : h
      ));
      toast.success("Expense head updated");
      setEditingExpenseHeadId(null);
    } else {
      // Create new expense head
      const newHead = {
        id: Date.now().toString(),
        ...data,
      };
      setExpenseHeads([...expenseHeads, newHead]);
      toast.success("Expense head created");
    }
  };

  const handleIncomeHeadSubmit = (data: any) => {
    if (editingIncomeHeadId) {
      // Update existing income head
      setIncomeHeads(incomeHeads.map(h => 
        h.id === editingIncomeHeadId ? { ...h, ...data } : h
      ));
      toast.success("Income head updated");
      setEditingIncomeHeadId(null);
    } else {
      // Create new income head
      const newHead = {
        id: Date.now().toString(),
        ...data,
      };
      setIncomeHeads([...incomeHeads, newHead]);
      toast.success("Income head created");
    }
  };

  const handleEditExpenseHead = (id: string) => {
    const head = expenseHeads.find(h => h.id === id);
    if (head) {
      setEditingExpenseHeadId(id);
      setActiveTab('expense');
    }
  };

  const handleDeleteExpenseHead = (id: string) => {
    setExpenseHeads(expenseHeads.filter(h => h.id !== id));
    toast.success("Expense head removed");
  };

  const handleEditIncomeHead = (id: string) => {
    const head = incomeHeads.find(h => h.id === id);
    if (head) {
      setEditingIncomeHeadId(id);
      setActiveTab('income');
    }
  };

  const handleDeleteIncomeHead = (id: string) => {
    setIncomeHeads(incomeHeads.filter(h => h.id !== id));
    toast.success("Income head removed");
  };

  const editingExpenseHead = editingExpenseHeadId 
    ? expenseHeads.find(h => h.id === editingExpenseHeadId) 
    : undefined;

  const editingIncomeHead = editingIncomeHeadId 
    ? incomeHeads.find(h => h.id === editingIncomeHeadId) 
    : undefined;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Head & GL Configuration</h1>
        <p className="text-muted-foreground">Configure expense and income heads with GL mapping.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="expense">Expense Head Setup</TabsTrigger>
          <TabsTrigger value="income">Income Head Setup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="expense" className="pt-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{editingExpenseHeadId ? 'Edit Expense Head' : 'Create Expense Head'}</CardTitle>
                <CardDescription>
                  {editingExpenseHeadId 
                    ? 'Update the selected expense head' 
                    : 'Define a new expense head'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseHeadForm 
                  onSubmit={handleExpenseHeadSubmit}
                  initialData={editingExpenseHead}
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Expense Heads</CardTitle>
                <CardDescription>Manage your expense heads</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseHeadTable 
                  data={expenseHeads} 
                  onEdit={handleEditExpenseHead} 
                  onDelete={handleDeleteExpenseHead}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="income" className="pt-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{editingIncomeHeadId ? 'Edit Income Head' : 'Create Income Head'}</CardTitle>
                <CardDescription>
                  {editingIncomeHeadId 
                    ? 'Update the selected income head' 
                    : 'Define a new income head'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <IncomeHeadForm 
                  onSubmit={handleIncomeHeadSubmit}
                  initialData={editingIncomeHead}
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Income Heads</CardTitle>
                <CardDescription>Manage your income heads</CardDescription>
              </CardHeader>
              <CardContent>
                <IncomeHeadTable 
                  data={incomeHeads} 
                  onEdit={handleEditIncomeHead} 
                  onDelete={handleDeleteIncomeHead}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HeadGLConfigPage;
