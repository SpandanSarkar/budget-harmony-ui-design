
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
import { Edit, Trash2 } from 'lucide-react';

type BudgetHead = {
  id: string;
  headName: string;
  type: 'department' | 'unit' | 'program';
  status: 'active' | 'inactive';
};

type HeadsTableProps = {
  data: BudgetHead[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const HeadsTable = ({ data, onEdit, onDelete }: HeadsTableProps) => {
  const formatType = (type: BudgetHead['type']) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Head Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No budget heads found.
              </TableCell>
            </TableRow>
          )}
          {data.map((head) => (
            <TableRow key={head.id}>
              <TableCell className="font-medium">{head.headName}</TableCell>
              <TableCell>{formatType(head.type)}</TableCell>
              <TableCell>
                {head.status === 'active' ? (
                  <Badge className="bg-success">Active</Badge>
                ) : (
                  <Badge variant="outline">Inactive</Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(head.id)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(head.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="sr-only">Delete</span>
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

export default HeadsTable;
