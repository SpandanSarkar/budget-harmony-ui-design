// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Badge } from '@/components/ui/badge';
// import { ArrowLeft, Check, X, RotateCcw, MessageSquare } from 'lucide-react';
// import { toast } from 'sonner';

// interface BudgetSubmission {
//   id: string;
//   budgetYear: string;
//   headName: string;
//   category: 'Income' | 'Expense';
//   group: string;
//   submittedBy: string;
//   submissionDate: string;
//   status: 'Draft' | 'Pending' | 'Approved' | 'Rejected';
// }

// interface MonthlyBudget {
//   month: string;
//   amount: number;
// }

// interface BudgetReviewDetailProps {
//   submission: BudgetSubmission;
//   onBack: () => void;
// }

// const BudgetReviewDetail = ({ submission, onBack }: BudgetReviewDetailProps) => {
//   // Mock historical data
//   const [auditedTotal2024] = useState(663.41);
//   const [actualJanJun2025] = useState(325.15);
  
//   // Mock monthly data - in reality this would come from the submitted budget
//   const [monthlyData, setMonthlyData] = useState<MonthlyBudget[]>([
//     { month: 'Jul 2025', amount: 45.20 },
//     { month: 'Aug 2025', amount: 48.50 },
//     { month: 'Sep 2025', amount: 52.10 },
//     { month: 'Oct 2025', amount: 49.80 },
//     { month: 'Nov 2025', amount: 51.30 },
//     { month: 'Dec 2025', amount: 53.60 },
//     { month: 'Jan 2026', amount: 55.40 },
//     { month: 'Feb 2026', amount: 57.20 },
//     { month: 'Mar 2026', amount: 59.10 },
//     { month: 'Apr 2026', amount: 61.30 },
//     { month: 'May 2026', amount: 63.50 },
//     { month: 'Jun 2026', amount: 65.80 },
//     { month: 'Jul 2026', amount: 68.20 },
//     { month: 'Aug 2026', amount: 70.40 },
//     { month: 'Sep 2026', amount: 72.60 },
//     { month: 'Oct 2026', amount: 74.90 },
//     { month: 'Nov 2026', amount: 77.10 },
//     { month: 'Dec 2026', amount: 79.30 }
//   ]);

//   const [originalData] = useState(monthlyData);
//   const [submitterRemarks] = useState("Projected growth based on market expansion and new product launches. Conservative estimates considering current economic conditions.");
//   const [reviewerComment, setReviewerComment] = useState('');

//   const updateMonthlyAmount = (index: number, value: string) => {
//     const newData = [...monthlyData];
//     newData[index].amount = parseFloat(value) || 0;
//     setMonthlyData(newData);
//   };

//   const resetChanges = () => {
//     setMonthlyData([...originalData]);
//     toast.success('Changes reset to original values');
//   };

//   const handleApprove = () => {
//     toast.success('Budget approved successfully');
//     onBack();
//   };

//   const handleSendBack = () => {
//     if (!reviewerComment.trim()) {
//       toast.error('Please provide a comment for revision');
//       return;
//     }
//     toast.success('Budget sent back for revision');
//     onBack();
//   };

//   const handleReject = () => {
//     if (!reviewerComment.trim()) {
//       toast.error('Comment is mandatory for rejection');
//       return;
//     }
//     toast.success('Budget rejected');
//     onBack();
//   };

//   // Calculate totals
//   const julDec2025Total = monthlyData.slice(0, 6).reduce((sum, item) => sum + item.amount, 0);
//   const janDec2026Total = monthlyData.slice(6).reduce((sum, item) => sum + item.amount, 0);
  
//   // Calculate deviations
//   const deviation2025vs2024 = ((julDec2025Total + actualJanJun2025 - auditedTotal2024) / auditedTotal2024) * 100;
//   const deviation2026vs2025 = ((janDec2026Total - (julDec2025Total + actualJanJun2025)) / (julDec2025Total + actualJanJun2025)) * 100;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center gap-4">
//         <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
//           <ArrowLeft className="h-4 w-4" />
//           Back to List
//         </Button>
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Budget Review & Adjustment</h1>
//           <p className="text-muted-foreground">Review and adjust budget details</p>
//         </div>
//       </div>

