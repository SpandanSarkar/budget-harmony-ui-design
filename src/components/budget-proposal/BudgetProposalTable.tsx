
// import React from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { FileText } from 'lucide-react';

// // Mock data for the table
// const proposals = [
//   {
//     id: 1,
//     head: 'IT Department',
//     particular: 'Software Licenses',
//     unit: 'Headquarters',
//     amount: 15000,
//     status: 'Pending',
//     date: '2025-04-15',
//   },
//   {
//     id: 2,
//     head: 'Finance Department',
//     particular: 'Audit Fees',
//     unit: 'Headquarters',
//     amount: 8000,
//     status: 'Approved',
//     date: '2025-04-10',
//   },
//   {
//     id: 3,
//     head: 'Marketing Department',
//     particular: 'Advertising',
//     unit: 'Regional Office',
//     amount: 12500,
//     status: 'Rejected',
//     date: '2025-04-08',
//   },
//   {
//     id: 4,
//     head: 'IT Department',
//     particular: 'Hardware Maintenance',
//     unit: 'Branch Office',
//     amount: 6000,
//     status: 'Pending',
//     date: '2025-04-05',
//   },
// ];

// // Function to determine badge color based on status
// const getStatusColor = (status: string) => {
//   switch (status.toLowerCase()) {
//     case 'approved':
//       return 'bg-green-100 text-green-800 hover:bg-green-200';
//     case 'rejected':
//       return 'bg-red-100 text-red-800 hover:bg-red-200';
//     case 'pending':
//     default:
//       return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
//   }
// };

// const BudgetProposalTable = () => {
//   return (
//     <div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Head</TableHead>
//               <TableHead>Particular</TableHead>
//               <TableHead>Unit</TableHead>
//               <TableHead className="text-right">Amount</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Date</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {proposals.map((proposal) => (
//               <TableRow key={proposal.id}>
//                 <TableCell>{proposal.head}</TableCell>
//                 <TableCell>{proposal.particular}</TableCell>
//                 <TableCell>{proposal.unit}</TableCell>
//                 <TableCell className="text-right">${proposal.amount.toLocaleString()}</TableCell>
//                 <TableCell>
//                   <Badge className={getStatusColor(proposal.status)} variant="outline">
//                     {proposal.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>{proposal.date}</TableCell>
//                 <TableCell className="text-right">
//                   <Button variant="ghost" size="sm">
//                     <FileText className="h-4 w-4 mr-1" /> View
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
      
//       <div className="flex justify-end mt-4">
//         <Button variant="outline" size="sm">
//           Export
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default BudgetProposalTable;



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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map((proposal, index) => (
              <TableRow key={index}>
                <TableCell>{proposal.headName}</TableCell>
                <TableCell>{proposal.particularId}</TableCell>
                <TableCell>{proposal.unitId}</TableCell>
                <TableCell className="text-right">${parseFloat(proposal.proposedAmount).toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor('Pending')} variant="outline">
                    Pending
                  </Badge>
                </TableCell>
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
