
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/hooks/useSidebar';

const AppLayoutContent = () => {
  const { isOpen } = useSidebar();

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar />
      <div 
        className={cn(
          "flex-1 transition-all duration-300",
          isOpen ? "ml-60" : "ml-16"
        )}
      >
        <Navbar />
        <main className="container max-w-7xl py-8 px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppLayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
