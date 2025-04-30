
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

// Mock data for the table
const reportData = [
  {
    id: 1,
    head: 'IT Department',
    particular: 'Software Licenses',
    fsTag: 'P&L',
    proposed: 15000,
    approved: 15000,
    actual: 14200,
    variance: 800,
    variancePercent: 5.33,
    status: 'Under Budget',
  },
  {
    id: 2,
    head: 'IT Department',
    particular: 'Hardware Maintenance',
    fsTag: 'P&L',
    proposed: 6000,
    approved: 5800,
    actual: 5900,
    variance: -100,
    variancePercent: -1.72,
    status: 'Over Budget',
  },
  {
    id: 3,
    head: 'Finance Department',
    particular: 'Audit Fees',
    fsTag: 'P&L',
    proposed: 8000,
    approved: 8000,
    actual: 8000,
    variance: 0,
    variancePercent: 0,
    status: 'On Budget',
  },
  {
    id: 4,
    head: 'Finance Department',
    particular: 'Consulting Services',
    fsTag: 'P&L',
    proposed: 10000,
    approved: 10000,
    actual: 9200,
    variance: 800,
    variancePercent: 8.00,
    status: 'Under Budget',
  },
  {
    id: 5,
    head: 'Marketing Department',
    particular: 'Advertising',
    fsTag: 'P&L',
    proposed: 12000,
    approved: 12000,
    actual: 12500,
    variance: -500,
    variancePercent: -4.17,
    status: 'Over Budget',
  },
  {
    id: 6,
    head: 'Marketing Department',
    particular: 'Events',
    fsTag: 'P&L',
    proposed: 7500,
    approved: 7500,
    actual: 6700,
    variance: 800,
    variancePercent: 10.67,
    status: 'Under Budget',
  },
];

// Function to determine badge color based on status
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Under Budget':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'Over Budget':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    case 'On Budget':
    default:
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
  }
};

const BudgetReportingTable = () => {
  // Calculate totals
  const totals = reportData.reduce((acc, curr) => {
    return {
      proposed: acc.proposed + curr.proposed,
      approved: acc.approved + curr.approved,
      actual: acc.actual + curr.actual,
      variance: acc.variance + curr.variance,
    };
  }, { proposed: 0, approved: 0, actual: 0, variance: 0 });
  
  const totalVariancePercent = ((totals.variance / totals.approved) * 100).toFixed(2);
  const totalStatus = totals.variance > 0 ? 'Under Budget' : totals.variance < 0 ? 'Over Budget' : 'On Budget';

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Head</TableHead>
              <TableHead>Particular</TableHead>
              <TableHead>FS Tag</TableHead>
              <TableHead className="text-right">Proposed</TableHead>
              <TableHead className="text-right">Approved</TableHead>
              <TableHead className="text-right">Actual</TableHead>
              <TableHead className="text-right">Variance</TableHead>
              <TableHead className="text-right">Variance %</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.head}</TableCell>
                <TableCell>{item.particular}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-50">
                    {item.fsTag}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">${item.proposed.toLocaleString()}</TableCell>
                <TableCell className="text-right">${item.approved.toLocaleString()}</TableCell>
                <TableCell className="text-right">${item.actual.toLocaleString()}</TableCell>
                <TableCell className="text-right">${item.variance.toLocaleString()}</TableCell>
                <TableCell className="text-right">{item.variancePercent.toFixed(2)}%</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(item.status)} variant="outline">
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            
            <TableRow className="bg-muted/50 font-medium">
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">${totals.proposed.toLocaleString()}</TableCell>
              <TableCell className="text-right">${totals.approved.toLocaleString()}</TableCell>
              <TableCell className="text-right">${totals.actual.toLocaleString()}</TableCell>
              <TableCell className="text-right">${totals.variance.toLocaleString()}</TableCell>
              <TableCell className="text-right">{totalVariancePercent}%</TableCell>
              <TableCell>
                <Badge className={getStatusColor(totalStatus)} variant="outline">
                  {totalStatus}
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BudgetReportingTable;
