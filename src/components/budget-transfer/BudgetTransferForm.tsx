
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
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

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

const formSchema = z.object({
  fromHeadId: z.string().min(1, { message: 'Please select a head' }),
  fromParticularId: z.string().min(1, { message: 'Please select a particular' }),
  fromGLId: z.string().min(1, { message: 'Please select a GL' }),
  toHeadId: z.string().min(1, { message: 'Please select a head' }),
  toParticularId: z.string().min(1, { message: 'Please select a particular' }),
  toGLId: z.string().min(1, { message: 'Please select a GL' }),
  transferAmount: z.string().min(1, { message: 'Amount is required' }),
  remarks: z.string().min(1, { message: 'Remarks are required' }),
  transferDate: z.date({
    required_error: 'Transfer date is required',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const BudgetTransferForm = () => {
  const [fromSelectedHead, setFromSelectedHead] = useState<string | null>(null);
  const [fromSelectedParticular, setFromSelectedParticular] = useState<string | null>(null);
  const [toSelectedHead, setToSelectedHead] = useState<string | null>(null);
  const [toSelectedParticular, setToSelectedParticular] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromHeadId: '',
      fromParticularId: '',
      fromGLId: '',
      toHeadId: '',
      toParticularId: '',
      toGLId: '',
      transferAmount: '',
      remarks: '',
      transferDate: new Date(),
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Submitting budget transfer:', data);
      toast.success('Budget transfer submitted successfully');
      form.reset();
      setFromSelectedHead(null);
      setFromSelectedParticular(null);
      setToSelectedHead(null);
      setToSelectedParticular(null);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">From</h3>
            
            <FormField
              control={form.control}
              name="fromHeadId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Head</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setFromSelectedHead(value);
                      form.setValue('fromParticularId', '');
                      form.setValue('fromGLId', '');
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
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
              name="fromParticularId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Particular</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setFromSelectedParticular(value);
                      form.setValue('fromGLId', '');
                    }}
                    defaultValue={field.value}
                    disabled={!fromSelectedHead}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select particular" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fromSelectedHead &&
                        particulars[parseInt(fromSelectedHead)].map((particular) => (
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
            
            <FormField
              control={form.control}
              name="fromGLId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GL</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!fromSelectedParticular}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select GL" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fromSelectedHead && fromSelectedParticular &&
                        particulars[parseInt(fromSelectedHead)]
                          .find(p => p.id.toString() === fromSelectedParticular)?.gls
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
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">To</h3>
            
            <FormField
              control={form.control}
              name="toHeadId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Head</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setToSelectedHead(value);
                      form.setValue('toParticularId', '');
                      form.setValue('toGLId', '');
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
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
              name="toParticularId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Particular</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setToSelectedParticular(value);
                      form.setValue('toGLId', '');
                    }}
                    defaultValue={field.value}
                    disabled={!toSelectedHead}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select particular" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {toSelectedHead &&
                        particulars[parseInt(toSelectedHead)].map((particular) => (
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
            
            <FormField
              control={form.control}
              name="toGLId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GL</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!toSelectedParticular}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select GL" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {toSelectedHead && toSelectedParticular &&
                        particulars[parseInt(toSelectedHead)]
                          .find(p => p.id.toString() === toSelectedParticular)?.gls
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
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="transferAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transfer Amount</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5">$</span>
                    <Input type="number" className="pl-6" placeholder="0.00" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="transferDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Transfer Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remarks</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter reason for budget transfer"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Transfer'}
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset Form
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BudgetTransferForm;
