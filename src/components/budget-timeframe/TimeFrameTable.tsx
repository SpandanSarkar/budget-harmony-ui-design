
import React from 'react';
import { format } from 'date-fns';
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

type TimeFrameData = {
  id: string;
  financialYear: string;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'active' | 'closed';
};

type TimeFrameTableProps = {
  data: TimeFrameData[];
  onEdit: (id: string) => void;
  onDeactivate: (id: string) => void;
};

const TimeFrameTable = ({ data, onEdit, onDeactivate }: TimeFrameTableProps) => {
  const getStatusBadge = (status: TimeFrameData['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success">Active</Badge>;
      case 'closed':
        return <Badge className="bg-destructive">Closed</Badge>;
      default:
        return <Badge variant="outline">Draft</Badge>;
    }
  };

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Financial Year</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No time frames found.
              </TableCell>
            </TableRow>
          )}
          {data.map((timeFrame) => (
            <TableRow key={timeFrame.id}>
              <TableCell className="font-medium">{timeFrame.financialYear}</TableCell>
              <TableCell>{format(timeFrame.startDate, 'PP')}</TableCell>
              <TableCell>{format(timeFrame.endDate, 'PP')}</TableCell>
              <TableCell>{getStatusBadge(timeFrame.status)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(timeFrame.id)}
                    disabled={timeFrame.status === 'closed'}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeactivate(timeFrame.id)}
                    disabled={timeFrame.status === 'closed'}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="sr-only">Deactivate</span>
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

export default TimeFrameTable;
