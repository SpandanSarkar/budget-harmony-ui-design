
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';
import { Input } from '@/components/ui/input';
import { ArrowDown, X } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for the table
const workflowDefinitions = [
  { 
    id: 1, 
    name: 'Budget Extension Approval', 
    steps: [
      { role: 'Finance Manager', threshold: 'Any Amount' },
      { role: 'CFO', threshold: 'Any Amount' },
      { role: 'Board', threshold: '> $10,000' }
    ]
  },
  { 
    id: 2, 
    name: 'Budget Transfer Approval', 
    steps: [
      { role: 'Finance Manager', threshold: 'Any Amount' },
      { role: 'CFO', threshold: '> $5,000' }
    ]
  },
];

const roles = ['Finance Manager', 'CFO', 'CEO', 'Board', 'System Admin'];
const thresholds = ['Any Amount', '> $1,000', '> $5,000', '> $10,000', '> $50,000', '> $100,000'];

const WorkflowEditor = () => {
  const [workflows, setWorkflows] = useState(workflowDefinitions);
  const [newWorkflowName, setNewWorkflowName] = useState('');
  const [newWorkflowSteps, setNewWorkflowSteps] = useState([
    { role: '', threshold: '' }
  ]);
  
  const addStep = () => {
    setNewWorkflowSteps([...newWorkflowSteps, { role: '', threshold: '' }]);
  };
  
  const removeStep = (index) => {
    const updatedSteps = [...newWorkflowSteps];
    updatedSteps.splice(index, 1);
    setNewWorkflowSteps(updatedSteps);
  };
  
  const updateStep = (index, field, value) => {
    const updatedSteps = [...newWorkflowSteps];
    updatedSteps[index][field] = value;
    setNewWorkflowSteps(updatedSteps);
  };
  
  const handleAddWorkflow = () => {
    if (!newWorkflowName || newWorkflowSteps.some(step => !step.role || !step.threshold)) {
      toast.error('Workflow name and all step fields are required');
      return;
    }
    
    const newWorkflow = {
      id: Math.max(...workflows.map(w => w.id)) + 1,
      name: newWorkflowName,
      steps: [...newWorkflowSteps]
    };
    
    setWorkflows([...workflows, newWorkflow]);
    setNewWorkflowName('');
    setNewWorkflowSteps([{ role: '', threshold: '' }]);
    toast.success('Workflow added successfully');
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Create New Approval Workflow</h3>
        
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Workflow Name"
              value={newWorkflowName}
              onChange={(e) => setNewWorkflowName(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Approval Steps</h4>
            
            {newWorkflowSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1 max-w-xs">
                  <Select
                    onValueChange={(value) => updateStep(index, 'role', value)}
                    value={step.role}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1 max-w-xs">
                  <Select
                    onValueChange={(value) => updateStep(index, 'threshold', value)}
                    value={step.threshold}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      {thresholds.map(threshold => (
                        <SelectItem key={threshold} value={threshold}>{threshold}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeStep(index)}
                  disabled={newWorkflowSteps.length <= 1}
                  className="p-0 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
                
                {index < newWorkflowSteps.length - 1 && (
                  <ArrowDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
            ))}
            
            <div className="mt-2 flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={addStep}>
                Add Step
              </Button>
              <Button onClick={handleAddWorkflow}>
                Save Workflow
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Existing Workflows</h3>
        
        {workflows.map((workflow) => (
          <div key={workflow.id} className="border rounded-md p-4">
            <h4 className="text-md font-medium mb-2">{workflow.name}</h4>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">Step</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Threshold</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workflow.steps.map((step, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{step.role}</TableCell>
                      <TableCell>{step.threshold}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowEditor;
