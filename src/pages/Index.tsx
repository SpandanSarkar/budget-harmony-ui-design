
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import {
  Calendar,
  FileText,
  FilePlus,
  FileX,
  Settings,
} from 'lucide-react';

const Index = () => {
  const modules = [
    {
      title: 'Budget Time Frame',
      description: 'Define and manage budget years and periods',
      icon: Calendar,
      link: '/budget-timeframe',
      color: 'bg-blue-100',
    },
    {
      title: 'Budget Setup',
      description: 'Configure budget heads and particulars',
      icon: FileText,
      link: '/budget-setup',
      color: 'bg-purple-100',
    },
    {
      title: 'Budget Proposal',
      description: 'Submit budget proposals for review',
      icon: FilePlus,
      link: '/budget-proposal',
      color: 'bg-orange-100',
    },
    {
      title: 'Budget Review',
      description: 'Review and adjust submitted proposals',
      icon: FileText,
      link: '/budget-review',
      color: 'bg-green-100',
    },
    {
      title: 'Budget Extensions',
      description: 'Request and approve budget extensions',
      icon: FileX,
      link: '/budget-extension',
      color: 'bg-red-100',
    },
    {
      title: 'Administration',
      description: 'Configure system settings and workflows',
      icon: Settings,
      link: '/admin',
      color: 'bg-slate-100',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Budget Management Module</h1>
        <p className="text-muted-foreground">
          Welcome to the comprehensive budget management system for your financial institution
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <Card key={module.title} className="overflow-hidden">
            <CardHeader className={`${module.color} p-6`}>
              <div className="flex items-center space-x-2">
                <module.icon className="h-8 w-8 text-primary" />
                <CardTitle>{module.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardDescription className="mb-4 text-base">
                {module.description}
              </CardDescription>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link to={module.link}>
                  Access Module
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
