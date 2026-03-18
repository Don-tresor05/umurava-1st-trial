'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BrainCircuit,
  LayoutDashboard,
  Briefcase,
  Users,
  Cpu,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { href: '/dashboard/jobs', icon: Briefcase, label: 'Jobs', badge: '4' },
  { href: '/dashboard/applicants', icon: Users, label: 'Applicants', badge: '142' },
  { href: '/dashboard/screening', icon: Cpu, label: 'AI Screening', badge: 'New', badgeVariant: 'primary' as const },
];

const bottomItems = [
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 flex flex-col bg-slate-900 border-r border-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <BrainCircuit className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-white font-bold text-base tracking-tight">TalentAI</span>
            <p className="text-slate-500 text-[10px] leading-none">by Umurava</p>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="mb-1">
          <p className="px-3 text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2">Recruitment</p>
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  )}
                >
                  <span className="flex items-center gap-3">
                    <item.icon className={cn('w-4 h-4 flex-shrink-0', isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300')} />
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className={cn(
                      'text-[10px] font-semibold px-1.5 py-0.5 rounded-full',
                      isActive
                        ? 'bg-blue-500 text-white'
                        : item.badgeVariant === 'primary'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700 group-hover:text-slate-400'
                    )}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-6">
          <p className="px-3 text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2">Workspace</p>
          <nav className="space-y-0.5">
            {bottomItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  )}
                >
                  <item.icon className={cn('w-4 h-4 flex-shrink-0', isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300')} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-6 mx-1">
          <div className="bg-gradient-to-br from-blue-600/30 to-blue-800/20 rounded-xl p-4 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <p className="text-white text-xs font-semibold">AI Credits</p>
            </div>
            <div className="flex items-end justify-between mb-2">
              <span className="text-2xl font-bold text-white">847</span>
              <span className="text-slate-400 text-xs">/ 1,000</span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full w-[84.7%] bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" />
            </div>
            <p className="text-slate-500 text-[10px] mt-1.5">153 screenings remaining</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            HR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">HR Manager</p>
            <p className="text-slate-500 text-xs truncate">Umurava Inc.</p>
          </div>
          <button className="text-slate-600 hover:text-red-400 transition-colors p-1 rounded" title="Sign out">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