//       {/* Budget Info Card */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center justify-between">
//             Budget Details
//             <Badge variant="outline">{submission.status}</Badge>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//             <div>
//               <span className="font-medium text-muted-foreground">Budget Year:</span>
//               <p className="font-semibold">{submission.budgetYear}</p>
//             </div>
//             <div>
//               <span className="font-medium text-muted-foreground">Category:</span>
//               <p className="font-semibold">{submission.category}</p>
//             </div>
//             <div>
//               <span className="font-medium text-muted-foreground">Head Name:</span>
//               <p className="font-semibold">{submission.headName}</p>
//             </div>
//             <div>
//               <span className="font-medium text-muted-foreground">Group:</span>
//               <p className="font-semibold">{submission.group}</p>
//             </div>
//             <div>
//               <span className="font-medium text-muted-foreground">Submitted By:</span>
//               <p className="font-semibold">{submission.submittedBy}</p>
//             </div>
//             <div>
//               <span className="font-medium text-muted-foreground">Submission Date:</span>
//               <p className="font-semibold">{new Date(submission.submissionDate).toLocaleDateString()}</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Historical Data */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Historical Reference</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <span className="text-sm font-medium text-muted-foreground">2024 Audited Total (Crore Tk)</span>
//               <p className="text-2xl font-bold">{auditedTotal2024.toLocaleString()}</p>
//             </div>
//             <div className="space-y-2">
//               <span className="text-sm font-medium text-muted-foreground">Jan-Jun 2025 Actual (Crore Tk)</span>
//               <p className="text-2xl font-bold">{actualJanJun2025.toLocaleString()}</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Monthly Budget Input */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Monthly Budget Review</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Jul-Dec 2025 Projection */}
//             <div>
//               <h3 className="font-semibold mb-4 text-orange-600">Jul-Dec 2025 Projection (Editable)</h3>
//               <div className="space-y-3">
//                 {monthlyData.slice(0, 6).map((item, index) => (
//                   <div key={item.month} className="grid grid-cols-2 gap-2 items-center">
//                     <label className="text-sm font-medium">{item.month}:</label>
//                     <Input
//                       type="number"
//                       step="0.01"
//                       value={item.amount}
//                       onChange={(e) => updateMonthlyAmount(index, e.target.value)}
//                       className="text-right"
//                     />
//                   </div>
//                 ))}
//                 <div className="border-t pt-2">
//                   <div className="flex justify-between font-semibold">
//                     <span>Total Jul-Dec 2025:</span>
//                     <span>{julDec2025Total.toFixed(2)} Cr</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Jan-Dec 2026 Budget */}
//             <div>
//               <h3 className="font-semibold mb-4 text-blue-600">Jan-Dec 2026 Proposed Budget (Editable)</h3>
//               <div className="space-y-3">
//                 {monthlyData.slice(6).map((item, index) => (
//                   <div key={item.month} className="grid grid-cols-2 gap-2 items-center">
//                     <label className="text-sm font-medium">{item.month}:</label>
//                     <Input
//                       type="number"
//                       step="0.01"
//                       value={item.amount}
//                       onChange={(e) => updateMonthlyAmount(index + 6, e.target.value)}
//                       className="text-right"
//                     />
//                   </div>
//                 ))}
//                 <div className="border-t pt-2">
//                   <div className="flex justify-between font-semibold">
//                     <span>Total Jan-Dec 2026:</span>
//                     <span>{janDec2026Total.toFixed(2)} Cr</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Deviation Analysis */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Deviation Analysis</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <span className="text-sm font-medium text-muted-foreground">2025 vs 2024 Deviation</span>
//               <p className={`text-lg font-bold ${deviation2025vs2024 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//                 {deviation2025vs2024 >= 0 ? '+' : ''}{deviation2025vs2024.toFixed(2)}%
//               </p>
//             </div>
//             <div className="space-y-2">
//               <span className="text-sm font-medium text-muted-foreground">2026 vs 2025 Deviation</span>
//               <p className={`text-lg font-bold ${deviation2026vs2025 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//                 {deviation2026vs2025 >= 0 ? '+' : ''}{deviation2026vs2025.toFixed(2)}%
//               </p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Submitter Remarks */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Submitter Remarks</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="bg-muted p-4 rounded-md">
//             <p className="text-sm">{submitterRemarks}</p>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Reviewer Action */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Review Actions</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div>
//             <label className="text-sm font-medium mb-2 block">Reviewer Comment</label>
//             <Textarea
//               placeholder="Add your comments for approval, revision, or rejection..."
//               value={reviewerComment}
//               onChange={(e) => setReviewerComment(e.target.value)}
//               rows={3}
//             />
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <Button onClick={handleApprove} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
//               <Check className="h-4 w-4" />
//               Approve Budget
//             </Button>
            
