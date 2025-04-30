
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { X } from 'lucide-react';

// Mock GL data
const glOptions = [
  { id: 1, code: 'GL001', name: 'Operating Expenses' },
  { id: 2, code: 'GL002', name: 'Capital Expenditure' },
  { id: 3, code: 'GL003', name: 'Salaries & Wages' },
  { id: 4, code: 'GL004', name: 'Professional Fees' },
  { id: 5, code: 'GL005', name: 'Marketing & Advertising' },
];

const BudgetGLAllocationModal = ({ open, onOpenChange, item }) => {
  const [allocations, setAllocations] = useState([
    { glId: 1, percentage: 70, amount: 0 },
    { glId: 2, percentage: 30, amount: 0 },
  ]);

  const [availableGLs, setAvailableGLs] = useState([]);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  useEffect(() => {
    if (item) {
      setFinalAmount(item.finalAmount || 0);
      
      // Update amounts based on percentages
      const updatedAllocations = allocations.map(alloc => ({
        ...alloc,
        amount: (alloc.percentage / 100) * (item.finalAmount || 0)
      }));
      
      setAllocations(updatedAllocations);
      
      // Calculate total percentage
      const total = updatedAllocations.reduce((sum, alloc) => sum + alloc.percentage, 0);
      setTotalPercentage(total);
      
      // Set available GLs (those not already allocated)
      const allocatedGLIds = updatedAllocations.map(a => a.glId);
      setAvailableGLs(glOptions.filter(gl => !allocatedGLIds.includes(gl.id)));
    }
  }, [item]);

  const handlePercentageChange = (index, value) => {
    const newValue = value === '' ? 0 : parseFloat(value);
    const newAllocations = [...allocations];
    newAllocations[index].percentage = newValue;
    newAllocations[index].amount = (newValue / 100) * finalAmount;
    
    setAllocations(newAllocations);
    
    // Calculate total percentage
    const total = newAllocations.reduce((sum, alloc) => sum + alloc.percentage, 0);
    setTotalPercentage(total);
  };

  const handleAddGL = () => {
    if (availableGLs.length === 0) {
      toast.error('No more GL accounts available');
      return;
    }
    
    setAllocations([
      ...allocations,
      { glId: availableGLs[0].id, percentage: 0, amount: 0 }
    ]);
    
    // Update available GLs
    setAvailableGLs(availableGLs.slice(1));
  };

  const handleRemoveGL = (index) => {
    const removed = allocations[index];
    const newAllocations = allocations.filter((_, i) => i !== index);
    
    setAllocations(newAllocations);
    
    // Add the removed GL back to available GLs
    const removedGL = glOptions.find(gl => gl.id === removed.glId);
    if (removedGL) {
      setAvailableGLs([...availableGLs, removedGL]);
    }
    
    // Recalculate total percentage
    const total = newAllocations.reduce((sum, alloc) => sum + alloc.percentage, 0);
    setTotalPercentage(total);
  };

  const handleSaveAllocation = () => {
    if (totalPercentage !== 100) {
      toast.error('Total allocation must be exactly 100%');
      return;
    }
    
    toast.success('GL allocation saved successfully');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>GL Allocation</DialogTitle>
          <DialogDescription>
            Allocate budget for {item?.particular} (${(item?.finalAmount || 0).toLocaleString()}) across GL accounts. Total allocation must equal 100%.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium">
            Current Total: <span className={totalPercentage === 100 ? 'text-green-500' : 'text-red-500'}>{totalPercentage}%</span>
          </div>
          <Button onClick={handleAddGL} disabled={availableGLs.length === 0}>
            Add GL
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>GL Code</TableHead>
                <TableHead>GL Name</TableHead>
                <TableHead className="text-right">Percentage (%)</TableHead>
                <TableHead className="text-right">Amount ($)</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocations.map((allocation, index) => {
                const gl = glOptions.find(g => g.id === allocation.glId);
                return (
                  <TableRow key={index}>
                    <TableCell>{gl?.code}</TableCell>
                    <TableCell>{gl?.name}</TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={allocation.percentage}
                        onChange={(e) => handlePercentageChange(index, e.target.value)}
                        className="w-24 ml-auto"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      ${allocation.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      {allocations.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveGL(index)}
                          className="p-0 h-8 w-8"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveAllocation}
            disabled={totalPercentage !== 100}
          >
            Save Allocation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetGLAllocationModal;
