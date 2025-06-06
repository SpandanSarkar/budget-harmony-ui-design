
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

// Mock data for lookups
const heads = {
  1: 'IT Department',
  2: 'Finance Department',
  3: 'Marketing Department'
};

const particulars = {
  1: 'Software Licenses',
  2: 'Hardware Maintenance',
  3: 'Audit Fees',
  4: 'Consulting Services',
  5: 'Advertising',
  6: 'Events'
};

const units = {
  1: 'Headquarters',
  2: 'Regional Office',
  3: 'Branch Office'
};

type BudgetProposalTableProps = {
  proposals: any[];
};

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

const BudgetProposalTable = ({ proposals }: BudgetProposalTableProps) => {
  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Head</TableHead>
              <TableHead>Particular</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map((proposal, index) => (
              <TableRow key={index}>
                <TableCell>{heads[proposal.headId] || `Head ${proposal.headId}`}</TableCell>
                <TableCell>{particulars[proposal.particularId] || `Particular ${proposal.particularId}`}</TableCell>
                <TableCell>{units[proposal.unitId] || `Unit ${proposal.unitId}`}</TableCell>
                <TableCell className="text-right">${parseFloat(proposal.proposedAmount).toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor('Pending')} variant="outline">
                    Pending
                  </Badge>
                </TableCell>
                <TableCell>{new Date().toISOString().split('T')[0]}</TableCell>
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

export default BudgetProposalTable;
