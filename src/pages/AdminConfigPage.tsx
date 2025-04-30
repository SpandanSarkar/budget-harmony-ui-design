
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GLManagement from '@/components/admin/GLManagement';
import CreditLineSetup from '@/components/admin/CreditLineSetup';
import BorrowerSetup from '@/components/admin/BorrowerSetup';
import WorkflowEditor from '@/components/admin/WorkflowEditor';
import WorkflowRules from '@/components/admin/WorkflowRules';
import { Card } from '@/components/ui/card';

const AdminConfigPage = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Admin & Configuration</h1>
        <p className="text-muted-foreground">
          Manage system settings and configurations
        </p>
      </div>

      <Card>
        <Tabs defaultValue="gl" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="gl">GL Management</TabsTrigger>
            <TabsTrigger value="creditLine">Credit Line</TabsTrigger>
            <TabsTrigger value="borrower">Borrower Setup</TabsTrigger>
            <TabsTrigger value="workflow">Approval Workflow</TabsTrigger>
            <TabsTrigger value="rules">Workflow Rules</TabsTrigger>
          </TabsList>
          <TabsContent value="gl">
            <GLManagement />
          </TabsContent>
          <TabsContent value="creditLine">
            <CreditLineSetup />
          </TabsContent>
          <TabsContent value="borrower">
            <BorrowerSetup />
          </TabsContent>
          <TabsContent value="workflow">
            <WorkflowEditor />
          </TabsContent>
          <TabsContent value="rules">
            <WorkflowRules />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AdminConfigPage;
