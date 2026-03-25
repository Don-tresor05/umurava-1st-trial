'use client';

import { useState } from 'react';
import { mockApplicants, mockJobs } from '@/lib/mock-data';
import type { Applicant, ApplicationStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Search, Filter, ArrowUpDown, ArrowUp, ArrowDown, Star, BrainCircuit, MapPin, ChevronRight, Users, Cpu, SlidersHorizontal, CircleCheck as CheckCircle2, Clock, Circle as XCircle, Briefcase, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const statusConfig: Record<ApplicationStatus, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'Pending', color: 'bg-gray-100 text-gray-600 border-gray-200', icon: Clock },
  screening: { label: 'Screening', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: BrainCircuit },
  shortlisted: { label: 'Shortlisted', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  rejected: { label: 'Rejected', color: 'bg-red-50 text-red-600 border-red-200', icon: XCircle },
  hired: { label: 'Hired', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: Star },
};

function MatchScore({ score }: { score: number }) {
  const { bar, text } = score >= 85
    ? { bar: 'bg-emerald-500', text: 'text-emerald-700' }
    : score >= 70
    ? { bar: 'bg-blue-500', text: 'text-blue-700' }
    : score >= 55
    ? { bar: 'bg-amber-500', text: 'text-amber-700' }
    : { bar: 'bg-red-400', text: 'text-red-600' };

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
        <div className={cn('h-full rounded-full', bar)} style={{ width: `${score}%` }} />
      </div>
      <span className={cn('text-sm font-bold tabular-nums', text)}>{score}%</span>
    </div>
  );
}

type SortField = 'score' | 'name' | 'applied' | 'status';
type SortDir = 'asc' | 'desc';

export default function ApplicantsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [jobFilter, setJobFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('score');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const filtered = mockApplicants
    .filter((a) => {
      const name = `${a.firstName} ${a.lastName}`.toLowerCase();
      const matchesSearch = name.includes(search.toLowerCase()) || a.email.includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
      const matchesJob = jobFilter === 'all' || a.jobId === jobFilter;
      return matchesSearch && matchesStatus && matchesJob;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortField === 'score') {
        cmp = (a.screening?.matchScore ?? 0) - (b.screening?.matchScore ?? 0);
      } else if (sortField === 'name') {
        cmp = a.firstName.localeCompare(b.firstName);
      } else if (sortField === 'applied') {
        cmp = new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime();
      } else if (sortField === 'status') {
        cmp = a.status.localeCompare(b.status);
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />;
    return sortDir === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-blue-500" /> : <ArrowDown className="w-3.5 h-3.5 text-blue-500" />;
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 text-xs font-semibold text-slate-500 uppercase tracking-wider hover:text-blue-600 transition-colors"
    >
      {children}
      <SortIcon field={field} />
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 border-gray-200 bg-white text-sm focus-visible:ring-blue-500 rounded-lg"
          />
        </div>

        <Select value={jobFilter} onValueChange={setJobFilter}>
          <SelectTrigger className="h-9 w-52 border-gray-200 bg-white text-sm rounded-lg">
            <Briefcase className="w-3.5 h-3.5 text-gray-400 mr-1" />
            <SelectValue placeholder="All Jobs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            {mockJobs.map((j) => (
              <SelectItem key={j.id} value={j.id}>{j.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-40 border-gray-200 bg-white text-sm rounded-lg">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 mr-1" />
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="screening">Screening</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <div className="ml-auto text-sm text-slate-500 font-medium">
          {filtered.length} candidate{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3.5">
                  <SortButton field="name">Candidate</SortButton>
                </th>
                <th className="text-left px-4 py-3.5 hidden md:table-cell">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Position</span>
                </th>
                <th className="text-left px-4 py-3.5 hidden lg:table-cell">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</span>
                </th>
                <th className="text-left px-4 py-3.5">
                  <SortButton field="score">AI Score</SortButton>
                </th>
                <th className="text-left px-4 py-3.5">
                  <SortButton field="status">Status</SortButton>
                </th>
                <th className="text-left px-4 py-3.5 hidden sm:table-cell">
                  <SortButton field="applied">Applied</SortButton>
                </th>
                <th className="px-4 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((applicant) => {
                const sc = statusConfig[applicant.status];
                const StatusIcon = sc.icon;
                const job = mockJobs.find((j) => j.id === applicant.jobId);
                return (
                  <tr key={applicant.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {applicant.avatarUrl ? (
                          <img
                            src={applicant.avatarUrl}
                            alt=""
                            className="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-sm"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {applicant.firstName[0]}{applicant.lastName[0]}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 text-sm">{applicant.firstName} {applicant.lastName}</p>
                          <p className="text-xs text-slate-400 truncate max-w-[180px]">{applicant.headline}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <p className="text-sm text-slate-700 font-medium">{job?.title}</p>
                      <p className="text-xs text-slate-400">{job?.department}</p>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        {applicant.location}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {applicant.screening ? (
                        <MatchScore score={applicant.screening.matchScore} />
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Cpu className="w-3.5 h-3.5 animate-pulse" />
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn('inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border', sc.color)}>
                        <StatusIcon className="w-3 h-3" />
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="text-sm text-slate-500">
                        {new Date(applicant.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <Link href={`/dashboard/applicants/${applicant.id}`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No candidates found</p>
            <p className="text-sm mt-1">Adjust your filters to see results</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-slate-500 px-1">
        <p>Showing <span className="font-semibold text-slate-700">{filtered.length}</span> of <span className="font-semibold text-slate-700">{mockApplicants.length}</span> candidates</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs border-gray-200">Previous</Button>
          <Button variant="outline" size="sm" className="h-8 text-xs border-gray-200 bg-blue-50 text-blue-600 border-blue-200">1</Button>
          <Button variant="outline" size="sm" className="h-8 text-xs border-gray-200">Next</Button>
        </div>
      </div>
    </div>
  );
}
