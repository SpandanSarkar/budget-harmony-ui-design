
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

type Particular = {
  id: string;
  particularName: string;
  headId: string;
  headName: string;
  fsTag: 'p&l' | 'balance-sheet';
};

type ParticularsTableProps = {
  data: Particular[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const ParticularsTable = ({ data, onEdit, onDelete }: ParticularsTableProps) => {
  const formatFsTag = (fsTag: Particular['fsTag']) => {
    switch (fsTag) {
      case 'p&l':
        return 'P&L';
      case 'balance-sheet':
        return 'Balance Sheet';
      default:
        return fsTag;
    }
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Particular</TableHead>
            <TableHead>Linked Head</TableHead>
            <TableHead>FS Tag</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No particulars found.
              </TableCell>
            </TableRow>
          )}
          {data.map((particular) => (
            <TableRow key={particular.id}>
              <TableCell className="font-medium">{particular.particularName}</TableCell>
              <TableCell>{particular.headName}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {formatFsTag(particular.fsTag)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(particular.id)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(particular.id)}
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

export default ParticularsTable;
