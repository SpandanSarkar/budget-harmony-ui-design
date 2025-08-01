import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

const expenseGroups = [
  'Admin', 'HR', 'IT', 'PR/Media Events', 'Company Secretary', 
  'BUs', 'Corporate Advisory', 'Legal & SAM', 'Depreciation', 'F&A'
];

const [files, setFiles] = useState<File[]>([]);

// Correct month-year combination
const months = [
  { month: 'July', year: '2025' },
  { month: 'August', year: '2025' },
  { month: 'September', year: '2025' },
  { month: 'October', year: '2025' },
  { month: 'November', year: '2025' },
  { month: 'December', year: '2025' },
  { month: 'January', year: '2026' },
  { month: 'February', year: '2026' },
  { month: 'March', year: '2026' },
  { month: 'April', year: '2026' },
  { month: 'May', year: '2026' },
  { month: 'June', year: '2026' },
  { month: 'July', year: '2026' },
  { month: 'August', year: '2026' },
  { month: 'September', year: '2026' },
  { month: 'October', year: '2026' },
  { month: 'November', year: '2026' },
  { month: 'December', year: '2026' },
];

const mockExpenseHeads = [
  {
    id: 1,
    name: 'Office Supplies',
    group: 'Admin',
    audited2024: 125000,
    actual2025H1: 62500,
    // dimensionTemplate: ['Unit', 'Quantity', 'CAPEX/OPEX']
    dimensionTemplate: ['Quantity', 'CAPEX/OPEX']
  },
  {
    id: 2,
    name: 'Training & Development',
    group: 'HR',
    audited2024: 85000,
    actual2025H1: 42000,
    dimensionTemplate: ['Designation', 'No. of Events', 'Cost per Head']
  },
  {
    id: 3,
    name: 'Software Licenses',
    group: 'IT',
    audited2024: 250000,
    actual2025H1: 125000,
    // dimensionTemplate: ['Unit', 'Quantity']
    dimensionTemplate: ['Quantity']
  }
];

const ExpenseBudgetEntry = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [budgetData, setBudgetData] = useState<Record<string, any>>({});

  const filteredHeads = selectedGroup 
    ? mockExpenseHeads.filter(head => head.group === selectedGroup)
    : [];

  const handleCellChange = (headId: number, field: string, value: string) => {
    setBudgetData(prev => ({
      ...prev,
      [headId]: {
        ...prev[headId],
        [field]: value
      }
    }));
  };

  const calculateTotal = (headId: number): number => {
    const data = budgetData[headId];
    if (!data) return 0;

    return months.reduce((sum, { month, year }) => {
      const key = `${month}-${year}`;
      return sum + parseFloat(data[key] || 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filter Options</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year">Financial Year</Label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2026">2026</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="group">Expense Group</Label>
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Select expense group" />
              </SelectTrigger>
              <SelectContent>
                {expenseGroups.map(group => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {selectedGroup && (
        <Card>
          <CardHeader>
            <CardTitle>Expense Budget Entry - {selectedGroup}</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expense Head</TableHead>
                  <TableHead className="text-right">2024 Audited Total</TableHead>
                  <TableHead className="text-right">Jan-Jun 2025 Actual</TableHead>
                  {months.map(({ month, year }) => (
                    <TableHead key={`${month}-${year}`} className="text-right">
                      {month} {year}
                    </TableHead>
                  ))}
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Sub Fields</TableHead>
                  <TableHead>Remarks</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHeads.map(head => {
                  const headData = budgetData[head.id] || {};
                  const total = calculateTotal(head.id);
                  return (
                    <TableRow key={head.id}>
                      <TableCell className="font-medium">{head.name}</TableCell>
                      <TableCell className="text-right">${head.audited2024.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${head.actual2025H1.toLocaleString()}</TableCell>
                      {months.map(({ month, year }) => {
                        const key = `${month}-${year}`;
                        return (
                          <TableCell key={key}>
                            <Input
                              type="number"
                              value={headData[key] || ''}
                              onChange={e => handleCellChange(head.id, key, e.target.value)}
                              className="w-24 text-xs"
                            />
                          </TableCell>
                        );
                      })}
                      <TableCell className="text-right">${total.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {head.dimensionTemplate.map(dim => (
                            <Input
                              key={dim}
                              placeholder={dim}
                              value={headData[`dim_${dim}`] || ''}
                              onChange={e => handleCellChange(head.id, `dim_${dim}`, e.target.value)}
                              className="w-24 text-xs"
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Textarea
                          placeholder="Remarks"
                          value={headData.remarks || ''}
                          onChange={e => handleCellChange(head.id, 'remarks', e.target.value)}
                          className="w-32 h-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Draft</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">Save Draft</Button>
              <Button>Submit for Approval</Button>
            </div> */}
            {/* Supporting Document Upload */}
            <div className="mt-6 border p-4 rounded-md space-y-2">
              <Label className="block text-sm font-medium">Supporting Documents</Label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(Array.from(e.target.files || []))}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4
                    file:rounded file:border-0
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                <p className="text-sm text-muted-foreground">
                  PDF, XLS, DOC formats supported
                </p>
              </div>
              {files.length > 0 && (
                <ul className="text-sm list-disc list-inside text-muted-foreground">
                  {files.map((file, i) => (
                    <li key={i}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">Save Draft</Button>
              <Button>Submit for Approval</Button>
            </div>


          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExpenseBudgetEntry;
