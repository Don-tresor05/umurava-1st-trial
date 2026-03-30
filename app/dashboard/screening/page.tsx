'use client';

import { useState } from 'react';
import { mockApplicants, mockJobs } from '@/lib/mock-data';
import type { Applicant } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { BrainCircuit, Zap, CircleCheck as CheckCircle2, Circle as XCircle, CircleAlert as AlertCircle, ThumbsUp, ChevronRight, Play, Cpu, Star, TrendingUp, Users, RefreshCw, ChartBar as BarChart3, ArrowUpRight, Clock, Loader as Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const recommendationConfig = {
  'Strongly Recommend': { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2, dot: 'bg-emerald-500' },
  'Recommend': { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: ThumbsUp, dot: 'bg-blue-500' },
  'Consider': { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: AlertCircle, dot: 'bg-amber-500' },
  'Not Recommended': { color: 'bg-red-50 text-red-700 border-red-200', icon: XCircle, dot: 'bg-red-500' },
};

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 85 ? '#10b981' : score >= 70 ? '#3b82f6' : score >= 55 ? '#f59e0b' : '#ef4444';
  const textColor = score >= 85 ? 'text-emerald-600' : score >= 70 ? 'text-blue-600' : score >= 55 ? 'text-amber-600' : 'text-red-600';
  return (
    <div className="relative w-14 h-14 flex-shrink-0">
      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
        <circle
          cx="18" cy="18" r="15.9" fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={`${score} ${100 - score}`}
          strokeLinecap="round"
        />
      </svg>
      <span className={cn('absolute inset-0 flex items-center justify-center text-xs font-black tabular-nums', textColor)}>
        {score}
      </span>
    </div>
  );
}

function ScreeningCard({ applicant, jobTitle }: { applicant: Applicant; jobTitle: string }) {
  const { screening } = applicant;
  if (!screening) return null;

  const rec = recommendationConfig[screening.recommendation];
  const RecIcon = rec.icon;

  return (
    <Link href={`/dashboard/applicants/${applicant.id}`}>
      <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <ScoreGauge score={screening.matchScore} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                    {applicant.firstName} {applicant.lastName}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{applicant.headline}</p>
                </div>
                <span className={cn('inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full border flex-shrink-0', rec.color)}>
                  <RecIcon className="w-3 h-3" />
                  {screening.recommendation === 'Strongly Recommend' ? 'Strong Match' : screening.recommendation}
                </span>
              </div>

              <p className="text-xs text-blue-600 font-medium mt-1">{jobTitle}</p>

              <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{screening.summary}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {screening.strengths.slice(0, 2).map((s) => (
                  <span key={s} className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <CheckCircle2 className="w-2.5 h-2.5" /> {s}
                  </span>
                ))}
                {screening.gaps.slice(0, 1).map((g) => (
                  <span key={g} className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-red-50 text-red-600 border border-red-100">
                    <XCircle className="w-2.5 h-2.5" /> {g}
                  </span>
                ))}
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ScreeningPage() {
  const [selectedJob, setSelectedJob] = useState<string>('all');
  const [running, setRunning] = useState(false);

  const screened = mockApplicants.filter((a) => a.screening);
  const pending = mockApplicants.filter((a) => !a.screening);

  const filtered = screened
    .filter((a) => selectedJob === 'all' || a.jobId === selectedJob)
    .sort((a, b) => (b.screening?.matchScore ?? 0) - (a.screening?.matchScore ?? 0));

  const avgScore = Math.round(filtered.reduce((acc, a) => acc + (a.screening?.matchScore ?? 0), 0) / (filtered.length || 1));

  const distribution = {
    'Strongly Recommend': filtered.filter(a => a.screening?.recommendation === 'Strongly Recommend').length,
    'Recommend': filtered.filter(a => a.screening?.recommendation === 'Recommend').length,
    'Consider': filtered.filter(a => a.screening?.recommendation === 'Consider').length,
    'Not Recommended': filtered.filter(a => a.screening?.recommendation === 'Not Recommended').length,
  };

  const handleRunScreening = async () => {
    setRunning(true);
    await new Promise((r) => setTimeout(r, 2000));
    setRunning(false);
    toast.success(`AI screening complete! Analyzed ${pending.length} candidates.`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Total Screened</p>
                <p className="text-2xl font-black text-slate-900 mt-0.5">{screened.length}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <Cpu className="w-4.5 h-4.5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Avg Match Score</p>
                <p className="text-2xl font-black text-blue-600 mt-0.5">{avgScore}%</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <BarChart3 className="w-4.5 h-4.5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Strong Matches</p>
                <p className="text-2xl font-black text-emerald-600 mt-0.5">
                  {filtered.filter(a => (a.screening?.matchScore ?? 0) >= 85).length}
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Star className="w-4.5 h-4.5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Pending Queue</p>
                <p className="text-2xl font-black text-amber-600 mt-0.5">{pending.length}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                <Clock className="w-4.5 h-4.5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-5">
          <Card className="border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <p className="text-white font-semibold text-sm">AI Engine</p>
                <span className="ml-auto text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
                  Live
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Powered by <span className="text-blue-400 font-semibold">Gemini 2.5 Pro</span>.
                Analyzes skills, experience, projects, and cultural fit against job requirements.
              </p>
              <Button
                onClick={handleRunScreening}
                disabled={running || pending.length === 0}
                className="w-full h-9 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg gap-2"
              >
                {running ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Screening...</>
                ) : (
                  <><Play className="w-4 h-4" /> Screen {pending.length} Pending</>
                )}
              </Button>
            </div>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-slate-900">Recommendation Split</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-1">
              {Object.entries(distribution).map(([rec, count]) => {
                const config = recommendationConfig[rec as keyof typeof recommendationConfig];
                const pct = filtered.length > 0 ? Math.round((count / filtered.length) * 100) : 0;
                return (
                  <div key={rec}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className={cn('w-2 h-2 rounded-full', config.dot)} />
                        <span className="text-xs text-slate-600 font-medium">
                          {rec === 'Strongly Recommend' ? 'Strong' : rec === 'Not Recommended' ? 'Not Rec.' : rec}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 tabular-nums">{count}</span>
                        <span className="text-[10px] text-slate-400">({pct}%)</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={cn('h-full rounded-full', config.dot)} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Filter by Job</h3>
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger className="h-9 border-gray-200 text-sm rounded-lg">
                  <SelectValue placeholder="All Jobs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  {mockJobs.map((j) => (
                    <SelectItem key={j.id} value={j.id}>{j.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Screened Candidates</h2>
              <p className="text-xs text-slate-500 mt-0.5">Ranked by AI match score, highest first</p>
            </div>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs border-gray-200 text-slate-600">
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </Button>
          </div>

          <div className="space-y-3">
            {filtered.map((applicant) => {
              const job = mockJobs.find((j) => j.id === applicant.jobId);
              return (
                <ScreeningCard key={applicant.id} applicant={applicant} jobTitle={job?.title ?? ''} />
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <BrainCircuit className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No screened candidates</p>
              <p className="text-sm mt-1">Run the AI screening engine to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
