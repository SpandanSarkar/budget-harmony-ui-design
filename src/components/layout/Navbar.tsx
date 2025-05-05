
import React from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/hooks/useSidebar';

const Navbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-secondary shadow-sm">
      <div className="flex h-16 items-center px-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 lg:hidden text-white">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold text-white">BudgetHarmony</span>
          </Link>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline" size="sm" className="text-white bg-primary hover:bg-primary/90">
            Help
          </Button>
          <Button size="sm" className="bg-white text-primary hover:bg-white/90">
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
