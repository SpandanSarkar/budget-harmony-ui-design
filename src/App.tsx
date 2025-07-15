
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import TimeFramePage from "./pages/TimeFramePage";
import HeadGLConfigPage from "./pages/BudgetSetupPage";
import BudgetEntryPage from "./pages/BudgetEntryPage";
import BudgetReviewPage from "./pages/BudgetReviewPage";
import BudgetTransferPage from "./pages/BudgetTransferPage";
import BudgetExtensionPage from "./pages/BudgetExtensionPage";
import BudgetApprovalPage from "./pages/BudgetApprovalPage";
import BudgetReportingPage from "./pages/BudgetReportingPage";
import AdminConfigPage from "./pages/AdminConfigPage";
import ExpenseValidationPage from "./pages/ExpenseValidationPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/budget-timeframe" element={<TimeFramePage />} />
            <Route path="/budget-setup" element={<HeadGLConfigPage />} />
            <Route path="/budget-entry" element={<BudgetEntryPage />} />
            <Route path="/budget-review" element={<BudgetReviewPage />} />
            <Route path="/budget-transfer" element={<BudgetTransferPage />} />
            <Route path="/budget-extension" element={<BudgetExtensionPage />} />
            <Route path="/budget-approval" element={<BudgetApprovalPage />} />
            <Route path="/budget-reporting" element={<BudgetReportingPage />} />
            <Route path="/admin" element={<AdminConfigPage />} />
            <Route path="/expense-validation" element={<ExpenseValidationPage />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
