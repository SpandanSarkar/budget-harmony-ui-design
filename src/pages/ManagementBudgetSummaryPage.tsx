import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Download, FileText, Search, ChevronDown, ChevronRight } from 'lucide-react';

// Mock data for the budget summary with detailed breakdown
const mockBudgetData = [
  // Income items with sub-details
  {
    id: 1,
    particulars: 'Interest Income',
    type: 'Income',
    category: 'Revenue',
    audited2024: 663.41,
    forecast2025: 806.69,
    budget2026: 1069.86,
    hasSubItems: true,
    subItems: [
      {
        id: '1a',
        particulars: 'Interest on Infrastructure Projects',
        audited2024: 320.15,
        forecast2025: 410.25,
        budget2026: 550.30,
      },
      {
        id: '1b',
        particulars: 'Interest Income from Renewable Energy Projects',
        audited2024: 218.75,
        forecast2025: 285.44,
        budget2026: 375.26,
      },
      {
        id: '1c',
        particulars: 'Interest Income from Short Term Investments',
        audited2024: 124.51,
        forecast2025: 111.00,
        budget2026: 144.30,
      },
    ],
  },
  {
    id: 2,
    particulars: 'Investment Income',
    type: 'Income',
    category: 'Revenue',
    audited2024: 3.27,
    forecast2025: 16.26,
    budget2026: 23.59,
    hasSubItems: true,
    subItems: [
      {
        id: '2a',
        particulars: 'Dividend Income',
        audited2024: 1.85,
        forecast2025: 9.15,
        budget2026: 14.25,
      },
      {
        id: '2b',
        particulars: 'Capital Gains',
        audited2024: 1.42,
        forecast2025: 7.11,
        budget2026: 9.34,
      },
    ],
  },
  {
    id: 3,
    particulars: 'Fee & Commission Income',
    type: 'Income',
    category: 'Revenue',
    audited2024: 118.94,
    forecast2025: 132.18,
    budget2026: 145.32,
    hasSubItems: true,
    subItems: [
      {
        id: '3a',
        particulars: 'Advisory Fees',
        audited2024: 68.45,
        forecast2025: 75.26,
        budget2026: 82.15,
      },
      {
        id: '3b',
        particulars: 'Transaction Fees',
        audited2024: 50.49,
        forecast2025: 56.92,
        budget2026: 63.17,
      },
    ],
  },
  {
    id: 4,
    particulars: 'Other Operating Income',
    type: 'Income',
    category: 'Revenue',
    audited2024: 19.87,
    forecast2025: 22.14,
    budget2026: 28.75,
    hasSubItems: false,
  },
  // Expense items with sub-details
  {
    id: 5,
    particulars: 'Less: Interest Expenses',
    type: 'Expense',
    category: 'Interest Expense',
    audited2024: 247.30,
    forecast2025: 350.27,
    budget2026: 411.99,
    hasSubItems: true,
    subItems: [
      {
        id: '5a',
        particulars: 'Interest on Deposits',
        audited2024: 145.25,
        forecast2025: 205.16,
        budget2026: 242.18,
      },
      {
        id: '5b',
        particulars: 'Interest on Borrowings',
        audited2024: 102.05,
        forecast2025: 145.11,
        budget2026: 169.81,
      },
    ],
  },
  {
    id: 6,
    particulars: 'Administrative Expenses',
    type: 'Expense',
    category: 'Operating Expenses',
    audited2024: 32.97,
    forecast2025: 38.32,
    budget2026: 41.15,
    hasSubItems: true,
    subItems: [
      {
        id: '6a',
        particulars: 'Office Rent',
        audited2024: 15.25,
        forecast2025: 17.85,
        budget2026: 19.25,
      },
      {
        id: '6b',
        particulars: 'Utilities',
        audited2024: 8.45,
        forecast2025: 9.75,
        budget2026: 10.35,
      },
      {
        id: '6c',
        particulars: 'Office Supplies',
        audited2024: 9.27,
        forecast2025: 10.72,
        budget2026: 11.55,
      },
    ],
  },
  {
    id: 7,
    particulars: 'Personnel Expenses',
    type: 'Expense',
    category: 'Operating Expenses',
    audited2024: 241.85,
    forecast2025: 262.31,
    budget2026: 285.47,
    hasSubItems: true,
    subItems: [
      {
        id: '7a',
        particulars: 'Salaries & Wages',
        audited2024: 185.25,
        forecast2025: 200.85,
        budget2026: 218.65,
      },
      {
        id: '7b',
        particulars: 'Employee Benefits',
        audited2024: 56.60,
        forecast2025: 61.46,
        budget2026: 66.82,
      },
    ],
  },
  {
    id: 8,
    particulars: 'Depreciation',
    type: 'Expense',
    category: 'Operating Expenses',
    audited2024: 12.93,
    forecast2025: 14.25,
    budget2026: 15.82,
    hasSubItems: false,
  },
  {
    id: 9,
    particulars: 'Provision Expenses',
    type: 'Expense',
    category: 'Provision',
    audited2024: 45.75,
    forecast2025: 52.30,
    budget2026: 58.95,
    hasSubItems: true,
    subItems: [
      {
        id: '9a',
        particulars: 'Loan Loss Provision',
        audited2024: 35.25,
        forecast2025: 40.15,
        budget2026: 45.85,
      },
      {
        id: '9b',
        particulars: 'Other Provisions',
        audited2024: 10.50,
        forecast2025: 12.15,
        budget2026: 13.10,
      },
    ],
  },
  {
    id: 10,
    particulars: 'Tax Expenses',
    type: 'Expense',
    category: 'Tax',
    audited2024: 35.85,
    forecast2025: 42.75,
    budget2026: 48.20,
    hasSubItems: false,
  },
];

