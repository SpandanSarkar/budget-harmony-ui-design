import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';

export interface ExpenseHead {
  id: string;
  expenseGroup: string;
  expenseHeadName: string;
  glCode: string;
  fsTag: 'P&L' | 'Balance Sheet';
  balanceSheetItemName?: string;
  dimensionTemplate: string[];
  status: boolean;
}

interface ExpenseHeadTableProps {
  data: ExpenseHead[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ExpenseHeadTable: React.FC<ExpenseHeadTableProps> = ({ data, onEdit, onDelete }) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No expense heads found. Create your first expense head to get started.
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Group</TableHead>
            <TableHead>Head Name</TableHead>
            <TableHead>GL Code</TableHead>
            {/* <TableHead>FS Tag</TableHead> */}
            <TableHead>Dimensions</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((head) => (
            <TableRow key={head.id}>
              <TableCell className="font-medium">{head.expenseGroup}</TableCell>
              <TableCell>{head.expenseHeadName}</TableCell>
              <TableCell>{head.glCode}</TableCell>
              {/* <TableCell>
                <Badge variant={head.fsTag === 'P&L' ? 'default' : 'secondary'}>
                  {head.fsTag}
                </Badge>
              </TableCell> */}
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {head.dimensionTemplate.slice(0, 2).map((dim) => (
                    <Badge key={dim} variant="outline" className="text-xs">
                      {dim}
                    </Badge>
                  ))}
                  {head.dimensionTemplate.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{head.dimensionTemplate.length - 2}
                    </Badge>
                  )}
                </div>
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

export default ExpenseHeadTable;