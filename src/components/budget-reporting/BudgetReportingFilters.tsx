
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

const reportTypes = [
  { id: 1, name: 'Estimate vs Audited' },
  { id: 2, name: 'GL Summary' },
  { id: 3, name: 'Year over Year Comparison' },
];

const BudgetReportingFilters = () => {
  const [selectedYear, setSelectedYear] = useState('1');
  const [selectedHead, setSelectedHead] = useState('0');
  const [selectedReportType, setSelectedReportType] = useState('1');

  const handleApplyFilters = () => {
    const yearName = fiscalYears.find(y => y.id.toString() === selectedYear)?.name || '';
    const headName = heads.find(h => h.id.toString() === selectedHead)?.name || '';
    const reportTypeName = reportTypes.find(r => r.id.toString() === selectedReportType)?.name || '';
    
    console.log('Applied report filters:', {
      year: selectedYear,
      head: selectedHead,
      reportType: selectedReportType,
    });
    
    toast.success('Report filters applied', {
      description: `Year: ${yearName}, Head: ${headName}, Report Type: ${reportTypeName}`
    });
  };

  const handleExportPDF = () => {
    toast.success('Exporting report as PDF');
  };

  const handleExportExcel = () => {
    toast.success('Exporting report as Excel');
  };

  const handlePrint = () => {
    toast.success('Preparing report for print');
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="fiscal-year">Financial Year</Label>
          <Select onValueChange={setSelectedYear} defaultValue={selectedYear}>
            <SelectTrigger id="fiscal-year" className="w-full bg-white">
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
          <Label htmlFor="head">Head / Particular</Label>
          <Select onValueChange={setSelectedHead} defaultValue={selectedHead}>
            <SelectTrigger id="head" className="w-full bg-white">
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
          <Label htmlFor="report-type">Report Type</Label>
          <Select onValueChange={setSelectedReportType} defaultValue={selectedReportType}>
            <SelectTrigger id="report-type" className="w-full bg-white">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <Button onClick={handleApplyFilters}>
          Apply Filters
        </Button>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportPDF}>
            Export PDF
          </Button>
          <Button variant="outline" onClick={handleExportExcel}>
            Export Excel
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            Print
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BudgetReportingFilters;
