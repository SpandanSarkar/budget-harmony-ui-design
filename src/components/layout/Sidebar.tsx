
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Home, 
  FileText, 
  Settings, 
  ChevronLeft,
  FilePlus,
  FileX,
  Info,
  ChartBar,
  ArrowDownUp,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/utils';

const MenuItem = ({ 
  to, 
  icon: Icon, 
  label, 
  isActive 
}: { 
  to: string; 
  icon: React.ElementType; 
  label: string; 
  isActive: boolean 
}) => {
  return (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 px-3 font-normal text-white",
          isActive ? "bg-primary/60" : "hover:bg-primary/40"
        )}
      >
        <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-white/80")} />
        <span className={cn(isActive ? "text-white" : "text-white/80")}>
          {label}
        </span>
      </Button>
    </Link>
  );
};

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const location = useLocation();
  
  const menuItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/budget-timeframe", label: "Budget Time Frame", icon: Calendar },
    { path: "/budget-setup", label: "Head & GL Config", icon: FileText },
    { path: "/budget-entry", label: "Budget Entry", icon: FilePlus },
    { path: "/budget-review", label: "Review & Adjust", icon: FileText },
    { path: "/budget-transfer", label: "Budget Transfer", icon: ArrowDownUp },
    { path: "/budget-extension", label: "Extension Request", icon: FileX },
    { path: "/budget-approval", label: "Extension Approval", icon: Check },
    { path: "/budget-reporting", label: "Reporting & Audit", icon: ChartBar },
    { path: "/management-budget-summary", label: "Budget Summary", icon: FileText },
    { path: "/admin", label: "Administration", icon: Settings },
    { path: "/expense-validation", label: "Expense Validation", icon: Info },
  ];

  if (!isOpen) {
    return (
      <div className="fixed left-0 top-0 z-20 h-screen w-16 border-r bg-primary transition-all duration-300">
        <div className="flex h-16 items-center justify-center border-b border-white/20">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-white">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex flex-col items-center gap-2 py-4">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              size="icon"
              asChild
              className={cn(
                "text-white",
                location.pathname === item.path ? "bg-primary/60" : ""
              )}
            >
              <Link to={item.path}>
                <item.icon className={cn(
                  "h-5 w-5",
                  location.pathname === item.path ? "text-white" : "text-white/80"
                )} />
                <span className="sr-only">{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    );
  }
  
  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-60 border-r bg-primary transition-all duration-300">
      <div className="flex h-16 items-center justify-between px-4 border-b border-white/20">
        <span className="text-lg font-semibold text-white">Budget Module</span>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-white">
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <nav className="flex flex-col gap-1 p-2">
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            to={item.path}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.path}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
