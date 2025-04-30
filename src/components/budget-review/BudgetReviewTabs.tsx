
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import BudgetReviewTable from './BudgetReviewTable';
import BudgetGLAllocationModal from './BudgetGLAllocationModal';
import { toast } from 'sonner';

const BudgetReviewTabs = () => {
  const [isGLModalOpen, setIsGLModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleGLAllocation = (item) => {
    setSelectedItem(item);
    setIsGLModalOpen(true);
  };

  const handleSaveDraft = () => {
    toast.success('Budget draft saved successfully');
  };

  const handleFinalizeBudget = () => {
    toast.success('Budget finalized successfully');
  };

  return (
    <div>
      <Tabs defaultValue="proposed" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="proposed">Proposed</TabsTrigger>
          <TabsTrigger value="estimate">Estimate (This FY)</TabsTrigger>
          <TabsTrigger value="audited">Audited (Last FY)</TabsTrigger>
          <TabsTrigger value="change">% Change</TabsTrigger>
        </TabsList>
        
        <TabsContent value="proposed">
          <BudgetReviewTable onGLAllocation={handleGLAllocation} view="proposed" />
        </TabsContent>
        
        <TabsContent value="estimate">
          <BudgetReviewTable onGLAllocation={handleGLAllocation} view="estimate" />
        </TabsContent>
        
        <TabsContent value="audited">
          <BudgetReviewTable onGLAllocation={handleGLAllocation} view="audited" />
        </TabsContent>
        
        <TabsContent value="change">
          <BudgetReviewTable onGLAllocation={handleGLAllocation} view="change" />
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-end space-x-2">
        <Button variant="outline" onClick={handleSaveDraft}>Save Draft</Button>
        <Button onClick={handleFinalizeBudget}>Finalize Budget</Button>
      </div>
      
      {isGLModalOpen && (
        <BudgetGLAllocationModal
          open={isGLModalOpen}
          onOpenChange={setIsGLModalOpen}
          item={selectedItem}
        />
      )}
    </div>
  );
};

export default BudgetReviewTabs;
