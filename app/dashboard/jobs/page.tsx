'use client';

import { useState } from 'react';
import { mockJobs } from '@/lib/mock-data';
import type { Job, JobStatus } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Briefcase, MapPin, Users, Cpu, CircleCheck as CheckCircle2, Clock, ChevronRight, Search, Filter, MoveVertical as MoreVertical, Plus, TrendingUp, DollarSign, Calendar, Globe, Building } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const statusConfig: Record<JobStatus, { label: string; color: string; dot: string }> = {
  active: { label: 'Active', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  draft: { label: 'Draft', color: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-600 border-gray-200', dot: 'bg-gray-400' },
};

const tabs = ['All', 'Active', 'Draft', 'Closed'] as const;

function JobCard({ job }: { job: Job }) {
  const sc = statusConfig[job.status];
  const screenedPct = job.applicantsCount > 0 ? Math.round((job.screenedCount / job.applicantsCount) * 100) : 0;

  return (
    <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">{job.title}</h3>
                <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1', sc.color)}>
                  <span className={cn('w-1.5 h-1.5 rounded-full', sc.dot)} />
                  {sc.label}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Building className="w-3 h-3" />{job.department}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="w-3 h-3" />{job.location}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Globe className="w-3 h-3" />{job.type}
                </span>
                {job.salaryMin && (
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <DollarSign className="w-3 h-3" />
                    {job.salaryMin.toLocaleString()} – {job.salaryMax?.toLocaleString()} {job.currency}/mo
                  </span>
                )}
              </div>
            </div>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-slate-500 mt-4 line-clamp-2 leading-relaxed">{job.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {job.skills.map((skill) => (
            <span key={skill} className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="text-center">
              <p className="text-lg font-bold text-slate-900">{job.applicantsCount}</p>
              <p className="text-[10px] text-slate-400">Applied</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-blue-600">{job.screenedCount}</p>
              <p className="text-[10px] text-slate-400">Screened</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-emerald-600">{job.shortlistedCount}</p>
              <p className="text-[10px] text-slate-400">Shortlisted</p>
            </div>
          </div>

          <div className="flex-1 max-w-32">
            <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
              <span>Screened</span>
              <span>{screenedPct}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${screenedPct}%` }}
              />
            </div>
          </div>

          <Link href={`/dashboard/applicants?job=${job.id}`}>
            <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5 border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 font-medium">
              View Applicants
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {job.closingDate && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            Closes {new Date(job.closingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('All');
  const [search, setSearch] = useState('');

  const filtered = mockJobs.filter((j) => {
    const matchesTab = activeTab === 'All' || j.status === activeTab.toLowerCase();
    const matchesSearch = j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.department.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const counts = {
    All: mockJobs.length,
    Active: mockJobs.filter(j => j.status === 'active').length,
    Draft: mockJobs.filter(j => j.status === 'draft').length,
    Closed: mockJobs.filter(j => j.status === 'closed').length,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeTab === tab
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-gray-50'
              )}
            >
              {tab}
              <span className={cn(
                'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                activeTab === tab ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              )}>
                {counts[tab]}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 w-52 border-gray-200 bg-white text-sm rounded-lg focus-visible:ring-blue-500"
            />
          </div>
          <Button size="sm" className="h-9 gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
            <Plus className="w-3.5 h-3.5" />
            New Job
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((job) => <JobCard key={job.id} job={job} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No jobs found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
