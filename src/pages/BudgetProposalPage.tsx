
// import React from 'react';
// import BudgetProposalForm from '@/components/budget-proposal/BudgetProposalForm';
// import BudgetProposalTable from '@/components/budget-proposal/BudgetProposalTable';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// const BudgetProposalPage = () => {
//   return (
//     <div className="space-y-8">
//       <div className="space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">Budget Proposal Submission</h1>
//         <p className="text-muted-foreground">
//           Submit budget proposals for your business unit
//         </p>
//       </div>

//       <div className="grid gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Create New Proposal</CardTitle>
//             <CardDescription>Fill in the details to submit a new budget proposal</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <BudgetProposalForm />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Submitted Proposals</CardTitle>
//             <CardDescription>View and manage your submitted budget proposals</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <BudgetProposalTable />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default BudgetProposalPage;


import React, { useState } from 'react';
import BudgetProposalForm from '@/components/budget-proposal/BudgetProposalForm';
import BudgetProposalTable from '@/components/budget-proposal/BudgetProposalTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BudgetProposalPage = () => {
  const [proposals, setProposals] = useState<any[]>([]);

  const handleNewProposal = (proposalData: any) => {
    setProposals((prev) => [...prev, proposalData]);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Budget Proposal Submission</h1>
        <p className="text-muted-foreground">
          Submit budget proposals for your business unit
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Proposal</CardTitle>
            <CardDescription>Fill in the details to submit a new budget proposal</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetProposalForm onSubmitSuccess={handleNewProposal} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submitted Proposals</CardTitle>
            <CardDescription>View and manage your submitted budget proposals</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetProposalTable proposals={proposals} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetProposalPage;