//             <Button variant="outline" onClick={handleSendBack} className="flex items-center gap-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50">
//               <MessageSquare className="h-4 w-4" />
//               Send Back for Revision
//             </Button>
            
//             <Button variant="destructive" onClick={handleReject} className="flex items-center gap-2">
//               <X className="h-4 w-4" />
//               Reject Budget
//             </Button>
            
//             <Button variant="outline" onClick={resetChanges} className="flex items-center gap-2">
//               <RotateCcw className="h-4 w-4" />
//               Reset Changes
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default BudgetReviewDetail;



// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Badge } from '@/components/ui/badge';
// import { ArrowLeft, Check, X, RotateCcw, MessageSquare } from 'lucide-react';
// import { toast } from 'sonner';

// interface BudgetSubmission {
//   id: string;
//   budgetYear: string;
//   headName: string;
//   category: 'Income' | 'Expense';
//   group: string;
//   submittedBy: string;
//   submissionDate: string;
//   status: 'Draft' | 'Pending' | 'Approved' | 'Rejected';
// }

// interface MonthlyBudget {
//   month: string;
//   amount: number;
// }

// interface BudgetReviewDetailProps {
//   submission: BudgetSubmission;
//   onBack: () => void;
// }

// const BudgetReviewDetail = ({ submission, onBack }: BudgetReviewDetailProps) => {
//   const [auditedTotal2024] = useState(663.41);
//   const [actualJanJun2025] = useState(325.15);

//   const [monthlyData] = useState<MonthlyBudget[]>([
//     { month: 'Jul 2025', amount: 45.20 },
//     { month: 'Aug 2025', amount: 48.50 },
//     { month: 'Sep 2025', amount: 52.10 },
//     { month: 'Oct 2025', amount: 49.80 },
//     { month: 'Nov 2025', amount: 51.30 },
//     { month: 'Dec 2025', amount: 53.60 },
//     { month: 'Jan 2026', amount: 55.40 },
//     { month: 'Feb 2026', amount: 57.20 },
//     { month: 'Mar 2026', amount: 59.10 },
//     { month: 'Apr 2026', amount: 61.30 },
//     { month: 'May 2026', amount: 63.50 },
//     { month: 'Jun 2026', amount: 65.80 },
//     { month: 'Jul 2026', amount: 68.20 },
//     { month: 'Aug 2026', amount: 70.40 },
//     { month: 'Sep 2026', amount: 72.60 },
//     { month: 'Oct 2026', amount: 74.90 },
//     { month: 'Nov 2026', amount: 77.10 },
//     { month: 'Dec 2026', amount: 79.30 }
//   ]);

//   const [reviewData, setReviewData] = useState<MonthlyBudget[]>([...monthlyData]);
//   const [submitterRemarks] = useState("Projected growth based on market expansion and new product launches. Conservative estimates considering current economic conditions.");
//   const [reviewerComment, setReviewerComment] = useState('');

//   const updateReviewAmount = (index: number, value: string) => {
//     const newData = [...reviewData];
//     newData[index].amount = parseFloat(value) || 0;
//     setReviewData(newData);
//   };

//   const resetChanges = () => {
//     setReviewData([...monthlyData]);
//     toast.success('Reviewer values reset to BU input');
//   };

//   const handleApprove = () => {
//     toast.success('Budget approved successfully');
//     onBack();
//   };

//   const handleSendBack = () => {
//     if (!reviewerComment.trim()) {
//       toast.error('Please provide a comment for revision');
//       return;
//     }
//     toast.success('Budget sent back for revision');
//     onBack();
//   };

//   const handleReject = () => {
//     if (!reviewerComment.trim()) {
//       toast.error('Comment is mandatory for rejection');
//       return;
//     }
//     toast.success('Budget rejected');
//     onBack();
//   };

//   const julDec2025Total = reviewData.slice(0, 6).reduce((sum, item) => sum + item.amount, 0);
//   const janDec2026Total = reviewData.slice(6).reduce((sum, item) => sum + item.amount, 0);

//   const deviation2025vs2024 = ((julDec2025Total + actualJanJun2025 - auditedTotal2024) / auditedTotal2024) * 100;
//   const deviation2026vs2025 = ((janDec2026Total - (julDec2025Total + actualJanJun2025)) / (julDec2025Total + actualJanJun2025)) * 100;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center gap-4">
//         <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
//           <ArrowLeft className="h-4 w-4" />
//           Back to List
//         </Button>
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Budget Review & Adjustment</h1>
//           <p className="text-muted-foreground">Review and adjust budget details</p>
//         </div>
//       </div>

