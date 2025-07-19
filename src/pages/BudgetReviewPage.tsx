
import React, { useState } from 'react';
import BudgetSubmissionList from '@/components/budget-review/BudgetSubmissionList';
import BudgetReviewDetail from '@/components/budget-review/BudgetReviewDetail';

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

const BudgetReviewPage = () => {
  const [selectedSubmission, setSelectedSubmission] = useState<BudgetSubmission | null>(null);

  const handleReviewSubmission = (submission: BudgetSubmission) => {
    setSelectedSubmission(submission);
  };

  const handleBackToList = () => {
    setSelectedSubmission(null);
  };

  if (selectedSubmission) {
    return (
      <BudgetReviewDetail 
        submission={selectedSubmission} 
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Budget Review & Adjustment</h1>
        <p className="text-muted-foreground">
          Review and approve submitted budgets from business units
        </p>
      </div>

      <BudgetSubmissionList onReviewSubmission={handleReviewSubmission} />
    </div>
  );
};

export default BudgetReviewPage;
