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
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const incomeCategories = ['Operating', 'Non-Operating'];

// const mockIncomeHeads = [
//   {
//     id: 1,
//     name: 'IDA Credit No. 4643',
//     category: 'Operating',
//     headType: 'Loan-based',
//     audited2024: 5250000,
//     actual2025H1: 2625000,
//     // dimensionTemplate: ['Unit', 'Loan Amount']
//     dimensionTemplate: ['Loan Amount']
//   },
//   {
//     id: 2,
//     name: 'ADB Loan No. 2454',
//     category: 'Operating',
//     headType: 'Loan-based',
//     audited2024: 7550000,
//     actual2025H1: 3625000,
//     // dimensionTemplate: ['Unit', 'Loan Amount']
//     dimensionTemplate: ['Loan Amount']
//   },
//   {
//     id: 3,
//     name: 'Fee Income',
//     category: 'Operating',
//     headType: 'Regular',
//     audited2024: 890000,
//     actual2025H1: 445000,
//     // dimensionTemplate: ['Unit', 'No. of Transactions']
//     dimensionTemplate: ['No. of Transactions']
//   },
//   {
//     id: 4,
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
//     for (let month = 7; month <= 18; month++) {
//       total += parseFloat(data[`month_${month}`] || 0);
//     }
//     return total;
//   };

//   const calculateDeviation = (current: number, previous: number): number => {
//     if (previous === 0) return 0;
//     return parseFloat(((current - previous) / previous * 100).toFixed(1));
//   };

//   const monthLabels = [
//     'July', 'August', 'September', 'October', 'November', 'December',
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   return (
//     <div className="space-y-6">
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
//                     {monthLabels.map((label, index) => (
//                       <TableHead key={index} className="text-center text-xs whitespace-nowrap">{label} {index < 6 ? '2025' : '2026'}</TableHead>
//                     ))}
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
//                     const total = calculateTotal(head.id);
//                     const deviation = calculateDeviation(total, head.actual2025H1 * 2);

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
//                         {Array.from({ length: 18 }, (_, i) => (
//                           <TableCell key={i}>
//                             <Input
//                               type="number"
//                               placeholder="0"
//                               value={headData[`month_${i + 7}`] || ''}
//                               onChange={(e) => handleCellChange(head.id, `month_${i + 7}`, e.target.value)}
//                               className="w-20 text-xs"
//                             />
//                           </TableCell>
//                         ))}
//                         <TableCell className="text-right">
//                           ${total.toLocaleString()}
//                           <div className="text-xs text-muted-foreground">
//                             {deviation > 0 ? '+' : ''}{deviation.toFixed(1)}%
//                           </div>
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
//                               <Link to='/loan-interest-config'>
//                                 Configure Schedule
//                               </Link>
                              
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
import { Settings, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const incomeCategories = ['Operating', 'Non-Operating'];

const mockIncomeHeads = [
  { id: 1, name: 'IDA Credit No. 4643', category: 'Operating', headType: 'Loan-based', audited2024: 5250000, actual2025H1: 2625000, dimensionTemplate: ['Loan Amount'] },
  { id: 2, name: 'ADB Loan No. 2454', category: 'Operating', headType: 'Loan-based', audited2024: 7550000, actual2025H1: 3625000, dimensionTemplate: ['Loan Amount'] },
  { id: 3, name: 'Fee Income', category: 'Operating', headType: 'Regular', audited2024: 890000, actual2025H1: 445000, dimensionTemplate: ['No. of Transactions'] },
  { id: 4, name: 'Investment Income', category: 'Non-Operating', headType: 'Regular', audited2024: 125000, actual2025H1: 62500, dimensionTemplate: ['Investment Type', 'Amount'] }
];

const IncomeBudgetEntry = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [budgetData, setBudgetData] = useState<Record<string, any>>({});
  // NEW: files state
  const [files, setFiles] = useState<File[]>([]);

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
      total += parseFloat((data[`month_${month}`] as string) || '0');
    }
    return total;
  };

  const calculateDeviation = (current: number, previous: number): number => {
    if (previous === 0) return 0;
    return parseFloat((((current - previous) / previous) * 100).toFixed(1));
  };

  const monthLabels = [
    'July', 'August', 'September', 'October', 'November', 'December',
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // ---------- File upload handlers (NEW) ----------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = Array.from(e.target.files ?? []);
    if (!chosen.length) return;

    // Optional: filter by allowed types client-side
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    const filtered = chosen.filter(f => allowed.includes(f.type) || /\.(pdf|docx?|xls[x]?)$/i.test(f.name));
    setFiles(prev => [...prev, ...filtered]);
    // reset input so selecting same file again triggers onChange
    e.currentTarget.value = '';
  };

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const clearFiles = () => setFiles([]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };
  // ------------------------------------------------

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
                      <TableHead key={index} className="text-center text-xs whitespace-nowrap">
                        {label} {index < 6 ? '2025' : '2026'}
                      </TableHead>
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
                              <Link to="/loan-interest-config">Configure Schedule</Link>
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* ---------- Supporting Documents (NEW) ---------- */}
            <div className="mt-6 rounded-lg border p-4">
              <div className="mb-3 font-medium">Supporting Documents</div>

              <div className="flex items-center gap-3">
                <input
                  id="income-files"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-primary-foreground hover:file:opacity-90"
                />
                {files.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFiles}>
                    Clear
                  </Button>
                )}
              </div>

              <div className="mt-2 text-xs text-muted-foreground">
                PDF, XLS, DOC formats supported
              </div>

              {files.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {files.map((f, idx) => (
                    <li key={`${f.name}-${idx}`} className="flex items-center justify-between rounded-md border px-3 py-2">
                      <div className="min-w-0 pr-2">
                        <div className="truncate text-sm">{f.name}</div>
                        <div className="text-xs text-muted-foreground">{formatBytes(f.size)}</div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFile(idx)} aria-label="Remove file">
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* ------------------------------------------------ */}

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

