
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

// Mock data for the table
const extensions = [
  {
    id: 1,
    head: 'IT Department',
    particular: 'Software Licenses',
    requestedAmount: 5000,
    status: 'Pending',
    date: '2025-04-15',
    approvedBy: null,
  },
  {
    id: 2,
    head: 'Finance Department',
    particular: 'Consulting Services',
    requestedAmount: 7500,
    status: 'Approved',
    date: '2025-04-10',
    approvedBy: 'Board',
  },
  {
    id: 3,
    head: 'Marketing Department',
    particular: 'Events',
    requestedAmount: 3500,
    status: 'Rejected',
    date: '2025-04-08',
    approvedBy: 'CFO',
  },
  {
    id: 4,
    head: 'IT Department',
    particular: 'Hardware Maintenance',
    requestedAmount: 2000,
    status: 'Pending',
    date: '2025-04-05',
    approvedBy: null,
  },
];

// Function to determine badge color based on status
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    case 'pending':
    default:
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
  }
};

const BudgetExtensionTable = () => {
  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Head</TableHead>
              <TableHead>Particular</TableHead>
              <TableHead className="text-right">Requested Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Approved By</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {extensions.map((extension) => (
              <TableRow key={extension.id}>
                <TableCell>{extension.head}</TableCell>
                <TableCell>{extension.particular}</TableCell>
                <TableCell className="text-right">${extension.requestedAmount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(extension.status)} variant="outline">
                    {extension.status}
                  </Badge>
                </TableCell>
                <TableCell>{extension.date}</TableCell>
                <TableCell>{extension.approvedBy || '-'}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4 mr-1" /> View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-end mt-4">
        <Button variant="outline" size="sm">
          Export
        </Button>
      </div>
    </div>
  );
};

export default BudgetExtensionTable;
