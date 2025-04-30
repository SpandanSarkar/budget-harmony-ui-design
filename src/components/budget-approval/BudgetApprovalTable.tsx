
import React, { useState } from 'react';
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
import {
  FileText,
  Check,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Mock data for the table
const requests = [
  {
    id: 1,
    head: 'IT Department',
    particular: 'Software Licenses',
    currentAmount: 15000,
    requestedAmount: 5000,
    totalAmount: 20000,
    remarks: 'Need additional licenses for new employees joining in Q3',
    supportingDocs: true,
    status: 'Pending',
  },
  {
    id: 2,
    head: 'Marketing Department',
    particular: 'Events',
    currentAmount: 7500,
    requestedAmount: 3500,
    totalAmount: 11000,
    remarks: 'Additional budget required for end of year client appreciation event',
    supportingDocs: true,
    status: 'Pending',
  },
  {
    id: 3,
    head: 'Finance Department',
    particular: 'Consulting Services',
    currentAmount: 10000,
    requestedAmount: 8000,
    totalAmount: 18000,
    remarks: 'Specialized consultant needed for new regulatory compliance project',
    supportingDocs: false,
    status: 'Pending',
  },
];

const BudgetApprovalTable = () => {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const [comments, setComments] = useState<Record<number, string>>({});
  
  const toggleRow = (id: number) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const handleCommentChange = (id: number, value: string) => {
    setComments(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleApprove = (id: number) => {
    if (!comments[id]) {
      toast.error('Please provide a comment before approving');
      return;
    }
    
    toast.success('Request approved successfully');
    console.log('Approved', id, comments[id]);
  };
  
  const handleReject = (id: number) => {
    if (!comments[id]) {
      toast.error('Please provide a comment before rejecting');
      return;
    }
    
    toast.success('Request rejected successfully');
    console.log('Rejected', id, comments[id]);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10"></TableHead>
            <TableHead>Head</TableHead>
            <TableHead>Particular</TableHead>
            <TableHead className="text-right">Current</TableHead>
            <TableHead className="text-right">Requested</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead>Docs</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <React.Fragment key={request.id}>
              <TableRow>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => toggleRow(request.id)}
                  >
                    {expandedRows[request.id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
                <TableCell>{request.head}</TableCell>
                <TableCell>{request.particular}</TableCell>
                <TableCell className="text-right">${request.currentAmount.toLocaleString()}</TableCell>
                <TableCell className="text-right">${request.requestedAmount.toLocaleString()}</TableCell>
                <TableCell className="text-right">${request.totalAmount.toLocaleString()}</TableCell>
                <TableCell className="max-w-[200px] truncate" title={request.remarks}>
                  {request.remarks}
                </TableCell>
                <TableCell>
                  {request.supportingDocs ? (
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">View Documents</span>
                    </Button>
                  ) : (
                    <span className="text-muted-foreground">None</span>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-green-50 border-green-200 hover:bg-green-100 hover:text-green-700"
                    onClick={() => handleApprove(request.id)}
                  >
                    <Check className="h-4 w-4 mr-1" /> 
                    Approve
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-red-50 border-red-200 hover:bg-red-100 hover:text-red-700"
                    onClick={() => handleReject(request.id)}
                  >
                    <X className="h-4 w-4 mr-1" /> 
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
              
              {expandedRows[request.id] && (
                <TableRow>
                  <TableCell colSpan={9} className="p-4 bg-muted/30">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Comments</h4>
                        <Textarea
                          placeholder="Add your comments here before approving or rejecting..."
                          value={comments[request.id] || ''}
                          onChange={(e) => handleCommentChange(request.id, e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-green-50 border-green-200 hover:bg-green-100 hover:text-green-700"
                          onClick={() => handleApprove(request.id)}
                        >
                          <Check className="h-4 w-4 mr-1" /> 
                          Approve Request
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-red-50 border-red-200 hover:bg-red-100 hover:text-red-700"
                          onClick={() => handleReject(request.id)}
                        >
                          <X className="h-4 w-4 mr-1" /> 
                          Reject Request
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BudgetApprovalTable;
