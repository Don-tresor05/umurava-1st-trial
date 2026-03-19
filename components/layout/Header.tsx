'use client';

import { usePathname } from 'next/navigation';
import { Bell, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const pageInfo: Record<string, { title: string; description: string; action?: { label: string; href: string } }> = {
  '/dashboard': {
    title: 'Overview',
    description: 'Your recruitment pipeline at a glance',
    action: { label: 'Post a Job', href: '/dashboard/jobs' },
  },
  '/dashboard/jobs': {
    title: 'Job Postings',
    description: 'Manage your open positions',
    action: { label: 'New Job', href: '/dashboard/jobs' },
  },
  '/dashboard/applicants': {
    title: 'Applicants',
    description: 'All candidates across your pipeline',
  },
  '/dashboard/screening': {
    title: 'AI Screening',
    description: 'Automated AI-powered candidate analysis',
  },
  '/dashboard/settings': {
    title: 'Settings',
    description: 'Configure your workspace',
  },
};

export default function Header() {
  const pathname = usePathname();

  const currentPage = Object.entries(pageInfo)
    .sort((a, b) => b[0].length - a[0].length)
    .find(([key]) => pathname.startsWith(key));

  const info = currentPage?.[1] ?? { title: 'Dashboard', description: '' };

  return (
    <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-30">
      <div>
        <h1 className="text-lg font-bold text-slate-900 leading-none">{info.title}</h1>
        {info.description && <p className="text-xs text-slate-500 mt-0.5">{info.description}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search candidates, jobs..."
            className="pl-9 h-9 w-64 bg-gray-50 border-gray-200 text-sm focus-visible:ring-blue-500 rounded-lg"
          />
        </div>

        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
          <Bell className="w-4 h-4 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white" />
        </button>

        {info.action && (
          <Link href={info.action.href}>
            <Button size="sm" className="h-9 gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg">
              <Plus className="w-3.5 h-3.5" />
              {info.action.label}
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