const ManagementBudgetSummaryPage = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedHeadType, setSelectedHeadType] = useState('All');
  const [selectedGroupBy, setSelectedGroupBy] = useState('None');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

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

  // Toggle expand/collapse for items with sub-items
  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  // Filter data based on selections
  const filteredData = mockBudgetData.filter(item => {
    const matchesHeadType = selectedHeadType === 'All' || item.type === selectedHeadType;
    const matchesSearch = item.particulars.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesHeadType && matchesSearch;
  });

  // Calculate totals for financial summary
  const calculateTotals = () => {
    const incomeItems = filteredData.filter(item => item.type === 'Income');
    const expenseItems = filteredData.filter(item => item.type === 'Expense');
    const interestExpenseItems = expenseItems.filter(item => item.category === 'Interest Expense');
    const operatingExpenseItems = expenseItems.filter(item => item.category === 'Operating Expenses');
    const provisionItems = expenseItems.filter(item => item.category === 'Provision');
    const taxItems = expenseItems.filter(item => item.category === 'Tax');

    const totals = {
      totalOperatingIncome: {
        audited2024: incomeItems.reduce((sum, item) => sum + item.audited2024, 0),
        forecast2025: incomeItems.reduce((sum, item) => sum + item.forecast2025, 0),
        budget2026: incomeItems.reduce((sum, item) => sum + item.budget2026, 0),
      },
      totalOperatingExpense: {
        audited2024: [...interestExpenseItems, ...operatingExpenseItems].reduce((sum, item) => sum + item.audited2024, 0),
        forecast2025: [...interestExpenseItems, ...operatingExpenseItems].reduce((sum, item) => sum + item.forecast2025, 0),
        budget2026: [...interestExpenseItems, ...operatingExpenseItems].reduce((sum, item) => sum + item.budget2026, 0),
      },
      totalProvision: {
        audited2024: provisionItems.reduce((sum, item) => sum + item.audited2024, 0),
        forecast2025: provisionItems.reduce((sum, item) => sum + item.forecast2025, 0),
        budget2026: provisionItems.reduce((sum, item) => sum + item.budget2026, 0),
      },
      taxExpenses: {
        audited2024: taxItems.reduce((sum, item) => sum + item.audited2024, 0),
        forecast2025: taxItems.reduce((sum, item) => sum + item.forecast2025, 0),
        budget2026: taxItems.reduce((sum, item) => sum + item.budget2026, 0),
      },
    };

    const profitBeforeProvision = {
      audited2024: totals.totalOperatingIncome.audited2024 - totals.totalOperatingExpense.audited2024,
      forecast2025: totals.totalOperatingIncome.forecast2025 - totals.totalOperatingExpense.forecast2025,
      budget2026: totals.totalOperatingIncome.budget2026 - totals.totalOperatingExpense.budget2026,
    };

    const netProfitBeforeTax = {
      audited2024: profitBeforeProvision.audited2024 - totals.totalProvision.audited2024,
      forecast2025: profitBeforeProvision.forecast2025 - totals.totalProvision.forecast2025,
      budget2026: profitBeforeProvision.budget2026 - totals.totalProvision.budget2026,
    };

    const netProfitAfterTax = {
      audited2024: netProfitBeforeTax.audited2024 - totals.taxExpenses.audited2024,
      forecast2025: netProfitBeforeTax.forecast2025 - totals.taxExpenses.forecast2025,
      budget2026: netProfitBeforeTax.budget2026 - totals.taxExpenses.budget2026,
    };

    return {
      ...totals,
      profitBeforeProvision,
      netProfitBeforeTax,
      netProfitAfterTax,
    };
  };

  const totals = calculateTotals();

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
        <h1 className="text-3xl font-bold">Budget Summary</h1>
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
                  <SelectItem value="2026">FY 2026</SelectItem>
                  <SelectItem value="2025">FY 2025</SelectItem>
                  <SelectItem value="2024">FY 2024</SelectItem>
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
                  <TableHead className="text-right">Audited 2024 (Crore Tk.)</TableHead>
                  <TableHead className="text-right">Forecast 2025 (Crore Tk.)</TableHead>
                  <TableHead className="text-right">Budget 2026 (Crore Tk.)</TableHead>
                  <TableHead className="text-right">2024 vs 2025 Diff (Tk.)</TableHead>
                  <TableHead className="text-right">2024 vs 2025 Diff (%)</TableHead>
                  <TableHead className="text-right">2025 vs 2026 Diff (Tk.)</TableHead>
                  <TableHead className="text-right">2025 vs 2026 Diff (%)</TableHead>
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
                        const diff2425 = calculateDifference(item.forecast2025, item.audited2024);
                        const diff2526 = calculateDifference(item.budget2026, item.forecast2025);
                        
                        return (
                          <>
                            <TableRow key={item.id}>
                              <TableCell className="font-medium pl-8">
                                <div className="flex items-center gap-2">
                                  {item.hasSubItems && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleExpanded(item.id)}
                                      className="h-6 w-6 p-0"
                                    >
                                      {expandedItems.has(item.id) ? (
                                        <ChevronDown className="h-4 w-4" />
                                      ) : (
                                        <ChevronRight className="h-4 w-4" />
                                      )}
                                    </Button>
                                  )}
                                  <span>{item.particulars}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right font-mono">{formatAmount(item.audited2024)}</TableCell>
                              <TableCell className="text-right font-mono">{formatAmount(item.forecast2025)}</TableCell>
                              <TableCell className="text-right font-mono">{formatAmount(item.budget2026)}</TableCell>
                              <TableCell className={`text-right font-mono ${diff2425.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatAmount(Math.abs(diff2425.diff))}
                              </TableCell>
                              <TableCell className={`text-right font-mono ${diff2425.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatPercentage(diff2425.percentage)}
                              </TableCell>
                              <TableCell className={`text-right font-mono ${diff2526.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatAmount(Math.abs(diff2526.diff))}
                              </TableCell>
                              <TableCell className={`text-right font-mono ${diff2526.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatPercentage(diff2526.percentage)}
                              </TableCell>
                            </TableRow>
                            {item.hasSubItems && expandedItems.has(item.id) && item.subItems && (
                              item.subItems.map((subItem) => {
                                const subDiff2425 = calculateDifference(subItem.forecast2025, subItem.audited2024);
                                const subDiff2526 = calculateDifference(subItem.budget2026, subItem.forecast2025);
                                
                                return (
                                  <TableRow key={subItem.id} className="bg-muted/25">
                                    <TableCell className="font-medium pl-16 text-sm text-muted-foreground">
                                      → {subItem.particulars}
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-sm">{formatAmount(subItem.audited2024)}</TableCell>
                                    <TableCell className="text-right font-mono text-sm">{formatAmount(subItem.forecast2025)}</TableCell>
                                    <TableCell className="text-right font-mono text-sm">{formatAmount(subItem.budget2026)}</TableCell>
                                    <TableCell className={`text-right font-mono text-sm ${subDiff2425.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                      {formatAmount(Math.abs(subDiff2425.diff))}
                                    </TableCell>
                                    <TableCell className={`text-right font-mono text-sm ${subDiff2425.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                      {formatPercentage(subDiff2425.percentage)}
                                    </TableCell>
                                    <TableCell className={`text-right font-mono text-sm ${subDiff2526.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                      {formatAmount(Math.abs(subDiff2526.diff))}
                                    </TableCell>
                                    <TableCell className={`text-right font-mono text-sm ${subDiff2526.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                      {formatPercentage(subDiff2526.percentage)}
                                    </TableCell>
                                  </TableRow>
                                );
                              })
                            )}
                          </>
                        );
                      })}
                    </>
                  ))
                ) : (
                  <>
                    {filteredData.map((item) => {
                      const diff2425 = calculateDifference(item.forecast2025, item.audited2024);
                      const diff2526 = calculateDifference(item.budget2026, item.forecast2025);
                      
                      return (
                        <>
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {item.hasSubItems && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleExpanded(item.id)}
                                    className="h-6 w-6 p-0"
                                  >
                                    {expandedItems.has(item.id) ? (
                                      <ChevronDown className="h-4 w-4" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                  </Button>
                                )}
                                <span>{item.particulars}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-mono">{formatAmount(item.audited2024)}</TableCell>
                            <TableCell className="text-right font-mono">{formatAmount(item.forecast2025)}</TableCell>
                            <TableCell className="text-right font-mono">{formatAmount(item.budget2026)}</TableCell>
                            <TableCell className={`text-right font-mono ${diff2425.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatAmount(Math.abs(diff2425.diff))}
                            </TableCell>
                            <TableCell className={`text-right font-mono ${diff2425.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatPercentage(diff2425.percentage)}
                            </TableCell>
                            <TableCell className={`text-right font-mono ${diff2526.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatAmount(Math.abs(diff2526.diff))}
                            </TableCell>
                            <TableCell className={`text-right font-mono ${diff2526.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatPercentage(diff2526.percentage)}
                            </TableCell>
                          </TableRow>
                          {item.hasSubItems && expandedItems.has(item.id) && item.subItems && (
                            item.subItems.map((subItem) => {
                              const subDiff2425 = calculateDifference(subItem.forecast2025, subItem.audited2024);
                              const subDiff2526 = calculateDifference(subItem.budget2026, subItem.forecast2025);
                              
                              return (
                                <TableRow key={subItem.id} className="bg-muted/25">
                                  <TableCell className="font-medium pl-12 text-sm text-muted-foreground">
                                    → {subItem.particulars}
                                  </TableCell>
                                  <TableCell className="text-right font-mono text-sm">{formatAmount(subItem.audited2024)}</TableCell>
                                  <TableCell className="text-right font-mono text-sm">{formatAmount(subItem.forecast2025)}</TableCell>
                                  <TableCell className="text-right font-mono text-sm">{formatAmount(subItem.budget2026)}</TableCell>
                                  <TableCell className={`text-right font-mono text-sm ${subDiff2425.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {formatAmount(Math.abs(subDiff2425.diff))}
                                  </TableCell>
                                  <TableCell className={`text-right font-mono text-sm ${subDiff2425.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {formatPercentage(subDiff2425.percentage)}
                                  </TableCell>
                                  <TableCell className={`text-right font-mono text-sm ${subDiff2526.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {formatAmount(Math.abs(subDiff2526.diff))}
                                  </TableCell>
                                  <TableCell className={`text-right font-mono text-sm ${subDiff2526.percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {formatPercentage(subDiff2526.percentage)}
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          )}
                        </>
                      );
                    })}
                    
                    {/* Summary Rows */}
                    <TableRow className="border-t-2 bg-blue-50">
                      <TableCell className="font-bold">Total Operating Income (A)</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.totalOperatingIncome.audited2024)}</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.totalOperatingIncome.forecast2025)}</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.totalOperatingIncome.budget2026)}</TableCell>
                      <TableCell className="text-right font-mono font-bold text-blue-600">
                        {formatAmount(Math.abs(calculateDifference(totals.totalOperatingIncome.forecast2025, totals.totalOperatingIncome.audited2024).diff))}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-blue-600">
                        {formatPercentage(calculateDifference(totals.totalOperatingIncome.forecast2025, totals.totalOperatingIncome.audited2024).percentage)}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-blue-600">
                        {formatAmount(Math.abs(calculateDifference(totals.totalOperatingIncome.budget2026, totals.totalOperatingIncome.forecast2025).diff))}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-blue-600">
                        {formatPercentage(calculateDifference(totals.totalOperatingIncome.budget2026, totals.totalOperatingIncome.forecast2025).percentage)}
                      </TableCell>
                    </TableRow>
                    
                    <TableRow className="bg-red-50">
                      <TableCell className="font-bold">Total Operating Expense (B)</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.totalOperatingExpense.audited2024)}</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.totalOperatingExpense.forecast2025)}</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.totalOperatingExpense.budget2026)}</TableCell>
                      <TableCell className="text-right font-mono font-bold text-red-600">
                        {formatAmount(Math.abs(calculateDifference(totals.totalOperatingExpense.forecast2025, totals.totalOperatingExpense.audited2024).diff))}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-red-600">
                        {formatPercentage(calculateDifference(totals.totalOperatingExpense.forecast2025, totals.totalOperatingExpense.audited2024).percentage)}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-red-600">
                        {formatAmount(Math.abs(calculateDifference(totals.totalOperatingExpense.budget2026, totals.totalOperatingExpense.forecast2025).diff))}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-red-600">
                        {formatPercentage(calculateDifference(totals.totalOperatingExpense.budget2026, totals.totalOperatingExpense.forecast2025).percentage)}
                      </TableCell>
                    </TableRow>
                    
                    <TableRow className="bg-green-50">
                      <TableCell className="font-bold">Profit/(Loss) before Provision & Tax (C = A-B)</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.profitBeforeProvision.audited2024)}</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.profitBeforeProvision.forecast2025)}</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.profitBeforeProvision.budget2026)}</TableCell>
                      <TableCell className="text-right font-mono font-bold text-green-600">
                        {formatAmount(Math.abs(calculateDifference(totals.profitBeforeProvision.forecast2025, totals.profitBeforeProvision.audited2024).diff))}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-green-600">
                        {formatPercentage(calculateDifference(totals.profitBeforeProvision.forecast2025, totals.profitBeforeProvision.audited2024).percentage)}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-green-600">
                        {formatAmount(Math.abs(calculateDifference(totals.profitBeforeProvision.budget2026, totals.profitBeforeProvision.forecast2025).diff))}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-green-600">
                        {formatPercentage(calculateDifference(totals.profitBeforeProvision.budget2026, totals.profitBeforeProvision.forecast2025).percentage)}
                      </TableCell>
                    </TableRow>
                    
                    <TableRow className="bg-orange-50">
                      <TableCell className="font-bold">Total Provision (D)</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.totalProvision.audited2024)}</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.totalProvision.forecast2025)}</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.totalProvision.budget2026)}</TableCell>
                      <TableCell className="text-right font-mono font-bold text-orange-600">
                        {formatAmount(Math.abs(calculateDifference(totals.totalProvision.forecast2025, totals.totalProvision.audited2024).diff))}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-orange-600">
                        {formatPercentage(calculateDifference(totals.totalProvision.forecast2025, totals.totalProvision.audited2024).percentage)}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-orange-600">
                        {formatAmount(Math.abs(calculateDifference(totals.totalProvision.budget2026, totals.totalProvision.forecast2025).diff))}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-orange-600">
                        {formatPercentage(calculateDifference(totals.totalProvision.budget2026, totals.totalProvision.forecast2025).percentage)}
                      </TableCell>
                    </TableRow>
                    
                    <TableRow className="bg-purple-50">
                      <TableCell className="font-bold">Net Profit/(Loss) before Tax (E = C-D)</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.netProfitBeforeTax.audited2024)}</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.netProfitBeforeTax.forecast2025)}</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.netProfitBeforeTax.budget2026)}</TableCell>
                      <TableCell className="text-right font-mono font-bold text-purple-600">
                        {formatAmount(Math.abs(calculateDifference(totals.netProfitBeforeTax.forecast2025, totals.netProfitBeforeTax.audited2024).diff))}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-purple-600">
                        {formatPercentage(calculateDifference(totals.netProfitBeforeTax.forecast2025, totals.netProfitBeforeTax.audited2024).percentage)}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-purple-600">
                        {formatAmount(Math.abs(calculateDifference(totals.netProfitBeforeTax.budget2026, totals.netProfitBeforeTax.forecast2025).diff))}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-purple-600">
                        {formatPercentage(calculateDifference(totals.netProfitBeforeTax.budget2026, totals.netProfitBeforeTax.forecast2025).percentage)}
                      </TableCell>
                    </TableRow>
                    
                    <TableRow className="bg-gray-50">
                      <TableCell className="font-bold">Tax expenses (F)</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.taxExpenses.audited2024)}</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.taxExpenses.forecast2025)}</TableCell>
                      <TableCell className="text-right font-mono font-bold">{formatAmount(totals.taxExpenses.budget2026)}</TableCell>
                      <TableCell className="text-right font-mono font-bold text-gray-600">
                        {formatAmount(Math.abs(calculateDifference(totals.taxExpenses.forecast2025, totals.taxExpenses.audited2024).diff))}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-gray-600">
                        {formatPercentage(calculateDifference(totals.taxExpenses.forecast2025, totals.taxExpenses.audited2024).percentage)}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-gray-600">
                        {formatAmount(Math.abs(calculateDifference(totals.taxExpenses.budget2026, totals.taxExpenses.forecast2025).diff))}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-gray-600">
                        {formatPercentage(calculateDifference(totals.taxExpenses.budget2026, totals.taxExpenses.forecast2025).percentage)}
                      </TableCell>
                    </TableRow>
                    
                    <TableRow className="border-t-2 bg-emerald-100">
                      <TableCell className="font-bold text-lg">Net Profit/(Loss) after Provision & Tax (G = E-F)</TableCell>
                      <TableCell className="text-right font-mono font-bold text-lg">{formatAmount(totals.netProfitAfterTax.audited2024)}</TableCell>
                      <TableCell className="text-right font-mono font-bold text-lg">{formatAmount(totals.netProfitAfterTax.forecast2025)}</TableCell>
                      <TableCell className="text-right font-mono font-bold text-lg">{formatAmount(totals.netProfitAfterTax.budget2026)}</TableCell>
                      <TableCell className="text-right font-mono font-bold text-lg text-emerald-600">
                        {formatAmount(Math.abs(calculateDifference(totals.netProfitAfterTax.forecast2025, totals.netProfitAfterTax.audited2024).diff))}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-lg text-emerald-600">
                        {formatPercentage(calculateDifference(totals.netProfitAfterTax.forecast2025, totals.netProfitAfterTax.audited2024).percentage)}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-lg text-emerald-600">
                        {formatAmount(Math.abs(calculateDifference(totals.netProfitAfterTax.budget2026, totals.netProfitAfterTax.forecast2025).diff))}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-lg text-emerald-600">
                        {formatPercentage(calculateDifference(totals.netProfitAfterTax.budget2026, totals.netProfitAfterTax.forecast2025).percentage)}
                      </TableCell>
                    </TableRow>
                  </>
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