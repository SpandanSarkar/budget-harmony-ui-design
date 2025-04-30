
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Mock data for the table
const rules = [
  { 
    id: 1, 
    name: 'Budget Extension Limit Rule', 
    description: 'Limits budget extensions to 20% of original budget',
    rule: 'IF requestedAmount > (originalAmount * 0.2) THEN requireBoardApproval',
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'GL Allocation Validation', 
    description: 'Ensures GL allocations total exactly 100%',
    rule: 'IF SUM(allocations.percentage) != 100 THEN showError("Total allocation must equal 100%")',
    status: 'Active'
  },
  { 
    id: 3, 
    name: 'Fiscal Year Validation', 
    description: 'Ensures budget entries are within the active fiscal year',
    rule: 'IF transactionDate < fiscalYearStart OR transactionDate > fiscalYearEnd THEN rejectTransaction',
    status: 'Inactive'
  },
];

const WorkflowRules = () => {
  const [allRules, setAllRules] = useState(rules);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleDesc, setNewRuleDesc] = useState('');
  const [newRuleText, setNewRuleText] = useState('');
  
  const handleAddRule = () => {
    if (!newRuleName || !newRuleDesc || !newRuleText) {
      toast.error('All fields are required');
      return;
    }
    
    const newRule = {
      id: Math.max(...allRules.map(r => r.id)) + 1,
      name: newRuleName,
      description: newRuleDesc,
      rule: newRuleText,
      status: 'Active'
    };
    
    setAllRules([...allRules, newRule]);
    setNewRuleName('');
    setNewRuleDesc('');
    setNewRuleText('');
    toast.success('Rule added successfully');
  };
  
  const toggleRuleStatus = (id: number) => {
    setAllRules(allRules.map(rule => 
      rule.id === id 
        ? { ...rule, status: rule.status === 'Active' ? 'Inactive' : 'Active' } 
        : rule
    ));
    toast.success('Rule status updated');
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Add New Workflow Rule</h3>
        
        <div className="space-y-3">
          <div>
            <Input
              placeholder="Rule Name"
              value={newRuleName}
              onChange={(e) => setNewRuleName(e.target.value)}
            />
          </div>
          
          <div>
            <Input
              placeholder="Rule Description"
              value={newRuleDesc}
              onChange={(e) => setNewRuleDesc(e.target.value)}
            />
          </div>
          
          <div>
            <Textarea
              placeholder="Rule Expression (IF ... THEN ...)"
              value={newRuleText}
              onChange={(e) => setNewRuleText(e.target.value)}
              rows={5}
            />
          </div>
          
          <div>
            <Button onClick={handleAddRule}>Add Rule</Button>
          </div>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rule Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Rule Definition</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allRules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium">{rule.name}</TableCell>
                <TableCell>{rule.description}</TableCell>
                <TableCell className="font-mono text-xs max-w-[300px] truncate" title={rule.rule}>
                  {rule.rule}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={rule.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                  >
                    {rule.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toggleRuleStatus(rule.id)}
                  >
                    {rule.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WorkflowRules;
