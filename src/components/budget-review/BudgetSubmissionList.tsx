import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Eye } from 'lucide-react';

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

interface BudgetSubmissionListProps {
  onReviewSubmission: (submission: BudgetSubmission) => void;
}

const BudgetSubmissionList = ({ onReviewSubmission }: BudgetSubmissionListProps) => {
  const [budgetYear, setBudgetYear] = useState('2026');
  const [status, setStatus] = useState('All');
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual data
  const submissions: BudgetSubmission[] = [
    {
      id: '1',
      budgetYear: '2026',
      headName: 'Interest Income',
      category: 'Income',
      group: 'Operating Income',
      submittedBy: 'John Doe',
      submissionDate: '2024-12-15',
      status: 'Pending'
    },
    {
      id: '2',
      budgetYear: '2026',
      headName: 'Administrative Expenses',
      category: 'Expense',
      group: 'Operating Expenses',
      submittedBy: 'Jane Smith',
      submissionDate: '2024-12-14',
      status: 'Draft'
    },
    {
      id: '3',
      budgetYear: '2026',
      headName: 'Investment Income',
      category: 'Income',
      group: 'Non-Operating Income',
      submittedBy: 'Mike Johnson',
      submissionDate: '2024-12-13',
      status: 'Approved'
    },
    {
      id: '4',
      budgetYear: '2026',
      headName: 'Marketing Expenses',
      category: 'Expense',
      group: 'Operating Expenses',
      submittedBy: 'Sarah Wilson',
      submissionDate: '2024-12-12',
      status: 'Rejected'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      Draft: 'secondary',
      Pending: 'default',
      Approved: 'default',
      Rejected: 'destructive'
    } as const;

    const colors = {
      Draft: 'bg-gray-100 text-gray-700',
      Pending: 'bg-yellow-100 text-yellow-700',
      Approved: 'bg-green-100 text-green-700',
      Rejected: 'bg-red-100 text-red-700'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]} className={colors[status as keyof typeof colors]}>
        {status}
      </Badge>
    );
  };

  const filteredSubmissions = submissions.filter(submission => {
    const matchesYear = budgetYear === 'All' || submission.budgetYear === budgetYear;
    const matchesStatus = status === 'All' || submission.status === status;
    const matchesCategory = category === 'All' || submission.category === category;
    const matchesSearch = submission.headName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesYear && matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Submissions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Budget Year</label>
            <Select value={budgetYear} onValueChange={setBudgetYear}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Years</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Search Head Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by head name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Budget Year</TableHead>
                <TableHead>Head Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.budgetYear}</TableCell>
                  <TableCell>{submission.headName}</TableCell>
                  <TableCell>{submission.category}</TableCell>
                  <TableCell>{submission.group}</TableCell>
                  <TableCell>{submission.submittedBy}</TableCell>
                  <TableCell>{new Date(submission.submissionDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onReviewSubmission(submission)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Review & Adjust
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredSubmissions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No budget submissions found matching the current filters.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetSubmissionList;