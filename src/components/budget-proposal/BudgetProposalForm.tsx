
// import React, { useState } from 'react';
// import { z } from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from 'sonner';
// import { Info, Upload } from 'lucide-react';

// // Mock data for dropdowns
// const heads = [
//   { id: 1, name: 'IT Department' },
//   { id: 2, name: 'Finance Department' },
//   { id: 3, name: 'Marketing Department' },
// ];

// const particulars = {
//   1: [
//     { id: 1, name: 'Software Licenses' },
//     { id: 2, name: 'Hardware Maintenance' },
//   ],
//   2: [
//     { id: 3, name: 'Audit Fees' },
//     { id: 4, name: 'Consulting Services' },
//   ],
//   3: [
//     { id: 5, name: 'Advertising' },
//     { id: 6, name: 'Events' },
//   ],
// };

// const units = [
//   { id: 1, name: 'Headquarters' },
//   { id: 2, name: 'Regional Office' },
//   { id: 3, name: 'Branch Office' },
// ];

// const formSchema = z.object({
//   headId: z.string().min(1, { message: 'Please select a head' }),
//   particularId: z.string().min(1, { message: 'Please select a particular' }),
//   unitId: z.string().min(1, { message: 'Please select a unit' }),
//   proposedAmount: z.string().min(1, { message: 'Amount is required' }),
//   supportingDocs: z.any().optional(),
//   calculations: z.string().optional(),
//   remarks: z.string().optional(),
// });

// type FormValues = z.infer<typeof formSchema>;

// const BudgetProposalForm = () => {
//   const [selectedHead, setSelectedHead] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       headId: '',
//       particularId: '',
//       unitId: '',
//       proposedAmount: '',
//       calculations: '',
//       remarks: '',
//     },
//   });

//   const onSubmit = async (data: FormValues) => {
//     setIsSubmitting(true);
//     // Simulate API call
//     setTimeout(() => {
//       console.log('Submitting proposal:', data);
//       toast.success('Budget proposal submitted successfully');
//       form.reset();
//       setSelectedHead(null);
//       setIsSubmitting(false);
//     }, 1000);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <div className="grid gap-6 md:grid-cols-2">
//           <FormField
//             control={form.control}
//             name="headId"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Select Head</FormLabel>
//                 <Select
//                   onValueChange={(value) => {
//                     field.onChange(value);
//                     setSelectedHead(value);
//                     form.setValue('particularId', '');
//                   }}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select head" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {heads.map((head) => (
//                       <SelectItem key={head.id} value={head.id.toString()}>
//                         {head.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="particularId"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Select Particular</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                   disabled={!selectedHead}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select particular" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {selectedHead &&
//                       particulars[parseInt(selectedHead)].map((particular) => (
//                         <SelectItem key={particular.id} value={particular.id.toString()}>
//                           {particular.name}
//                         </SelectItem>
//                       ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="unitId"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Select Unit</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select unit" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {units.map((unit) => (
//                       <SelectItem key={unit.id} value={unit.id.toString()}>
//                         {unit.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="proposedAmount"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Proposed Amount</FormLabel>
//                 <FormControl>
//                   <div className="relative">
//                     <span className="absolute left-3 top-2.5">$</span>
//                     <Input type="number" className="pl-6" placeholder="0.00" {...field} />
//                   </div>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <FormField
//           control={form.control}
//           name="supportingDocs"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Supporting Documents</FormLabel>
//               <FormControl>
//                 <div className="flex items-center gap-4">
//                   <Button type="button" variant="outline" className="w-full">
//                     <Upload className="mr-2 h-4 w-4" />
//                     Upload Files
//                   </Button>
//                   <p className="text-sm text-muted-foreground">No files selected</p>
//                 </div>
//               </FormControl>
//               <FormDescription>
//                 Upload any supporting documents for your budget proposal (PDF, XLS, DOC)
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="calculations"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Supporting Calculations</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Enter calculations or notes about how you arrived at the proposed amount"
//                   className="min-h-[100px]"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="remarks"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Remarks</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Enter any additional remarks or justification"
//                   className="min-h-[100px]"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="flex items-center gap-2">
//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
//           </Button>
//           <Button type="button" variant="outline" onClick={() => form.reset()}>
//             Reset Form
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default BudgetProposalForm;


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
import { toast } from 'sonner';
import { Info, Upload } from 'lucide-react';
 
// Mock data for dropdowns
const heads = [
  { id: 1, name: 'IT Department' },
  { id: 2, name: 'Finance Department' },
  { id: 3, name: 'Marketing Department' },
];
 
const particulars = {
  1: [
    { id: 1, name: 'Software Licenses' },
    { id: 2, name: 'Hardware Maintenance' },
  ],
  2: [
    { id: 3, name: 'Audit Fees' },
    { id: 4, name: 'Consulting Services' },
  ],
  3: [
    { id: 5, name: 'Advertising' },
    { id: 6, name: 'Events' },
  ],
};
 
const units = [
  { id: 1, name: 'Headquarters' },
  { id: 2, name: 'Regional Office' },
  { id: 3, name: 'Branch Office' },
];
 
const formSchema = z.object({
  headId: z.string().min(1, { message: 'Please select a head' }),
  particularId: z.string().min(1, { message: 'Please select a particular' }),
  unitId: z.string().min(1, { message: 'Please select a unit' }),
  proposedAmount: z.string().min(1, { message: 'Amount is required' }),
  supportingDocs: z.any().optional(),
  calculations: z.string().optional(),
  remarks: z.string().optional(),
});
 
type FormValues = z.infer<typeof formSchema>;
 
const BudgetProposalForm = () => {
  const [selectedHead, setSelectedHead] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headId: '',
      particularId: '',
      unitId: '',
      proposedAmount: '',
      calculations: '',
      remarks: '',
    },
  });
 
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Submitting proposal:', data);
      toast.success('Budget proposal submitted successfully');
      form.reset();
      setSelectedHead(null);
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
                  onValueChange={field.onChange}
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
 
          <FormField
            control={form.control}
            name="unitId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Unit</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id.toString()}>
                        {unit.name}
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
            name="proposedAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proposed Amount</FormLabel>
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
                Upload any supporting documents for your budget proposal (PDF, XLS, DOC)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
 
        <FormField
          control={form.control}
          name="calculations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supporting Calculations</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter calculations or notes about how you arrived at the proposed amount"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
 
        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remarks</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any additional remarks or justification"
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
            {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset Form
          </Button>
        </div>
      </form>
    </Form>
  );
};
 
export default BudgetProposalForm;
