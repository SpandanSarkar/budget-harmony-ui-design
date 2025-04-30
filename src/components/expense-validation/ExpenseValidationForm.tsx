
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';
import { Input } from '@/components/ui/input';
import { Check, X, Info } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for dropdowns
const heads = [
  { id: 1, name: 'IT Department' },
  { id: 2, name: 'Finance Department' },
  { id: 3, name: 'Marketing Department' },
];

const particulars = {
  1: [
    { id: 1, name: 'Software Licenses', gls: [{ id: 1, name: 'GL001: Operating Expenses' }] },
    { id: 2, name: 'Hardware Maintenance', gls: [{ id: 2, name: 'GL002: Capital Expenditure' }] },
  ],
  2: [
    { id: 3, name: 'Audit Fees', gls: [{ id: 3, name: 'GL003: Professional Fees' }] },
    { id: 4, name: 'Consulting Services', gls: [{ id: 4, name: 'GL004: Professional Fees' }] },
  ],
  3: [
    { id: 5, name: 'Advertising', gls: [{ id: 5, name: 'GL005: Marketing & Advertising' }] },
    { id: 6, name: 'Events', gls: [{ id: 6, name: 'GL005: Marketing & Advertising' }] },
  ],
};

// Mock budget data
const budgets = {
  // Format: headId-particularId-glId: { approved, spent }
  '1-1-1': { approved: 15000, spent: 10000 },
  '1-2-2': { approved: 6000, spent: 5500 },
  '2-3-3': { approved: 8000, spent: 7000 },
  '2-4-4': { approved: 10000, spent: 8500 },
  '3-5-5': { approved: 12000, spent: 11800 },
  '3-6-6': { approved: 7500, spent: 3000 },
};

const formSchema = z.object({
  headId: z.string().min(1, { message: 'Please select a head' }),
  particularId: z.string().min(1, { message: 'Please select a particular' }),
  glId: z.string().min(1, { message: 'Please select a GL' }),
  expenseAmount: z.string().min(1, { message: 'Amount is required' }),
});

type FormValues = z.infer<typeof formSchema>;

const ExpenseValidationForm = () => {
  const [selectedHead, setSelectedHead] = useState<string | null>(null);
  const [selectedParticular, setSelectedParticular] = useState<string | null>(null);
  const [selectedGL, setSelectedGL] = useState<string | null>(null);
  
  const [validationResult, setValidationResult] = useState<null | {
    isValid: boolean;
    approvedAmount: number;
    spentAmount: number;
    remainingBudget: number;
    message: string;
  }>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headId: '',
      particularId: '',
      glId: '',
      expenseAmount: '',
    },
  });

  const validateExpense = (data: FormValues) => {
    const budgetKey = `${data.headId}-${data.particularId}-${data.glId}`;
    const budgetData = budgets[budgetKey];
    
    if (!budgetData) {
      setValidationResult({
        isValid: false,
        approvedAmount: 0,
        spentAmount: 0,
        remainingBudget: 0,
        message: 'No budget allocation found for the selected items',
      });
      return;
    }
    
    const expenseAmount = parseFloat(data.expenseAmount);
    const remainingBudget = budgetData.approved - budgetData.spent;
    const isValid = expenseAmount <= remainingBudget;
    
    setValidationResult({
      isValid,
      approvedAmount: budgetData.approved,
      spentAmount: budgetData.spent,
      remainingBudget: remainingBudget,
      message: isValid 
        ? 'Expense is within budget limits.'
        : `Expense exceeds remaining budget by $${(expenseAmount - remainingBudget).toLocaleString()}.`,
    });
    
    if (isValid) {
      toast.success('Expense validation successful');
    } else {
      toast.error('Expense exceeds budget limits');
    }
  };

  const onSubmit = (data: FormValues) => {
    validateExpense(data);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="headId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Head</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedHead(value);
                      form.setValue('particularId', '');
                      form.setValue('glId', '');
                      setSelectedParticular(null);
                      setSelectedGL(null);
                      setValidationResult(null);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select head" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {heads.map((head) => (
                        <SelectItem key={head.id} value={head.id.toString()}>
                          {head.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="particularId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Particular</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedParticular(value);
                      form.setValue('glId', '');
                      setSelectedGL(null);
                      setValidationResult(null);
                    }}
                    defaultValue={field.value}
                    disabled={!selectedHead}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select particular" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedHead &&
                        particulars[parseInt(selectedHead)].map((particular) => (
                          <SelectItem key={particular.id} value={particular.id.toString()}>
                            {particular.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="glId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select GL</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedGL(value);
                      setValidationResult(null);
                    }}
                    defaultValue={field.value}
                    disabled={!selectedParticular}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select GL" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedHead && selectedParticular &&
                        particulars[parseInt(selectedHead)]
                          .find(p => p.id.toString() === selectedParticular)?.gls
                          .map((gl) => (
                            <SelectItem key={gl.id} value={gl.id.toString()}>
                              {gl.name}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="expenseAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">$</span>
                      <Input type="number" className="pl-6" placeholder="0.00" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter the expense amount to validate against the budget
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit">Validate Expense</Button>
        </form>
      </Form>
      
      {validationResult && (
        <div className={`p-4 mt-6 border rounded-md ${
          validationResult.isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`rounded-full p-1.5 ${
              validationResult.isValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {validationResult.isValid ? (
                <Check className="h-5 w-5" />
              ) : (
                <X className="h-5 w-5" />
              )}
            </div>
            
            <div className="space-y-2">
              <p className={`font-medium ${
                validationResult.isValid ? 'text-green-700' : 'text-red-700'
              }`}>
                {validationResult.isValid ? 'Validation Successful' : 'Validation Failed'}
              </p>
              
              <p className="text-sm">{validationResult.message}</p>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-xs font-medium text-gray-500">Approved Budget</p>
                  <p className="text-sm font-medium">${validationResult.approvedAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Already Spent</p>
                  <p className="text-sm font-medium">${validationResult.spentAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Remaining Budget</p>
                  <p className={`text-sm font-medium ${validationResult.remainingBudget < 0 ? 'text-red-600' : ''}`}>
                    ${validationResult.remainingBudget.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium">How expense validation works:</p>
            <ul className="mt-1 list-disc list-inside space-y-1">
              <li>Expenses are checked against the remaining budget in the selected category</li>
              <li>Validation prevents overspending past approved budget limits</li>
              <li>For special circumstances, Finance Managers can submit a Budget Extension Request</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseValidationForm;
