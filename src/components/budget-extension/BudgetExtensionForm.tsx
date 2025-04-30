
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
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

// Mock data for dropdowns
const heads = [
  { id: 1, name: 'IT Department' },
  { id: 2, name: 'Finance Department' },
  { id: 3, name: 'Marketing Department' },
];

const particulars = {
  1: [
    { id: 1, name: 'Software Licenses', approvedAmount: 15000 },
    { id: 2, name: 'Hardware Maintenance', approvedAmount: 6000 },
  ],
  2: [
    { id: 3, name: 'Audit Fees', approvedAmount: 8000 },
    { id: 4, name: 'Consulting Services', approvedAmount: 10000 },
  ],
  3: [
    { id: 5, name: 'Advertising', approvedAmount: 12000 },
    { id: 6, name: 'Events', approvedAmount: 7500 },
  ],
};

const formSchema = z.object({
  headId: z.string().min(1, { message: 'Please select a head' }),
  particularId: z.string().min(1, { message: 'Please select a particular' }),
  additionalAmount: z.string().min(1, { message: 'Amount is required' }),
  justification: z.string().min(1, { message: 'Justification is required' }).min(20, {
    message: 'Justification should be at least 20 characters',
  }),
  supportingDocs: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const BudgetExtensionForm = () => {
  const [selectedHead, setSelectedHead] = useState<string | null>(null);
  const [selectedParticular, setSelectedParticular] = useState<string | null>(null);
  const [currentApprovedAmount, setCurrentApprovedAmount] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headId: '',
      particularId: '',
      additionalAmount: '',
      justification: '',
    },
  });

  // Update current approved amount when particular is selected
  const updateApprovedAmount = (headId: string, particularId: string) => {
    const head = parseInt(headId);
    const particular = parseInt(particularId);
    
    const particularData = particulars[head]?.find(p => p.id === particular);
    if (particularData) {
      setCurrentApprovedAmount(particularData.approvedAmount);
    } else {
      setCurrentApprovedAmount(null);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Submitting extension request:', data);
      toast.success('Budget extension request submitted successfully');
      form.reset();
      setSelectedHead(null);
      setSelectedParticular(null);
      setCurrentApprovedAmount(null);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
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
                    setSelectedParticular(null);
                    setCurrentApprovedAmount(null);
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
                    if (selectedHead) {
                      updateApprovedAmount(selectedHead, value);
                    }
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
          <div>
            <FormLabel>Current Approved Amount</FormLabel>
            <div className="mt-2 p-2 border rounded-md bg-muted/50">
              <p className="text-base font-medium">
                ${currentApprovedAmount?.toLocaleString() || '-'}
              </p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="additionalAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Requested Amount</FormLabel>
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
        </div>

        <FormField
          control={form.control}
          name="justification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Justification</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide detailed justification for the additional budget request"
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Explain why the additional budget is needed, how it will be used, and the expected outcomes
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="supportingDocs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supporting Documents</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <Button type="button" variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Files
                  </Button>
                  <p className="text-sm text-muted-foreground">No files selected</p>
                </div>
              </FormControl>
              <FormDescription>
                Upload any supporting documents for your extension request (PDF, XLS, DOC)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset Form
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BudgetExtensionForm;
