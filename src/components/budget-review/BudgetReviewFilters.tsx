
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Mock data for dropdowns
const fiscalYears = [
  { id: 1, name: '2025' },
  { id: 2, name: '2024' },
  { id: 3, name: '2023' },
];

const heads = [
  { id: 0, name: 'All Heads' },
  { id: 1, name: 'IT Department' },
  { id: 2, name: 'Finance Department' },
  { id: 3, name: 'Marketing Department' },
];

const particulars = {
  0: [{ id: 0, name: 'All Particulars' }],
  1: [
    { id: 0, name: 'All Particulars' },
    { id: 1, name: 'Software Licenses' },
    { id: 2, name: 'Hardware Maintenance' },
  ],
  2: [
    { id: 0, name: 'All Particulars' },
    { id: 3, name: 'Audit Fees' },
    { id: 4, name: 'Consulting Services' },
  ],
  3: [
    { id: 0, name: 'All Particulars' },
    { id: 5, name: 'Advertising' },
    { id: 6, name: 'Events' },
  ],
};

const BudgetReviewFilters = () => {
  const [selectedYear, setSelectedYear] = useState('1');
  const [selectedHead, setSelectedHead] = useState('0');
  const [selectedParticular, setSelectedParticular] = useState('0');

  const handleApplyFilters = () => {
    const yearName = fiscalYears.find(y => y.id.toString() === selectedYear)?.name || '';
    const headName = heads.find(h => h.id.toString() === selectedHead)?.name || '';
    const particularObj = particulars[parseInt(selectedHead)].find(p => p.id.toString() === selectedParticular);
    const particularName = particularObj ? particularObj.name : '';

    toast.success('Filters applied successfully', {
      description: `Year: ${yearName}, Head: ${headName}, Particular: ${particularName}`
    });
    
    console.log('Applied filters:', {
      year: selectedYear,
      head: selectedHead,
      particular: selectedParticular,
    });
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-2">
        <Label htmlFor="fiscal-year">Financial Year</Label>
        <Select onValueChange={setSelectedYear} defaultValue={selectedYear}>
          <SelectTrigger id="fiscal-year" className="w-full">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {fiscalYears.map((year) => (
              <SelectItem key={year.id} value={year.id.toString()}>
                {year.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="head">Head</Label>
        <Select
          onValueChange={(value) => {
            setSelectedHead(value);
            setSelectedParticular('0');
          }}
          defaultValue={selectedHead}
        >
          <SelectTrigger id="head" className="w-full">
            <SelectValue placeholder="Select head" />
          </SelectTrigger>
          <SelectContent>
            {heads.map((head) => (
              <SelectItem key={head.id} value={head.id.toString()}>
                {head.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="particular">Particular</Label>
        <Select onValueChange={setSelectedParticular} defaultValue={selectedParticular}>
          <SelectTrigger id="particular" className="w-full">
            <SelectValue placeholder="Select particular" />
          </SelectTrigger>
          <SelectContent>
            {particulars[parseInt(selectedHead)].map((particular) => (
              <SelectItem key={particular.id} value={particular.id.toString()}>
                {particular.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-end">
        <Button onClick={handleApplyFilters} className="w-full">Apply Filters</Button>
      </div>
    </div>
  );
};

export default BudgetReviewFilters;
