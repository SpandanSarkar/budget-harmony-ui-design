// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';
// import { Textarea } from '@/components/ui/textarea';
// import { Settings } from 'lucide-react';

// const incomeCategories = ['Operating', 'Non-Operating'];

// const mockIncomeHeads = [
//   {
//     id: 1,
//     name: 'Interest on Loans',
//     category: 'Operating',
//     headType: 'Loan-based',
//     audited2024: 5250000,
//     actual2025H1: 2625000,
//     dimensionTemplate: ['Unit', 'Loan Amount']
//   },
//   {
//     id: 2,
//     name: 'Fee Income',
//     category: 'Operating',
//     headType: 'Regular',
//     audited2024: 890000,
//     actual2025H1: 445000,
//     dimensionTemplate: ['Unit', 'No. of Transactions']
//   },
//   {
//     id: 3,
//     name: 'Investment Income',
//     category: 'Non-Operating',
//     headType: 'Regular',
//     audited2024: 125000,
//     actual2025H1: 62500,
//     dimensionTemplate: ['Investment Type', 'Amount']
//   }
// ];

// const IncomeBudgetEntry = () => {
//   const [selectedYear, setSelectedYear] = useState('2026');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [budgetData, setBudgetData] = useState<Record<string, any>>({});

//   const filteredHeads = selectedCategory 
//     ? mockIncomeHeads.filter(head => head.category === selectedCategory)
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
//                 <SelectItem value="2024">2024</SelectItem>
//                 <SelectItem value="2025">2025</SelectItem>
//                 <SelectItem value="2026">2026</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="category">Income Category</Label>
//             <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select income category" />
//               </SelectTrigger>
//               <SelectContent>
//                 {incomeCategories.map((category) => (
//                   <SelectItem key={category} value={category}>{category}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Budget Entry Table */}
//       {selectedCategory && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Income Budget Entry - {selectedCategory}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Income Head</TableHead>
//                     <TableHead className="text-right">2024 Audited Total</TableHead>
//                     <TableHead className="text-right">Jan-Jun 2025 Actual</TableHead>
//                     <TableHead className="text-right">Jul-Dec 2025 Projection</TableHead>
//                     <TableHead className="text-right">Jan-Dec 2026 Budget</TableHead>
//                     <TableHead className="text-right">Total</TableHead>
//                     <TableHead>Sub Fields</TableHead>
//                     <TableHead>Remarks</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Actions</TableHead>
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
//                         <TableCell className="font-medium">
//                           <div>
//                             {head.name}
//                             {head.headType === 'Loan-based' && (
//                               <Badge variant="secondary" className="ml-2 text-xs">Loan-based</Badge>
//                             )}
//                           </div>
//                         </TableCell>
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
//                         <TableCell>
//                           {head.headType === 'Loan-based' && (
//                             <Button variant="ghost" size="sm">
//                               <Settings className="h-4 w-4 mr-1" />
//                               Configure Schedule
//                             </Button>
//                           )}
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

// export default IncomeBudgetEntry;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Settings } from 'lucide-react';

const incomeCategories = ['Operating', 'Non-Operating'];

const mockIncomeHeads = [
  {
    id: 1,
    name: 'IDA Credit No. 4643',
    category: 'Operating',
    headType: 'Loan-based',
    audited2024: 5250000,
    actual2025H1: 2625000,
    dimensionTemplate: ['Unit', 'Loan Amount']
  },
  {
    id: 2,
    name: 'ADB Loan No. 2454',
    category: 'Operating',
    headType: 'Loan-based',
    audited2024: 7550000,
    actual2025H1: 3625000,
    dimensionTemplate: ['Unit', 'Loan Amount']
  },
  {
    id: 3,
    name: 'Fee Income',
    category: 'Operating',
    headType: 'Regular',
    audited2024: 890000,
    actual2025H1: 445000,
    dimensionTemplate: ['Unit', 'No. of Transactions']
  },
  {
    id: 3,
    name: 'Investment Income',
    category: 'Non-Operating',
    headType: 'Regular',
    audited2024: 125000,
    actual2025H1: 62500,
    dimensionTemplate: ['Investment Type', 'Amount']
  }
];

const IncomeBudgetEntry = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [budgetData, setBudgetData] = useState<Record<string, any>>({});

  const filteredHeads = selectedCategory 
    ? mockIncomeHeads.filter(head => head.category === selectedCategory)
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

    let total = 0;
    for (let month = 7; month <= 18; month++) {
      total += parseFloat(data[`month_${month}`] || 0);
    }
    return total;
  };

  const calculateDeviation = (current: number, previous: number): number => {
    if (previous === 0) return 0;
    return parseFloat(((current - previous) / previous * 100).toFixed(1));
  };

  const monthLabels = [
    'July', 'August', 'September', 'October', 'November', 'December',
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

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
                {/* <SelectItem value="2024">2024</SelectItem> */}
                {/* <SelectItem value="2025">2025</SelectItem> */}
                <SelectItem value="2026">2026</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Income Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select income category" />
              </SelectTrigger>
              <SelectContent>
                {incomeCategories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {selectedCategory && (
        <Card>
          <CardHeader>
            <CardTitle>Income Budget Entry - {selectedCategory}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Income Head</TableHead>
                    <TableHead className="text-right">2024 Audited Total</TableHead>
                    <TableHead className="text-right">Jan-Jun 2025 Actual</TableHead>
                    {monthLabels.map((label, index) => (
                      <TableHead key={index} className="text-center text-xs whitespace-nowrap">{label} {index < 6 ? '2025' : '2026'}</TableHead>
                    ))}
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Sub Fields</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHeads.map((head) => {
                    const headData = budgetData[head.id] || {};
                    const total = calculateTotal(head.id);
                    const deviation = calculateDeviation(total, head.actual2025H1 * 2);

                    return (
                      <TableRow key={head.id}>
                        <TableCell className="font-medium">
                          <div>
                            {head.name}
                            {head.headType === 'Loan-based' && (
                              <Badge variant="secondary" className="ml-2 text-xs">Loan-based</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">${head.audited2024.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${head.actual2025H1.toLocaleString()}</TableCell>
                        {Array.from({ length: 18 }, (_, i) => (
                          <TableCell key={i}>
                            <Input
                              type="number"
                              placeholder="0"
                              value={headData[`month_${i + 7}`] || ''}
                              onChange={(e) => handleCellChange(head.id, `month_${i + 7}`, e.target.value)}
                              className="w-20 text-xs"
                            />
                          </TableCell>
                        ))}
                        <TableCell className="text-right">
                          ${total.toLocaleString()}
                          <div className="text-xs text-muted-foreground">
                            {deviation > 0 ? '+' : ''}{deviation.toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {head.dimensionTemplate.map((dim) => (
                              <Input
                                key={dim}
                                placeholder={dim}
                                value={headData[`dim_${dim}`] || ''}
                                onChange={(e) => handleCellChange(head.id, `dim_${dim}`, e.target.value)}
                                className="w-24 text-xs"
                              />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Textarea
                            placeholder="Remarks"
                            value={headData.remarks || ''}
                            onChange={(e) => handleCellChange(head.id, 'remarks', e.target.value)}
                            className="w-32 h-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Draft</Badge>
                        </TableCell>
                        <TableCell>
                          {head.headType === 'Loan-based' && (
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4 mr-1" />
                              Configure Schedule
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

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

export default IncomeBudgetEntry;
