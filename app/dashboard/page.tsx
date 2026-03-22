import { mockDashboardStats, mockApplicants, mockJobs, recentActivity } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Briefcase, Users, Cpu, TrendingUp, CircleCheck as CheckCircle2, Clock, ArrowUpRight, BrainCircuit, ChevronRight, Zap, Star } from 'lucide-react';

function StatCard({
  label, value, sublabel, icon: Icon, color, trend,
}: {
  label: string;
  value: string | number;
  sublabel: string;
  icon: React.ElementType;
  color: string;
  trend?: string;
}) {
  return (
    <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
            <p className="text-xs text-slate-400 mt-1">{sublabel}</p>
          </div>
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
        {trend && (
          <div className="flex items-center gap-1 mt-4 pt-4 border-t border-gray-100">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-600 text-xs font-medium">{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 85 ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
    : score >= 70 ? 'text-blue-700 bg-blue-50 border-blue-200'
    : score >= 55 ? 'text-amber-700 bg-amber-50 border-amber-200'
    : 'text-red-700 bg-red-50 border-red-200';
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full border ${color}`}>
      <Star className="w-3 h-3" />
      {score}%
    </span>
  );
}

const activityConfig = {
  screened: { label: 'Screened', color: 'bg-blue-50 text-blue-600', icon: BrainCircuit },
  applied: { label: 'Applied', color: 'bg-slate-50 text-slate-600', icon: Users },
  shortlisted: { label: 'Shortlisted', color: 'bg-emerald-50 text-emerald-600', icon: CheckCircle2 },
};

export default function DashboardPage() {
  const topApplicants = mockApplicants
    .filter((a) => a.screening)
    .sort((a, b) => (b.screening?.matchScore ?? 0) - (a.screening?.matchScore ?? 0))
    .slice(0, 4);

  const activeJobs = mockJobs.filter((j) => j.status === 'active').slice(0, 3);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Jobs"
          value={mockDashboardStats.activeJobs}
          sublabel={`of ${mockDashboardStats.totalJobs} total positions`}
          icon={Briefcase}
          color="bg-blue-50 text-blue-600"
          trend="+2 this week"
        />
        <StatCard
          label="Total Applicants"
          value={mockDashboardStats.totalApplicants}
          sublabel="across all positions"
          icon={Users}
          color="bg-slate-100 text-slate-600"
          trend="+18 today"
        />
        <StatCard
          label="Screened Today"
          value={mockDashboardStats.screenedToday}
          sublabel="by AI automatically"
          icon={Cpu}
          color="bg-violet-50 text-violet-600"
          trend="Real-time"
        />
        <StatCard
          label="Shortlisted"
          value={mockDashboardStats.shortlisted}
          sublabel={`avg score ${mockDashboardStats.avgMatchScore}%`}
          icon={CheckCircle2}
          color="bg-emerald-50 text-emerald-600"
          trend="+5 this week"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold text-slate-900">Top AI-Ranked Candidates</CardTitle>
              <Link href="/dashboard/applicants" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {topApplicants.map((applicant, idx) => (
                  <Link
                    key={applicant.id}
                    href={`/dashboard/applicants/${applicant.id}`}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                      {idx + 1}
                    </div>
                    {applicant.avatarUrl ? (
                      <img src={applicant.avatarUrl} alt="" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {applicant.firstName[0]}{applicant.lastName[0]}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                        {applicant.firstName} {applicant.lastName}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{applicant.headline}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <ScoreBadge score={applicant.screening!.matchScore} />
                      <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold text-slate-900">Active Positions</CardTitle>
              <Link href="/dashboard/jobs" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                All jobs <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {activeJobs.map((job) => {
                  const pct = job.applicantsCount > 0
                    ? Math.round((job.screenedCount / job.applicantsCount) * 100)
                    : 0;
                  return (
                    <Link
                      key={job.id}
                      href={`/dashboard/jobs`}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{job.title}</p>
                          <Badge variant="outline" className="text-[10px] px-1.5 border-green-200 text-green-700 bg-green-50">{job.type}</Badge>
                        </div>
                        <p className="text-xs text-slate-500">{job.location} · {job.department}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-slate-900">{job.applicantsCount}</p>
                        <p className="text-[10px] text-slate-400">{pct}% screened</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-900">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {recentActivity.map((item) => {
                  const config = activityConfig[item.type as keyof typeof activityConfig];
                  const Icon = config.icon;
                  return (
                    <div key={item.id} className="flex items-start gap-3 px-5 py-3.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${config.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800 leading-snug">
                          <span className="font-semibold">{item.candidate}</span>
                          {' '}{config.label === 'Applied' ? 'applied for' : config.label.toLowerCase() + ' for'}{' '}
                          <span className="text-blue-600">{item.job}</span>
                        </p>
                        {item.score && (
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            Score: <span className="font-semibold text-emerald-600">{item.score}%</span>
                          </p>
                        )}
                        <p className="text-[10px] text-slate-400 mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm bg-gradient-to-br from-slate-900 to-slate-800">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-blue-400" />
                <p className="text-white font-semibold text-sm">AI Summary</p>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Today&apos;s AI screening identified{' '}
                <span className="text-white font-semibold">3 standout candidates</span>{' '}
                for the Backend Engineer role. Avg match score is{' '}
                <span className="text-blue-400 font-semibold">81%</span>{' '}
                — 14 points above your historical average.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: 'Screened', value: '18' },
                  { label: 'Avg Score', value: '81%' },
                  { label: 'Top Match', value: '96%' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-white font-bold text-lg">{s.value}</p>
                    <p className="text-slate-500 text-[10px]">{s.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
