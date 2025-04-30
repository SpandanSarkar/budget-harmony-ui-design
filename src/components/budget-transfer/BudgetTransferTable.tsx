
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
const transfers = [
  {
    id: 1,
    from: 'IT Department > Software Licenses > GL001',
    to: 'IT Department > Hardware Maintenance > GL002',
    amount: 5000,
    date: '2025-04-15',
    remarks: 'Reallocated funds from unused software to hardware upgrades',
    approvedBy: 'John Smith',
  },
  {
    id: 2,
    from: 'Marketing Department > Advertising > GL005',
    to: 'Marketing Department > Events > GL005',
    amount: 3000,
    date: '2025-04-10',
    remarks: 'Event budget increase for Q2 planning',
    approvedBy: 'Sarah Johnson',
  },
  {
    id: 3,
    from: 'Finance Department > Audit Fees > GL003',
    to: 'Finance Department > Consulting Services > GL004',
    amount: 2500,
    date: '2025-04-08',
    remarks: 'Additional consulting needed for system upgrade',
    approvedBy: 'Mike Chen',
  },
];

const BudgetTransferTable = () => {
  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Remarks</TableHead>
              <TableHead>Approved By</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transfers.map((transfer) => (
              <TableRow key={transfer.id}>
                <TableCell>{transfer.from}</TableCell>
                <TableCell>{transfer.to}</TableCell>
                <TableCell className="text-right">${transfer.amount.toLocaleString()}</TableCell>
                <TableCell>{transfer.date}</TableCell>
                <TableCell className="max-w-[200px] truncate" title={transfer.remarks}>
                  {transfer.remarks}
                </TableCell>
                <TableCell>{transfer.approvedBy}</TableCell>
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

export default BudgetTransferTable;
