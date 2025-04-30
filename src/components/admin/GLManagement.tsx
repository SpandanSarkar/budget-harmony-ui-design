
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';
import { toast } from 'sonner';

// Mock data for the table
const glAccounts = [
  { id: 1, code: 'GL001', name: 'Operating Expenses', type: 'Expense' },
  { id: 2, code: 'GL002', name: 'Capital Expenditure', type: 'CapEx' },
  { id: 3, code: 'GL003', name: 'Salaries & Wages', type: 'Expense' },
  { id: 4, code: 'GL004', name: 'Professional Fees', type: 'Expense' },
  { id: 5, code: 'GL005', name: 'Marketing & Advertising', type: 'Expense' },
];

const glTypes = ['Asset', 'Liability', 'Equity', 'Revenue', 'Expense', 'CapEx'];

const GLManagement = () => {
  const [accounts, setAccounts] = useState(glAccounts);
  const [newGLCode, setNewGLCode] = useState('');
  const [newGLName, setNewGLName] = useState('');
  const [newGLType, setNewGLType] = useState('');
  
  const handleAddGL = () => {
    if (!newGLCode || !newGLName || !newGLType) {
      toast.error('All fields are required');
      return;
    }
    
    const newGL = {
      id: Math.max(...accounts.map(acc => acc.id)) + 1,
      code: newGLCode,
      name: newGLName,
      type: newGLType
    };
    
    setAccounts([...accounts, newGL]);
    setNewGLCode('');
    setNewGLName('');
    setNewGLType('');
    toast.success('GL account added successfully');
  };
  
  const handleDeleteGL = (id: number) => {
    setAccounts(accounts.filter(acc => acc.id !== id));
    toast.success('GL account deleted successfully');
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Add New GL Account</h3>
        
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <Input
              placeholder="GL Code"
              value={newGLCode}
              onChange={(e) => setNewGLCode(e.target.value)}
            />
          </div>
          
          <div className="md:col-span-2">
            <Input
              placeholder="GL Name"
              value={newGLName}
              onChange={(e) => setNewGLName(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select onValueChange={setNewGLType} value={newGLType}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {glTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button onClick={handleAddGL}>Add</Button>
          </div>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>GL Code</TableHead>
              <TableHead>GL Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.code}</TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.type}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => handleDeleteGL(account.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GLManagement;
