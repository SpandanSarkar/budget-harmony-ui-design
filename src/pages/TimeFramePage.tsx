
import React, { useState } from 'react';
import TimeFrameForm from '@/components/budget-timeframe/TimeFrameForm';
import TimeFrameTable from '@/components/budget-timeframe/TimeFrameTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

// Mock data
const MOCK_TIME_FRAMES = [
  {
    id: '1',
    financialYear: '2023-2024',
    startDate: new Date(2023, 3, 1), // April 1, 2023
    endDate: new Date(2024, 2, 31), // March 31, 2024
    status: 'active' as const,
  },
  {
    id: '2',
    financialYear: '2022-2023',
    startDate: new Date(2022, 3, 1),
    endDate: new Date(2023, 2, 31),
    status: 'closed' as const,
  },
];

const TimeFramePage = () => {
  const [timeFrames, setTimeFrames] = useState(MOCK_TIME_FRAMES);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (data: any) => {
    if (editingId) {
      // Update existing time frame
      setTimeFrames(timeFrames.map(tf => 
        tf.id === editingId ? { ...tf, ...data } : tf
      ));
      toast.success("Budget time frame updated");
      setEditingId(null);
    } else {
      // Create new time frame
      const newTimeFrame = {
        id: Date.now().toString(),
        ...data,
      };
      setTimeFrames([...timeFrames, newTimeFrame]);
      toast.success("Budget time frame created");
    }
  };

  const handleEdit = (id: string) => {
    const timeFrame = timeFrames.find(tf => tf.id === id);
    if (timeFrame) {
      setEditingId(id);
    }
  };

  const handleDeactivate = (id: string) => {
    setTimeFrames(timeFrames.filter(tf => tf.id !== id));
    toast.success("Budget time frame removed");
  };

  const editingTimeFrame = editingId 
    ? timeFrames.find(tf => tf.id === editingId) 
    : undefined;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Budget Time Frame Setup</h1>
        <p className="text-muted-foreground">Define and manage budget years.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Time Frame' : 'Create New Time Frame'}</CardTitle>
            <CardDescription>
              {editingId 
                ? 'Update the selected budget time frame' 
                : 'Define a new budget time frame'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TimeFrameForm 
              onSubmit={handleSubmit} 
              initialData={editingTimeFrame}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Time Frames</CardTitle>
            <CardDescription>Manage existing budget time frames</CardDescription>
          </CardHeader>
          <CardContent>
            <TimeFrameTable 
              data={timeFrames} 
              onEdit={handleEdit} 
              onDeactivate={handleDeactivate} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimeFramePage;
