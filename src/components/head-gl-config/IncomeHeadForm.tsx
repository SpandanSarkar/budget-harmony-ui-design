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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const incomeCategories = ['Operating', 'Non-Operating'];

const mockGLCodes = [
  { code: '4001', name: 'Interest Income' },
  { code: '4002', name: 'Fee Income' },
  { code: '4003', name: 'Investment Income' },
  { code: '4004', name: 'Other Operating Income' },
  { code: '7001', name: 'Gain on Sale of Assets' },
  { code: '7002', name: 'Dividend Income' },
  { code: '7003', name: 'Other Non-Operating Income' }
];

const formSchema = z.object({
  incomeCategory: z.enum(['Operating', 'Non-Operating']),
  incomeHeadName: z.string().min(1, 'Income head name is required'),
  glCode: z.string().min(1, 'GL code is required'),
  // fsTag: z.enum(['P&L', 'Balance Sheet']),
  balanceSheetItemName: z.string().optional(),
  headType: z.enum(['Regular', 'Loan-based']),
  status: z.boolean().default(true)
});

type FormData = z.infer<typeof formSchema>;

interface IncomeHeadFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: Partial<FormData>;
}

const IncomeHeadForm: React.FC<IncomeHeadFormProps> = ({ onSubmit, initialData }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      incomeCategory: 'Operating',
      incomeHeadName: '',
      glCode: '',
      // fsTag: 'P&L',
      balanceSheetItemName: '',
      headType: 'Regular',
      status: true,
      ...initialData
    }
  });

  // const fsTag = form.watch('fsTag');

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
          name="incomeCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Income Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select income category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {incomeCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
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
          name="incomeHeadName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Income Head Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter income head name" {...field} />
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

        {/* <FormField
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
        )} */}

        <FormField
          control={form.control}
          name="headType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Head Type</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Regular" id="regular" />
                    <Label htmlFor="regular">Regular</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Loan-based" id="loan" />
                    <Label htmlFor="loan">Loan-based</Label>
                  </div>
                </RadioGroup>
              </FormControl>
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
          {initialData ? 'Update Income Head' : 'Create Income Head'}
        </Button>
      </form>
    </Form>
  );
};

export default IncomeHeadForm;