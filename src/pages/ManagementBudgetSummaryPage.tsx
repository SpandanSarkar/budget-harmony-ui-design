import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, FileText, Search } from 'lucide-react';

// Mock data for the budget summary
const mockBudgetData = [
  {
    id: 1,
    particulars: 'Interest Income',
    type: 'Income',
    category: 'Revenue',
    fy2025: 1069.86,
    fy2024: 806.69,
    fy2023: 663.41,
  },
  {
    id: 2,
    particulars: 'Investment Income',
    type: 'Income',
    category: 'Revenue',
    fy2025: 23.59,
    fy2024: 16.26,
    fy2023: 3.27,
  },
  {
    id: 3,
    particulars: 'Fee & Commission Income',
    type: 'Income',
    category: 'Revenue',
    fy2025: 145.32,
    fy2024: 132.18,
    fy2023: 118.94,
  },
  {
    id: 4,
    particulars: 'Other Operating Income',
    type: 'Income',
    category: 'Revenue',
    fy2025: 28.75,
    fy2024: 22.14,
    fy2023: 19.87,
  },
  {
    id: 5,
    particulars: 'Less: Interest Expenses',
    type: 'Expense',
    category: 'Interest Expense',
    fy2025: 411.99,
    fy2024: 350.27,
    fy2023: 247.30,
  },
  {
    id: 6,
    particulars: 'Administrative Expenses',
    type: 'Expense',
    category: 'Operating Expenses',
    fy2025: 41.15,
    fy2024: 38.32,
    fy2023: 32.97,
  },
  {
    id: 7,
    particulars: 'Personnel Expenses',
    type: 'Expense',
    category: 'Operating Expenses',
    fy2025: 285.47,
    fy2024: 262.31,
    fy2023: 241.85,
  },
  {
    id: 8,
    particulars: 'Depreciation',
    type: 'Expense',
    category: 'Operating Expenses',
    fy2025: 15.82,
    fy2024: 14.25,
    fy2023: 12.93,
  },
];

const ManagementBudgetSummaryPage = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedHeadType, setSelectedHeadType] = useState('All');
  const [selectedGroupBy, setSelectedGroupBy] = useState('None');
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate differences
  const calculateDifference = (current: number, previous: number) => {
    const diff = current - previous;
    const percentage = previous !== 0 ? ((diff / previous) * 100) : 0;
    return { diff, percentage };
  };

  // Format number with comma separator
  const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-IN', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  // Format percentage
  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  // Filter data based on selections
  const filteredData = mockBudgetData.filter(item => {
    const matchesHeadType = selectedHeadType === 'All' || item.type === selectedHeadType;
    const matchesSearch = item.particulars.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesHeadType && matchesSearch;
  });

  // Group data if needed
  const groupedData = selectedGroupBy !== 'None' 
    ? filteredData.reduce((acc, item) => {
        const key = selectedGroupBy === 'Category' ? item.category : item.type;
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
      }, {} as Record<string, typeof filteredData>)
    : null;

  const handleExportExcel = () => {
    // Mock export functionality
    console.log('Exporting to Excel...');
  };

  const handleExportPDF = () => {
    // Mock export functionality
    console.log('Exporting to PDF...');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Management Budget Summary</h1>
      </div>

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="financial-year">Financial Year</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">FY 2025</SelectItem>
                  <SelectItem value="2024">FY 2024</SelectItem>
                  <SelectItem value="2023">FY 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="head-type">Head Type</Label>
              <Select value={selectedHeadType} onValueChange={setSelectedHeadType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Income">Income</SelectItem>
                  <SelectItem value="Expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="group-by">Group By</Label>
              <Select value={selectedGroupBy} onValueChange={setSelectedGroupBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grouping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Category">Category</SelectItem>
                  <SelectItem value="Subcategory">Subcategory</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="search">Search Head Name</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search particulars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportExcel}>
              <Download className="mr-2 h-4 w-4" />
              Export to Excel
            </Button>
            <Button variant="outline" onClick={handleExportPDF}>
              <FileText className="mr-2 h-4 w-4" />
              Export to PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Report Table */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Summary Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Particulars</TableHead>
                  <TableHead className="text-right">Annual Budget FY 2025 (Crore Tk.)</TableHead>
                  <TableHead className="text-right">Estimate FY 2024 (Crore Tk.)</TableHead>
                  <TableHead className="text-right">Audited FY 2023 (Crore Tk.)</TableHead>
                  <TableHead className="text-right">FY25 vs FY23 Diff (Tk.)</TableHead>
                  <TableHead className="text-right">FY25 vs FY23 Diff (%)</TableHead>
                  <TableHead className="text-right">FY25 vs FY24 Diff (Tk.)</TableHead>
                  <TableHead className="text-right">FY25 vs FY24 Diff (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupedData ? (
                  Object.entries(groupedData).map(([groupName, groupItems]) => (
                    <>
                      <TableRow key={`group-${groupName}`} className="bg-muted/50">
                        <TableCell colSpan={8} className="font-semibold">
                          {groupName}
                        </TableCell>
                      </TableRow>
                      {groupItems.map((item) => {
                        const diff2523 = calculateDifference(item.fy2025, item.fy2023);
                        const diff2524 = calculateDifference(item.fy2025, item.fy2024);
                        
                        return (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium pl-8">{item.particulars}</TableCell>
                            <TableCell className="text-right font-mono">{formatAmount(item.fy2025)}</TableCell>
                            <TableCell className="text-right font-mono">{formatAmount(item.fy2024)}</TableCell>
                            <TableCell className="text-right font-mono">{formatAmount(item.fy2023)}</TableCell>
                            <TableCell className={`text-right font-mono ${diff2523.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatAmount(Math.abs(diff2523.diff))}
                            </TableCell>
                            <TableCell className={`text-right font-mono ${diff2523.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatPercentage(diff2523.percentage)}
                            </TableCell>
                            <TableCell className={`text-right font-mono ${diff2524.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatAmount(Math.abs(diff2524.diff))}
                            </TableCell>
                            <TableCell className={`text-right font-mono ${diff2524.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatPercentage(diff2524.percentage)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </>
                  ))
                ) : (
                  filteredData.map((item) => {
                    const diff2523 = calculateDifference(item.fy2025, item.fy2023);
                    const diff2524 = calculateDifference(item.fy2025, item.fy2024);
                    
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.particulars}</TableCell>
                        <TableCell className="text-right font-mono">{formatAmount(item.fy2025)}</TableCell>
                        <TableCell className="text-right font-mono">{formatAmount(item.fy2024)}</TableCell>
                        <TableCell className="text-right font-mono">{formatAmount(item.fy2023)}</TableCell>
                        <TableCell className={`text-right font-mono ${diff2523.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatAmount(Math.abs(diff2523.diff))}
                        </TableCell>
                        <TableCell className={`text-right font-mono ${diff2523.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatPercentage(diff2523.percentage)}
                        </TableCell>
                        <TableCell className={`text-right font-mono ${diff2524.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatAmount(Math.abs(diff2524.diff))}
                        </TableCell>
                        <TableCell className={`text-right font-mono ${diff2524.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatPercentage(diff2524.percentage)}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagementBudgetSummaryPage;