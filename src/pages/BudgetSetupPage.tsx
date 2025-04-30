
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import HeadsForm from '@/components/budget-setup/HeadsForm';
import HeadsTable from '@/components/budget-setup/HeadsTable';
import ParticularsForm from '@/components/budget-setup/ParticularsForm';
import ParticularsTable from '@/components/budget-setup/ParticularsTable';
import { toast } from 'sonner';

// Mock data
const MOCK_HEADS = [
  {
    id: '1',
    headName: 'Operations',
    type: 'department' as const,
    status: 'active' as const,
  },
  {
    id: '2',
    headName: 'Marketing',
    type: 'department' as const,
    status: 'active' as const,
  },
  {
    id: '3',
    headName: 'IT Projects',
    type: 'program' as const,
    status: 'active' as const,
  },
];

const MOCK_PARTICULARS = [
  {
    id: '1',
    particularName: 'Salaries',
    headId: '1',
    headName: 'Operations',
    fsTag: 'p&l' as const,
  },
  {
    id: '2',
    particularName: 'Office Rent',
    headId: '1',
    headName: 'Operations',
    fsTag: 'p&l' as const,
  },
  {
    id: '3',
    particularName: 'Ad Campaigns',
    headId: '2',
    headName: 'Marketing',
    fsTag: 'p&l' as const,
  },
];

const BudgetSetupPage = () => {
  const [heads, setHeads] = useState(MOCK_HEADS);
  const [particulars, setParticulars] = useState(MOCK_PARTICULARS);
  const [editingHeadId, setEditingHeadId] = useState<string | null>(null);
  const [editingParticularId, setEditingParticularId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('heads');

  const handleHeadSubmit = (data: any) => {
    if (editingHeadId) {
      // Update existing head
      setHeads(heads.map(h => 
        h.id === editingHeadId ? { ...h, ...data } : h
      ));
      toast.success("Budget head updated");
      setEditingHeadId(null);
    } else {
      // Create new head
      const newHead = {
        id: Date.now().toString(),
        ...data,
      };
      setHeads([...heads, newHead]);
      toast.success("Budget head created");
    }
  };

  const handleParticularSubmit = (data: any) => {
    const headName = heads.find(h => h.id === data.headId)?.headName || '';
    
    if (editingParticularId) {
      // Update existing particular
      setParticulars(particulars.map(p => 
        p.id === editingParticularId ? { ...p, ...data, headName } : p
      ));
      toast.success("Particular updated");
      setEditingParticularId(null);
    } else {
      // Create new particular
      const newParticular = {
        id: Date.now().toString(),
        ...data,
        headName,
      };
      setParticulars([...particulars, newParticular]);
      toast.success("Particular created");
    }
  };

  const handleEditHead = (id: string) => {
    const head = heads.find(h => h.id === id);
    if (head) {
      setEditingHeadId(id);
      setActiveTab('heads');
    }
  };

  const handleDeleteHead = (id: string) => {
    setHeads(heads.filter(h => h.id !== id));
    // Also delete all particulars linked to this head
    setParticulars(particulars.filter(p => p.headId !== id));
    toast.success("Budget head and linked particulars removed");
  };

  const handleEditParticular = (id: string) => {
    const particular = particulars.find(p => p.id === id);
    if (particular) {
      setEditingParticularId(id);
      setActiveTab('particulars');
    }
  };

  const handleDeleteParticular = (id: string) => {
    setParticulars(particulars.filter(p => p.id !== id));
    toast.success("Particular removed");
  };

  const editingHead = editingHeadId 
    ? heads.find(h => h.id === editingHeadId) 
    : undefined;

  const editingParticular = editingParticularId 
    ? particulars.find(p => p.id === editingParticularId) 
    : undefined;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Budget Head & Particular Setup</h1>
        <p className="text-muted-foreground">Configure budget structures and categories.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="heads">Heads Management</TabsTrigger>
          <TabsTrigger value="particulars">Particulars Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="heads" className="pt-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{editingHeadId ? 'Edit Head' : 'Create Head'}</CardTitle>
                <CardDescription>
                  {editingHeadId 
                    ? 'Update the selected budget head' 
                    : 'Define a new budget head'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HeadsForm 
                  onSubmit={handleHeadSubmit}
                  initialData={editingHead}
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Budget Heads</CardTitle>
                <CardDescription>Manage your budget heads</CardDescription>
              </CardHeader>
              <CardContent>
                <HeadsTable 
                  data={heads} 
                  onEdit={handleEditHead} 
                  onDelete={handleDeleteHead}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="particulars" className="pt-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{editingParticularId ? 'Edit Particular' : 'Add Particular'}</CardTitle>
                <CardDescription>
                  {editingParticularId 
                    ? 'Update the selected budget particular' 
                    : 'Define a new budget particular'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ParticularsForm 
                  onSubmit={handleParticularSubmit}
                  initialData={editingParticular}
                  heads={heads.filter(h => h.status === 'active')}
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Budget Particulars</CardTitle>
                <CardDescription>Manage your budget particulars</CardDescription>
              </CardHeader>
              <CardContent>
                <ParticularsTable 
                  data={particulars} 
                  onEdit={handleEditParticular} 
                  onDelete={handleDeleteParticular}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetSetupPage;
