import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DisbursementRow {
  id: string;
  date: Date | undefined;
  amount: number;
}

const LoanInterestConfigPage = () => {
  const [formData, setFormData] = useState({
    loanAmount: '',
    interestStartDate: undefined as Date | undefined,
    principalStartDate: undefined as Date | undefined,
    interestFrequency: '',
    principalFrequency: '',
    fixedInterestRate: '',
    variableInterestRate: '',
    repaymentMethod: '',
    dayCountBasis: '',
    holidayRule: '',
    tenure: '',
    installmentCount: ''
  });

  const [holidayDays, setHolidayDays] = useState<string[]>([]);
  const [disbursementRows, setDisbursementRows] = useState<DisbursementRow[]>([
    { id: '1', date: undefined, amount: 0 }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (field: string, date: Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: date }));
  };

  const handleHolidayChange = (day: string, checked: boolean) => {
    if (checked) {
      setHolidayDays(prev => [...prev, day]);
    } else {
      setHolidayDays(prev => prev.filter(d => d !== day));
    }
  };

  const addDisbursementRow = () => {
    const newRow = {
      id: Date.now().toString(),
      date: undefined,
      amount: 0
    };
    setDisbursementRows(prev => [...prev, newRow]);
  };

  const removeDisbursementRow = (id: string) => {
    if (disbursementRows.length > 1) {
      setDisbursementRows(prev => prev.filter(row => row.id !== id));
    }
  };

  const updateDisbursementRow = (id: string, field: string, value: any) => {
    setDisbursementRows(prev => 
      prev.map(row => 
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const totalInterestRate = (parseFloat(formData.fixedInterestRate) || 0) + (parseFloat(formData.variableInterestRate) || 0);

  const handleGenerateForecast = () => {
    console.log('Generating forecast with data:', {
      formData,
      holidayDays,
      disbursementRows,
      totalInterestRate
    });
    // TODO: Implement forecast generation logic
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Loan Interest Income Config</h1>
        <p className="text-muted-foreground">
          Configure loan parameters and disbursement schedule
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuration Form</CardTitle>
          <CardDescription>Set up loan parameters and calculation settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Loan Amount */}
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount</Label>
              <Input
                id="loanAmount"
                type="number"
                placeholder="Enter loan amount"
                value={formData.loanAmount}
                onChange={(e) => handleInputChange('loanAmount', e.target.value)}
              />
            </div>

            {/* Tenure */}
            <div className="space-y-2">
              <Label htmlFor="tenure">Tenure (in months)</Label>
              <Input
                id="tenure"
                type="number"
                placeholder="Enter tenure in months"
                value={formData.tenure}
                onChange={(e) => handleInputChange('tenure', e.target.value)}
              />
            </div>

            {/* Interest Start Date */}
            <div className="space-y-2">
              <Label>Interest Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.interestStartDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.interestStartDate ? format(formData.interestStartDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.interestStartDate}
                    onSelect={(date) => handleDateChange('interestStartDate', date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Principal Start Date */}
            <div className="space-y-2">
              <Label>Principal Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.principalStartDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.principalStartDate ? format(formData.principalStartDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.principalStartDate}
                    onSelect={(date) => handleDateChange('principalStartDate', date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Interest Frequency */}
            <div className="space-y-2">
              <Label>Interest Frequency</Label>
              <Select value={formData.interestFrequency} onValueChange={(value) => handleInputChange('interestFrequency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Principal Frequency */}
            <div className="space-y-2">
              <Label>Principal Frequency</Label>
              <Select value={formData.principalFrequency} onValueChange={(value) => handleInputChange('principalFrequency', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fixed Interest Rate */}
            <div className="space-y-2">
              <Label htmlFor="fixedInterestRate">Fixed Interest Rate (%)</Label>
              <Input
                id="fixedInterestRate"
                type="number"
                step="0.01"
                placeholder="Enter fixed interest rate"
                value={formData.fixedInterestRate}
                onChange={(e) => handleInputChange('fixedInterestRate', e.target.value)}
              />
            </div>

            {/* Variable Interest Rate */}
            <div className="space-y-2">
              <Label htmlFor="variableInterestRate">Variable Interest Rate (%)</Label>
              <Input
                id="variableInterestRate"
                type="number"
                step="0.01"
                placeholder="Enter variable interest rate"
                value={formData.variableInterestRate}
                onChange={(e) => handleInputChange('variableInterestRate', e.target.value)}
              />
            </div>

            {/* Total Interest Rate */}
            <div className="space-y-2">
              <Label htmlFor="totalInterestRate">Total Interest Rate (%)</Label>
              <Input
                id="totalInterestRate"
                type="number"
                value={totalInterestRate.toFixed(2)}
                disabled
                className="bg-muted"
              />
            </div>

            {/* Installment Count */}
            <div className="space-y-2">
              <Label htmlFor="installmentCount">Installment Count</Label>
              <Input
                id="installmentCount"
                type="number"
                placeholder="Enter installment count"
                value={formData.installmentCount}
                onChange={(e) => handleInputChange('installmentCount', e.target.value)}
              />
            </div>

            {/* Repayment Method */}
            <div className="space-y-2">
              <Label>Repayment Method</Label>
              <Select value={formData.repaymentMethod} onValueChange={(value) => handleInputChange('repaymentMethod', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select repayment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annuity">Annuity</SelectItem>
                  <SelectItem value="equal">Equal</SelectItem>
                  <SelectItem value="level">Level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Day Count Basis */}
            <div className="space-y-2">
              <Label>Day Count Basis</Label>
              <Select value={formData.dayCountBasis} onValueChange={(value) => handleInputChange('dayCountBasis', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select day count basis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="360">360</SelectItem>
                  <SelectItem value="365">365</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Holiday Rule */}
            <div className="space-y-2">
              <Label>Holiday Rule</Label>
              <Select value={formData.holidayRule} onValueChange={(value) => handleInputChange('holidayRule', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select holiday rule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="preceding">Preceding</SelectItem>
                  <SelectItem value="following">Following</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Holiday Days */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Holiday Days</Label>
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="friday"
                  checked={holidayDays.includes('friday')}
                  onCheckedChange={(checked) => handleHolidayChange('friday', checked as boolean)}
                />
                <Label htmlFor="friday">Friday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="saturday"
                  checked={holidayDays.includes('saturday')}
                  onCheckedChange={(checked) => handleHolidayChange('saturday', checked as boolean)}
                />
                <Label htmlFor="saturday">Saturday</Label>
              </div>
            </div>
          </div>

          {/* Disbursement Table */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Disbursement Table</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addDisbursementRow}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add More
              </Button>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted font-medium">
                <div>Disbursement Date</div>
                <div>Amount</div>
                <div>Actions</div>
              </div>
              
              {disbursementRows.map((row) => (
                <div key={row.id} className="grid grid-cols-3 gap-4 p-4 border-t">
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !row.date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {row.date ? format(row.date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={row.date}
                          onSelect={(date) => updateDisbursementRow(row.id, 'date', date)}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={row.amount || ''}
                      onChange={(e) => updateDisbursementRow(row.id, 'amount', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeDisbursementRow(row.id)}
                      disabled={disbursementRows.length === 1}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Forecast Button */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleGenerateForecast}
              className="px-8"
            >
              Generate Forecast
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanInterestConfigPage;