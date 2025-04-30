
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileText, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for the table
const budgetItems = [
  {
    id: 1,
    head: 'IT Department',
    particular: 'Software Licenses',
    fsTag: 'P&L',
    unit: 'Headquarters',
    proposedAmount: 15000,
    estimateAmount: 14000,
    auditedAmount: 13000,
    changePercent: 7.69,
    remarks: 'New licenses required for upgraded systems',
    hasDocs: true,
    finalAmount: null,
  },
  {
    id: 2,
    head: 'Finance Department',
    particular: 'Audit Fees',
    fsTag: 'P&L',
    unit: 'Headquarters',
    proposedAmount: 8000,
    estimateAmount: 7500,
    auditedAmount: 7000,
    changePercent: 7.14,
    remarks: 'Rate increase from audit firm',
    hasDocs: true,
    finalAmount: 8000,
  },
  {
    id: 3,
    head: 'Marketing Department',
    particular: 'Advertising',
    fsTag: 'P&L',
    unit: 'Regional Office',
    proposedAmount: 12500,
    estimateAmount: 10000,
    auditedAmount: 9000,
    changePercent: 11.11,
    remarks: 'New campaign planned',
    hasDocs: false,
    finalAmount: null,
  },
  {
    id: 4,
    head: 'IT Department',
    particular: 'Hardware Maintenance',
    fsTag: 'P&L',
    unit: 'Branch Office',
    proposedAmount: 6000,
    estimateAmount: 5500,
    auditedAmount: 5000,
    changePercent: 10.00,
    remarks: 'Additional servers',
    hasDocs: true,
    finalAmount: 5800,
  },
];

const BudgetReviewTable = ({ onGLAllocation, view }) => {
  const [items, setItems] = useState(budgetItems);

  const handleFinalAmountChange = (id: number, value: string) => {
    const numericValue = value === '' ? null : parseFloat(value);
    
    setItems(items.map(item => 
      item.id === id ? { ...item, finalAmount: numericValue } : item
    ));
  };

  // Function to determine what column to show based on view
  const getAmountColumn = (item) => {
    switch(view) {
      case 'proposed':
        return item.proposedAmount.toLocaleString();
      case 'estimate':
        return item.estimateAmount.toLocaleString();
      case 'audited':
        return item.auditedAmount.toLocaleString();
      case 'change':
        return `${item.changePercent.toFixed(2)}%`;
      default:
        return item.proposedAmount.toLocaleString();
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Head</TableHead>
            <TableHead>Particular</TableHead>
            <TableHead>FS Tag</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead className="text-right">
              {view === 'proposed' && 'Proposed Amount'}
              {view === 'estimate' && 'Estimate (This FY)'}
              {view === 'audited' && 'Audited (Last FY)'}
              {view === 'change' && '% Change'}
            </TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead>Docs</TableHead>
            <TableHead className="text-right">Final Amount</TableHead>
            <TableHead>GL Allocation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.head}</TableCell>
              <TableCell>{item.particular}</TableCell>
              <TableCell>
                <Badge variant="outline" className={item.fsTag === 'P&L' ? 'bg-blue-100' : 'bg-green-100'}>
                  {item.fsTag}
                </Badge>
              </TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell className="text-right">${getAmountColumn(item)}</TableCell>
              <TableCell className="max-w-[200px] truncate" title={item.remarks}>{item.remarks}</TableCell>
              <TableCell>
                {item.hasDocs ? (
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4" />
                    <span className="sr-only">View Documents</span>
                  </Button>
                ) : (
                  <span className="text-muted-foreground">None</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Input
                  type="number"
                  value={item.finalAmount || ''}
                  onChange={(e) => handleFinalAmountChange(item.id, e.target.value)}
                  className="max-w-[120px] ml-auto"
                />
              </TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={!item.finalAmount}
                  onClick={() => onGLAllocation(item)}
                >
                  <Settings className="h-4 w-4 mr-1" /> 
                  Manage
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BudgetReviewTable;
