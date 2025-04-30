
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Form,
  FormControl,
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
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type BudgetHead = {
  id: string;
  headName: string;
};

const formSchema = z.object({
  headId: z.string({ required_error: "Head is required" }),
  particularName: z.string().min(2, { message: "Particular name must be at least 2 characters" }),
  fsTag: z.enum(['p&l', 'balance-sheet'], { required_error: "Financial statement tag is required" }),
});

type ParticularsFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  initialData?: z.infer<typeof formSchema>;
  heads: BudgetHead[];
};

const ParticularsForm = ({ onSubmit, initialData, heads }: ParticularsFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      headId: '',
      particularName: '',
      fsTag: 'p&l',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="headId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Head</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a budget head" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {heads.map((head) => (
                    <SelectItem key={head.id} value={head.id}>
                      {head.headName}
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
          name="particularName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Particular Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter particular name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fsTag"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Financial Statement Tag</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="p&l" id="p&l" />
                    <Label htmlFor="p&l">P&L</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="balance-sheet" id="balance-sheet" />
                    <Label htmlFor="balance-sheet">Balance Sheet</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary hover:bg-primary/90">
          {initialData ? 'Update Particular' : 'Add Particular'}
        </Button>
      </form>
    </Form>
  );
};

export default ParticularsForm;
