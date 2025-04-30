
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
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Mock data for the table
const borrowers = [
  { 
    id: 1, 
    name: 'ABC Corporation', 
    type: 'Corporate', 
    creditLine: 'Working Capital Line',
    limit: 500000, 
    available: 350000,
    status: 'Active' 
  },
  { 
    id: 2, 
    name: 'XYZ Industries', 
    type: 'Corporate', 
    creditLine: 'Term Loan Facility',
    limit: 750000, 
    available: 750000,
    status: 'Active' 
  },
  { 
    id: 3, 
    name: 'Smith Enterprises', 
    type: 'SME', 
    creditLine: 'Equipment Financing',
    limit: 250000, 
    available: 175000,
    status: 'Active' 
  },
  { 
    id: 4, 
    name: 'Global Tech', 
    type: 'Corporate', 
    creditLine: 'Revolving Credit Facility',
    limit: 1000000, 
    available: 1000000,
    status: 'Inactive' 
  },
];

const borrowerTypes = ['Corporate', 'SME', 'Individual', 'Government'];
const creditLines = ['Working Capital Line', 'Term Loan Facility', 'Equipment Financing', 'Revolving Credit Facility'];

const BorrowerSetup = () => {
  const [customers, setCustomers] = useState(borrowers);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('');
  const [newCreditLine, setNewCreditLine] = useState('');
  const [newLimit, setNewLimit] = useState('');
  
  const handleAddBorrower = () => {
    if (!newName || !newType || !newCreditLine || !newLimit) {
      toast.error('All fields are required');
      return;
    }
    
    const newBorrower = {
      id: Math.max(...customers.map(b => b.id)) + 1,
      name: newName,
      type: newType,
      creditLine: newCreditLine,
      limit: parseFloat(newLimit),
      available: parseFloat(newLimit),
      status: 'Active'
    };
    
    setCustomers([...customers, newBorrower]);
    setNewName('');
    setNewType('');
    setNewCreditLine('');
    setNewLimit('');
    toast.success('Borrower added successfully');
  };
  
  const toggleStatus = (id: number) => {
    setCustomers(customers.map(borrower => 
      borrower.id === id 
        ? { ...borrower, status: borrower.status === 'Active' ? 'Inactive' : 'Active' } 
        : borrower
    ));
    toast.success('Borrower status updated');
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Add New Borrower/Customer</h3>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="md:col-span-2">
            <Input
              placeholder="Borrower Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          
          <div>
            <Select onValueChange={setNewType} value={newType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {borrowerTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select onValueChange={setNewCreditLine} value={newCreditLine}>
              <SelectTrigger>
                <SelectValue placeholder="Credit Line" />
              </SelectTrigger>
              <SelectContent>
                {creditLines.map(line => (
                  <SelectItem key={line} value={line}>{line}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Limit ($)"
              value={newLimit}
              onChange={(e) => setNewLimit(e.target.value)}
            />
            
            <Button onClick={handleAddBorrower}>Add</Button>
          </div>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Borrower/Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Credit Line</TableHead>
              <TableHead className="text-right">Limit</TableHead>
              <TableHead className="text-right">Available</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((borrower) => (
              <TableRow key={borrower.id}>
                <TableCell>{borrower.name}</TableCell>
                <TableCell>{borrower.type}</TableCell>
                <TableCell>{borrower.creditLine}</TableCell>
                <TableCell className="text-right">${borrower.limit.toLocaleString()}</TableCell>
                <TableCell className="text-right">${borrower.available.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={borrower.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                  >
                    {borrower.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toggleStatus(borrower.id)}
                  >
                    {borrower.status === 'Active' ? 'Deactivate' : 'Activate'}
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

export default BorrowerSetup;
