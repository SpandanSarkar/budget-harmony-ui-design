// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';
// import { Textarea } from '@/components/ui/textarea';

// const expenseGroups = [
//   'Admin', 'HR', 'IT', 'PR/Media Events', 'Company Secretary', 
//   'BUs', 'Corporate Advisory', 'Legal & SAM', 'Depreciation', 'F&A'
// ];

// const mockExpenseHeads = [
//   {
//     id: 1,
//     name: 'Office Supplies',
//     group: 'Admin',
//     audited2024: 125000,
//     actual2025H1: 62500,
//     dimensionTemplate: ['Unit', 'Quantity', 'CAPEX/OPEX']
//   },
//   {
//     id: 2,
//     name: 'Training & Development',
//     group: 'HR',
//     audited2024: 85000,
//     actual2025H1: 42000,
//     dimensionTemplate: ['Designation', 'No. of Events', 'Cost per Head']
//   },
//   {
//     id: 3,
//     name: 'Software Licenses',
//     group: 'IT',
//     audited2024: 250000,
//     actual2025H1: 125000,
//     dimensionTemplate: ['Unit', 'Quantity']
//   }
// ];

// const ExpenseBudgetEntry = () => {
//   const [selectedYear, setSelectedYear] = useState('2026');
//   const [selectedGroup, setSelectedGroup] = useState('');
//   const [budgetData, setBudgetData] = useState<Record<string, any>>({});

//   const filteredHeads = selectedGroup 
//     ? mockExpenseHeads.filter(head => head.group === selectedGroup)
//     : [];

//   const handleCellChange = (headId: number, field: string, value: string) => {
//     setBudgetData(prev => ({
//       ...prev,
//       [headId]: {
//         ...prev[headId],
//         [field]: value
//       }
//     }));
//   };

//   const calculateTotal = (headId: number): number => {
//     const data = budgetData[headId];
//     if (!data) return 0;
    
//     let total = 0;
//     for (let month = 1; month <= 12; month++) {
//       total += parseFloat(data[`month_${month}`] || 0);
//     }
//     return total;
//   };

//   const calculateDeviation = (current: number, previous: number): number => {
//     if (previous === 0) return 0;
//     return parseFloat(((current - previous) / previous * 100).toFixed(1));
//   };

//   return (
//     <div className="space-y-6">
//       {/* Filter Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Filter Options</CardTitle>
//         </CardHeader>
//         <CardContent className="grid grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="year">Financial Year</Label>
//             <Select value={selectedYear} onValueChange={setSelectedYear}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select year" />
//               </SelectTrigger>
//               <SelectContent>
//                 {/* <SelectItem value="2024">2024</SelectItem> */}
//                 {/* <SelectItem value="2025">2025</SelectItem> */}
//                 <SelectItem value="2026">2026</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="group">Expense Group</Label>
//             <Select value={selectedGroup} onValueChange={setSelectedGroup}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select expense group" />
//               </SelectTrigger>
//               <SelectContent>
//                 {expenseGroups.map((group) => (
//                   <SelectItem key={group} value={group}>{group}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Budget Entry Table */}
//       {selectedGroup && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Expense Budget Entry - {selectedGroup}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Expense Head</TableHead>
//                     <TableHead className="text-right">2024 Audited Total</TableHead>
//                     <TableHead className="text-right">Jan-Jun 2025 Actual</TableHead>
//                     <TableHead className="text-right">Jul-Dec 2025 Projection</TableHead>
//                     <TableHead className="text-right">Jan-Dec 2026 Budget</TableHead>
//                     <TableHead className="text-right">Total</TableHead>
//                     <TableHead>Sub Fields</TableHead>
//                     <TableHead>Remarks</TableHead>
//                     <TableHead>Status</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredHeads.map((head) => {
//                     const headData = budgetData[head.id] || {};
//                     const projection2025 = parseFloat(headData.projection_2025 || 0);
//                     const budget2026Total = calculateTotal(head.id);
//                     const deviation2526 = calculateDeviation(budget2026Total, head.actual2025H1 * 2);
                    