//       {/* Budget Info */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center justify-between">
//             Budget Details
//             <Badge variant="outline">{submission.status}</Badge>
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//             <div><span className="font-medium text-muted-foreground">Budget Year:</span><p className="font-semibold">{submission.budgetYear}</p></div>
//             <div><span className="font-medium text-muted-foreground">Category:</span><p className="font-semibold">{submission.category}</p></div>
//             <div><span className="font-medium text-muted-foreground">Head Name:</span><p className="font-semibold">{submission.headName}</p></div>
//             <div><span className="font-medium text-muted-foreground">Group:</span><p className="font-semibold">{submission.group}</p></div>
//             <div><span className="font-medium text-muted-foreground">Submitted By:</span><p className="font-semibold">{submission.submittedBy}</p></div>
//             <div><span className="font-medium text-muted-foreground">Submission Date:</span><p className="font-semibold">{new Date(submission.submissionDate).toLocaleDateString()}</p></div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Historical Reference */}
//       <Card>
//         <CardHeader><CardTitle>Historical Reference</CardTitle></CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div><span className="text-sm font-medium text-muted-foreground">2024 Audited Total (Crore TK)</span><p className="text-2xl font-bold">{auditedTotal2024.toLocaleString()}</p></div>
//             <div><span className="text-sm font-medium text-muted-foreground">Jan-Jun 2025 Actual (Crore TK)</span><p className="text-2xl font-bold">{actualJanJun2025.toLocaleString()}</p></div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Monthly Review */}
//       <Card>
//         <CardHeader><CardTitle>Monthly Budget Review</CardTitle></CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Jul–Dec 2025 */}
//             <div>
//               <h3 className="font-semibold mb-4 text-orange-600">Jul-Dec 2025 Projection</h3>
//               <div className="space-y-3">
//                 {monthlyData.slice(0, 6).map((item, index) => (
//                   <div key={item.month} className="grid grid-cols-3 gap-2 items-center">
//                     <label className="text-sm font-medium">{item.month}:</label>
//                     <Input readOnly value={item.amount} className="text-right bg-muted" />
//                     <Input
//                       type="number"
//                       step="0.01"
//                       value={reviewData[index].amount}
//                       onChange={e => updateReviewAmount(index, e.target.value)}
//                       className="text-right"
//                     />
//                   </div>
//                 ))}
//                 <div className="border-t pt-2 flex justify-between font-semibold">
//                   <span>Total Jul-Dec 2025:</span><span>{julDec2025Total.toFixed(2)} Cr</span>
//                 </div>
//               </div>
//             </div>

//             {/* Jan–Dec 2026 */}
//             <div>
//               <h3 className="font-semibold mb-4 text-blue-600">Jan-Dec 2026 Proposed Budget</h3>
//               <div className="space-y-3">
//                 {monthlyData.slice(6).map((item, index) => (
//                   <div key={item.month} className="grid grid-cols-3 gap-2 items-center">
//                     <label className="text-sm font-medium">{item.month}:</label>
//                     <Input readOnly value={item.amount} className="text-right bg-muted" />
//                     <Input
//                       type="number"
//                       step="0.01"
//                       value={reviewData[index + 6].amount}
//                       onChange={e => updateReviewAmount(index + 6, e.target.value)}
//                       className="text-right"
//                     />
//                   </div>
//                 ))}
//                 <div className="border-t pt-2 flex justify-between font-semibold">
//                   <span>Total Jan-Dec 2026:</span><span>{janDec2026Total.toFixed(2)} Cr</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Deviation Analysis */}
//       <Card>
//         <CardHeader><CardTitle>Deviation Analysis</CardTitle></CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div><span className="text-sm font-medium text-muted-foreground">2025 vs 2024 Deviation</span><p className={`text-lg font-bold ${deviation2025vs2024 >= 0 ? 'text-green-600' : 'text-red-600'}`}>{deviation2025vs2024.toFixed(2)}%</p></div>
//             <div><span className="text-sm font-medium text-muted-foreground">2026 vs 2025 Deviation</span><p className={`text-lg font-bold ${deviation2026vs2025 >= 0 ? 'text-green-600' : 'text-red-600'}`}>{deviation2026vs2025.toFixed(2)}%</p></div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Submitter Remarks */}
//       <Card>
//         <CardHeader><CardTitle>Submitter Remarks</CardTitle></CardHeader>
//         <CardContent><div className="bg-muted p-4 rounded-md text-sm">{submitterRemarks}</div></CardContent>
//       </Card>

