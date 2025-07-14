import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';

export interface IncomeHead {
  id: string;
  incomeCategory: 'Operating' | 'Non-Operating';
  incomeHeadName: string;
  glCode: string;
  fsTag: 'P&L' | 'Balance Sheet';
  balanceSheetItemName?: string;
  headType: 'Regular' | 'Loan-based';
  status: boolean;
}

interface IncomeHeadTableProps {
  data: IncomeHead[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const IncomeHeadTable: React.FC<IncomeHeadTableProps> = ({ data, onEdit, onDelete }) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No income heads found. Create your first income head to get started.
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Head Name</TableHead>
            <TableHead>GL Code</TableHead>
            <TableHead>FS Tag</TableHead>
            <TableHead>Head Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((head) => (
            <TableRow key={head.id}>
              <TableCell>
                <Badge variant={head.incomeCategory === 'Operating' ? 'default' : 'secondary'}>
                  {head.incomeCategory}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{head.incomeHeadName}</TableCell>
              <TableCell>{head.glCode}</TableCell>
              <TableCell>
                <Badge variant={head.fsTag === 'P&L' ? 'default' : 'secondary'}>
                  {head.fsTag}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={head.headType === 'Regular' ? 'outline' : 'default'}>
                  {head.headType}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={head.status ? 'default' : 'destructive'}>
                  {head.status ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(head.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(head.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IncomeHeadTable;