//                     return (
//                       <TableRow key={head.id}>
//                         <TableCell className="font-medium">{head.name}</TableCell>
//                         <TableCell className="text-right">${head.audited2024.toLocaleString()}</TableCell>
//                         <TableCell className="text-right">${head.actual2025H1.toLocaleString()}</TableCell>
//                         <TableCell>
//                           <Input
//                             type="number"
//                             placeholder="Enter projection"
//                             value={headData.projection_2025 || ''}
//                             onChange={(e) => handleCellChange(head.id, 'projection_2025', e.target.value)}
//                             className="w-32"
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <div className="grid grid-cols-3 gap-1">
//                             {Array.from({length: 12}, (_, i) => (
//                               <Input
//                                 key={i}
//                                 type="number"
//                                 placeholder={`M${i+1}`}
//                                 value={headData[`month_${i+1}`] || ''}
//                                 onChange={(e) => handleCellChange(head.id, `month_${i+1}`, e.target.value)}
//                                 className="w-20 text-xs"
//                               />
//                             ))}
//                           </div>
//                         </TableCell>
//                         <TableCell className="text-right">
//                           ${budget2026Total.toLocaleString()}
//                           {budget2026Total > 0 && (
//                             <div className="text-xs text-muted-foreground">
//                               {deviation2526 > 0 ? '+' : ''}{deviation2526.toFixed(1)}%
//                             </div>
//                           )}
//                         </TableCell>
//                         <TableCell>
//                           <div className="space-y-1">
//                             {head.dimensionTemplate.map((dim) => (
//                               <Input
//                                 key={dim}
//                                 placeholder={dim}
//                                 value={headData[`dim_${dim}`] || ''}
//                                 onChange={(e) => handleCellChange(head.id, `dim_${dim}`, e.target.value)}
//                                 className="w-24 text-xs"
//                               />
//                             ))}
//                           </div>
//                         </TableCell>
//                         <TableCell>
//                           <Textarea
//                             placeholder="Remarks"
//                             value={headData.remarks || ''}
//                             onChange={(e) => handleCellChange(head.id, 'remarks', e.target.value)}
//                             className="w-32 h-20"
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Badge variant="outline">Draft</Badge>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })}
//                 </TableBody>
//               </Table>
//             </div>

//             <div className="flex justify-end gap-2 mt-6">
//               <Button variant="outline">Save Draft</Button>
//               <Button>Submit for Approval</Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default ExpenseBudgetEntry;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

const expenseGroups = [
  'Admin', 'HR', 'IT', 'PR/Media Events', 'Company Secretary', 
  'BUs', 'Corporate Advisory', 'Legal & SAM', 'Depreciation', 'F&A'
];

const months2525 = ['July', 'August', 'September', 'October', 'November', 'December'];
const months26 = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const mockExpenseHeads = [
  {
    id: 1,
    name: 'Office Supplies',
    group: 'Admin',
    audited2024: 125000,
    actual2025H1: 62500,
    dimensionTemplate: ['Unit', 'Quantity', 'CAPEX/OPEX']
  },
  {
    id: 2,
    name: 'Training & Development',
    group: 'HR',
    audited2024: 85000,
    actual2025H1: 42000,
    dimensionTemplate: ['Designation', 'No. of Events', 'Cost per Head']
  },
  {
    id: 3,
    name: 'Software Licenses',
    group: 'IT',
    audited2024: 250000,
    actual2025H1: 125000,
    dimensionTemplate: ['Unit', 'Quantity']
  }
];

const ExpenseBudgetEntry = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [budgetData, setBudgetData] = useState<Record<string, any>>({});

  const filteredHeads = selectedGroup 
    ? mockExpenseHeads.filter(head => head.group === selectedGroup)
    : [];

  const handleCellChange = (headId: number, field: string, value: string) => {
    setBudgetData(prev => ({
      ...prev,
      [headId]: {
        ...prev[headId],
        [field]: value
      }
    }));
  };

  const calculateTotal = (headId: number): number => {
    const data = budgetData[headId];
    if (!data) return 0;

    const fields = [...months2525, ...months26];
    return fields.reduce((sum, month) => sum + parseFloat(data[month] || 0), 0);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filter Options</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year">Financial Year</Label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2026">2026</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="group">Expense Group</Label>
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Select expense group" />
              </SelectTrigger>
              <SelectContent>
                {expenseGroups.map(group => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {selectedGroup && (
        <Card>
          <CardHeader>
            <CardTitle>Expense Budget Entry - {selectedGroup}</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expense Head</TableHead>
                  <TableHead className="text-right">2024 Audited Total</TableHead>
                  <TableHead className="text-right">Jan-Jun 2025 Actual</TableHead>
                  {[...months2525, ...months26].map(month => (
                    <TableHead key={month} className="text-right">{month} {month.includes('2025') ? '' : '2026'}</TableHead>
                  ))}
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Sub Fields</TableHead>
                  <TableHead>Remarks</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHeads.map(head => {
                  const headData = budgetData[head.id] || {};
                  const total = calculateTotal(head.id);
                  return (
                    <TableRow key={head.id}>
                      <TableCell className="font-medium">{head.name}</TableCell>
                      <TableCell className="text-right">${head.audited2024.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${head.actual2025H1.toLocaleString()}</TableCell>
                      {[...months2525, ...months26].map(month => (
                        <TableCell key={month}>
                          <Input
                            type="number"
                            value={headData[month] || ''}
                            onChange={e => handleCellChange(head.id, month, e.target.value)}
                            className="w-24 text-xs"
                          />
                        </TableCell>
                      ))}
                      <TableCell className="text-right">${total.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {head.dimensionTemplate.map(dim => (
                            <Input
                              key={dim}
                              placeholder={dim}
                              value={headData[`dim_${dim}`] || ''}
                              onChange={e => handleCellChange(head.id, `dim_${dim}`, e.target.value)}
                              className="w-24 text-xs"
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Textarea
                          placeholder="Remarks"
                          value={headData.remarks || ''}
                          onChange={e => handleCellChange(head.id, 'remarks', e.target.value)}
                          className="w-32 h-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Draft</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">Save Draft</Button>
              <Button>Submit for Approval</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExpenseBudgetEntry;