//       {/* Reviewer Actions */}
//       <Card>
//         <CardHeader><CardTitle>Review Actions</CardTitle></CardHeader>
//         <CardContent className="space-y-4">
//           <div>
//             <label className="text-sm font-medium mb-2 block">Reviewer Comment</label>
//             <Textarea
//               placeholder="Add your comments for approval, revision, or rejection..."
//               value={reviewerComment}
//               onChange={(e) => setReviewerComment(e.target.value)}
//               rows={3}
//             />
//           </div>
//           <div className="flex flex-wrap gap-3">
//             <Button onClick={handleApprove} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
//               <Check className="h-4 w-4" />
//               Approve Budget
//             </Button>
//             <Button variant="outline" onClick={handleSendBack} className="flex items-center gap-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50">
//               <MessageSquare className="h-4 w-4" />
//               Send Back for Revision
//             </Button>
//             <Button variant="destructive" onClick={handleReject} className="flex items-center gap-2">
//               <X className="h-4 w-4" />
//               Reject Budget
//             </Button>
//             <Button variant="outline" onClick={resetChanges} className="flex items-center gap-2">
//               <RotateCcw className="h-4 w-4" />
//               Reset Changes
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default BudgetReviewDetail;



import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, X, RotateCcw, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface BudgetSubmission {
  id: string;
  budgetYear: string;
  headName: string;
  category: 'Income' | 'Expense';
  group: string;
  submittedBy: string;
  submissionDate: string;
  status: 'Draft' | 'Pending' | 'Approved' | 'Rejected';
}

interface MonthlyBudget {
  month: string;
  amount: number;
}

interface BudgetReviewDetailProps {
  submission: BudgetSubmission;
  onBack: () => void;
}

