
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
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Mock data for the table
const creditLines = [
  { id: 1, name: 'Working Capital Line', limit: 500000, interestRate: 5.25, status: 'Active' },
  { id: 2, name: 'Term Loan Facility', limit: 1000000, interestRate: 4.75, status: 'Active' },
  { id: 3, name: 'Equipment Financing', limit: 250000, interestRate: 4.50, status: 'Active' },
  { id: 4, name: 'Revolving Credit Facility', limit: 750000, interestRate: 5.00, status: 'Inactive' },
];

const CreditLineSetup = () => {
  const [lines, setLines] = useState(creditLines);
  const [newName, setNewName] = useState('');
  const [newLimit, setNewLimit] = useState('');
  const [newRate, setNewRate] = useState('');
  
  const handleAddCreditLine = () => {
    if (!newName || !newLimit || !newRate) {
      toast.error('All fields are required');
      return;
    }
    
    const newLine = {
      id: Math.max(...lines.map(line => line.id)) + 1,
      name: newName,
      limit: parseFloat(newLimit),
      interestRate: parseFloat(newRate),
      status: 'Active'
    };
    
    setLines([...lines, newLine]);
    setNewName('');
    setNewLimit('');
    setNewRate('');
    toast.success('Credit line added successfully');
  };
  
  const toggleStatus = (id: number) => {
    setLines(lines.map(line => 
      line.id === id 
        ? { ...line, status: line.status === 'Active' ? 'Inactive' : 'Active' } 
        : line
    ));
    toast.success('Credit line status updated');
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Add New Credit Line</h3>
        
        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Credit Line Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          
          <div>
            <Input
              type="number"
              placeholder="Limit ($)"
              value={newLimit}
              onChange={(e) => setNewLimit(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Input
              type="number"
              step="0.01"
              placeholder="Interest Rate (%)"
              value={newRate}
              onChange={(e) => setNewRate(e.target.value)}
            />
            
            <Button onClick={handleAddCreditLine}>Add</Button>
          </div>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Credit Line Name</TableHead>
              <TableHead className="text-right">Limit</TableHead>
              <TableHead className="text-right">Interest Rate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lines.map((line) => (
              <TableRow key={line.id}>
                <TableCell>{line.name}</TableCell>
                <TableCell className="text-right">${line.limit.toLocaleString()}</TableCell>
                <TableCell className="text-right">{line.interestRate}%</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={line.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                  >
                    {line.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toggleStatus(line.id)}
                  >
                    {line.status === 'Active' ? 'Deactivate' : 'Activate'}
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

export default CreditLineSetup;
