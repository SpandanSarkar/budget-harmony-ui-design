import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const expenseGroups = [
  'Admin',
  'HR', 
  'IT',
  'PR/Media Events',
  'Company Secretary',
  'BUs',
  'Corporate Advisory',
  'Legal & SAM',
  'Depreciation',
  'F&A'
];

const dimensionTemplates = [
  'Designation',
  'Unit',
  'Quantity', 
  'CAPEX/OPEX',
  'No. of Events',
  'Cost per Head',
  'Depreciation Rate',
  'Asset Type'
];

const mockGLCodes = [
  { code: '1001', name: 'Cash in Hand' },
  { code: '1002', name: 'Balance with Banks' },
  { code: '1003', name: 'Government Securities' },
  { code: '5001', name: 'Employee Salaries' },
  { code: '5002', name: 'Office Rent' },
  { code: '5003', name: 'Utilities' },
  { code: '6001', name: 'Marketing Expenses' },
  { code: '6002', name: 'Travel Expenses' }
];

const formSchema = z.object({
  expenseGroup: z.string().min(1, 'Expense group is required'),
  expenseHeadName: z.string().min(1, 'Expense head name is required'),
  glCode: z.string().min(1, 'GL code is required'),
  fsTag: z.enum(['P&L', 'Balance Sheet']),
  balanceSheetItemName: z.string().optional(),
  dimensionTemplate: z.array(z.string()).min(0),
  status: z.boolean().default(true)
});

type FormData = z.infer<typeof formSchema>;

interface ExpenseHeadFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: Partial<FormData>;
}

const ExpenseHeadForm: React.FC<ExpenseHeadFormProps> = ({ onSubmit, initialData }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expenseGroup: '',
      expenseHeadName: '',
      glCode: '',
      fsTag: 'P&L',
      balanceSheetItemName: '',
      dimensionTemplate: [],
      status: true,
      ...initialData
    }
  });

  const fsTag = form.watch('fsTag');

  useEffect(() => {
    if (initialData) {
      form.reset({ ...form.getValues(), ...initialData });
    }
  }, [initialData, form]);

  const handleSubmit = (data: FormData) => {
    onSubmit(data);
    if (!initialData) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="expenseGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expense Group</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select expense group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {expenseGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
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
          name="expenseHeadName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expense Head Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter expense head name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="glCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GL Code</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select GL code" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mockGLCodes.map((gl) => (
                    <SelectItem key={gl.code} value={gl.code}>
                      {gl.code} - {gl.name}
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
          name="fsTag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>FS Tag</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="P&L" id="pl" />
                    <Label htmlFor="pl">P&L</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Balance Sheet" id="bs" />
                    <Label htmlFor="bs">Balance Sheet</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {fsTag === 'Balance Sheet' && (
          <FormField
            control={form.control}
            name="balanceSheetItemName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Balance Sheet Item Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter balance sheet item name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="dimensionTemplate"
          render={() => (
            <FormItem>
              <FormLabel>Dimension Template</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                {dimensionTemplates.map((template) => (
                  <FormField
                    key={template}
                    control={form.control}
                    name="dimensionTemplate"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(template)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, template]);
                              } else {
                                field.onChange(field.value?.filter((value) => value !== template));
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">{template}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {initialData ? 'Update Expense Head' : 'Create Expense Head'}
        </Button>
      </form>
    </Form>
  );
};

export default ExpenseHeadForm;