const BudgetReviewDetail = ({ submission, onBack }: BudgetReviewDetailProps) => {
  const [auditedTotal2024] = useState(663.41);
  const [actualJanJun2025] = useState(325.15);

  const [monthlyData] = useState<MonthlyBudget[]>([
    { month: 'Jul 2025', amount: 45.20 },
    { month: 'Aug 2025', amount: 48.50 },
    { month: 'Sep 2025', amount: 52.10 },
    { month: 'Oct 2025', amount: 49.80 },
    { month: 'Nov 2025', amount: 51.30 },
    { month: 'Dec 2025', amount: 53.60 },
    { month: 'Jan 2026', amount: 55.40 },
    { month: 'Feb 2026', amount: 57.20 },
    { month: 'Mar 2026', amount: 59.10 },
    { month: 'Apr 2026', amount: 61.30 },
    { month: 'May 2026', amount: 63.50 },
    { month: 'Jun 2026', amount: 65.80 },
    { month: 'Jul 2026', amount: 68.20 },
    { month: 'Aug 2026', amount: 70.40 },
    { month: 'Sep 2026', amount: 72.60 },
    { month: 'Oct 2026', amount: 74.90 },
    { month: 'Nov 2026', amount: 77.10 },
    { month: 'Dec 2026', amount: 79.30 }
  ]);

  const [reviewData, setReviewData] = useState<MonthlyBudget[]>(monthlyData.map(item => ({ ...item })));
  const [submitterRemarks] = useState("Projected growth based on market expansion and new product launches. Conservative estimates considering current economic conditions.");
  const [reviewerComment, setReviewerComment] = useState('');

  const updateReviewAmount = (index: number, value: string) => {
    const newData = [...reviewData];
    newData[index].amount = parseFloat(value) || 0;
    setReviewData(newData);
  };

  const resetChanges = () => {
    setReviewData(monthlyData.map(item => ({ ...item })));
    toast.success('Reviewer values reset to BU input');
  };

  const handleApprove = () => {
    toast.success('Budget approved successfully');
    onBack();
  };

  const handleSendBack = () => {
    if (!reviewerComment.trim()) {
      toast.error('Please provide a comment for revision');
      return;
    }
    toast.success('Budget sent back for revision');
    onBack();
  };

  const handleReject = () => {
    if (!reviewerComment.trim()) {
      toast.error('Comment is mandatory for rejection');
      return;
    }
    toast.success('Budget rejected');
    onBack();
  };

  const buJulDec2025Total = monthlyData.slice(0, 6).reduce((sum, item) => sum + item.amount, 0);
  const reviewerJulDec2025Total = reviewData.slice(0, 6).reduce((sum, item) => sum + item.amount, 0);
  const reviewerJanDec2026Total = reviewData.slice(6).reduce((sum, item) => sum + item.amount, 0);

  const deviation2025vs2024 = ((reviewerJulDec2025Total + actualJanJun2025 - auditedTotal2024) / auditedTotal2024) * 100;
  const deviation2026vs2025 = ((reviewerJanDec2026Total - (reviewerJulDec2025Total + actualJanJun2025)) / (reviewerJulDec2025Total + actualJanJun2025)) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to List
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budget Review & Adjustment</h1>
          <p className="text-muted-foreground">Review and adjust budget details</p>
        </div>
      </div>

      {/* Deviation Analysis (Moved up) */}
      <Card>
        <CardHeader><CardTitle>Deviation Analysis</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-sm font-medium text-muted-foreground">2025 vs 2024 Deviation</span>
              <p className={`text-lg font-bold ${deviation2025vs2024 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {deviation2025vs2024.toFixed(2)}%
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">2026 vs 2025 Deviation</span>
              <p className={`text-lg font-bold ${deviation2026vs2025 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {deviation2026vs2025.toFixed(2)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historical Reference */}
      <Card>
        <CardHeader><CardTitle>Historical Reference</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-sm font-medium text-muted-foreground">2024 Audited Total (Crore TK)</span>
              <p className="text-2xl font-bold">{auditedTotal2024.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Jan-Jun 2025 Actual (Crore TK)</span>
              <p className="text-2xl font-bold">{actualJanJun2025.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Budget Review */}
      <Card>
        <CardHeader><CardTitle>Monthly Budget Review</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Jul–Dec 2025 */}
            <div>
              <h3 className="font-semibold mb-4 text-orange-600">Jul-Dec 2025 Projection</h3>
              <div className="space-y-3">
                {monthlyData.slice(0, 6).map((item, index) => (
                  <div key={item.month} className="grid grid-cols-3 gap-2 items-center">
                    <label className="text-sm font-medium">{item.month}:</label>
                    <Input readOnly value={item.amount} className="text-right bg-muted" />
                    <Input
                      type="number"
                      step="0.01"
                      value={reviewData[index].amount}
                      onChange={(e) => updateReviewAmount(index, e.target.value)}
                      className="text-right"
                    />
                  </div>
                ))}
                <div className="border-t pt-2 flex flex-col gap-1 font-semibold text-sm">
                  <div className="flex justify-between">
                    <span>BU Total (Read-only):</span><span>{buJulDec2025Total.toFixed(2)} Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reviewer Total:</span><span>{reviewerJulDec2025Total.toFixed(2)} Cr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Jan–Dec 2026 */}
            <div>
              <h3 className="font-semibold mb-4 text-blue-600">Jan-Dec 2026 Proposed Budget</h3>
              <div className="space-y-3">
                {monthlyData.slice(6).map((item, index) => (
                  <div key={item.month} className="grid grid-cols-3 gap-2 items-center">
                    <label className="text-sm font-medium">{item.month}:</label>
                    <Input readOnly value={item.amount} className="text-right bg-muted" />
                    <Input
                      type="number"
                      step="0.01"
                      value={reviewData[index + 6].amount}
                      onChange={(e) => updateReviewAmount(index + 6, e.target.value)}
                      className="text-right"
                    />
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Reviewer Total:</span><span>{reviewerJanDec2026Total.toFixed(2)} Cr</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submitter Remarks */}
      <Card>
        <CardHeader><CardTitle>Submitter Remarks</CardTitle></CardHeader>
        <CardContent><div className="bg-muted p-4 rounded-md text-sm">{submitterRemarks}</div></CardContent>
      </Card>

      {/* Reviewer Actions */}
      <Card>
        <CardHeader><CardTitle>Review Actions</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Reviewer Comment</label>
            <Textarea
              placeholder="Add your comments for approval, revision, or rejection..."
              value={reviewerComment}
              onChange={(e) => setReviewerComment(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleApprove} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <Check className="h-4 w-4" />
              Approve Budget
            </Button>
            <Button variant="outline" onClick={handleSendBack} className="flex items-center gap-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50">
              <MessageSquare className="h-4 w-4" />
              Send Back for Revision
            </Button>
            <Button variant="destructive" onClick={handleReject} className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Reject Budget
            </Button>
            <Button variant="outline" onClick={resetChanges} className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetReviewDetail;
