import { notFound } from 'next/navigation';
import { mockApplicants, mockJobs } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, MapPin, Mail, Globe, Github, Linkedin, CircleCheck as CheckCircle2, Circle as XCircle, CircleAlert as AlertCircle, Star, BrainCircuit, Briefcase, GraduationCap, Award, Code as Code2, Calendar, ExternalLink, Download, ThumbsUp, ThumbsDown, TrendingUp, Zap, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ApplicationStatus, SkillLevel } from '@/types';

const skillColors: Record<SkillLevel, string> = {
  Expert: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Advanced: 'bg-blue-50 text-blue-700 border-blue-200',
  Intermediate: 'bg-amber-50 text-amber-700 border-amber-200',
  Beginner: 'bg-gray-100 text-gray-600 border-gray-200',
};

const recommendationConfig = {
  'Strongly Recommend': { color: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: CheckCircle2 },
  'Recommend': { color: 'text-blue-700 bg-blue-50 border-blue-200', icon: ThumbsUp },
  'Consider': { color: 'text-amber-700 bg-amber-50 border-amber-200', icon: AlertCircle },
  'Not Recommended': { color: 'text-red-700 bg-red-50 border-red-200', icon: XCircle },
};

export default function ApplicantDetailPage({ params }: { params: { id: string } }) {
  const applicant = mockApplicants.find((a) => a.id === params.id);
  if (!applicant) notFound();

  const job = mockJobs.find((j) => j.id === applicant.jobId);
  const { screening } = applicant;
  const recConfig = screening ? recommendationConfig[screening.recommendation] : null;
  const RecIcon = recConfig?.icon;

  const scoreColor = (screening?.matchScore ?? 0) >= 85
    ? 'text-emerald-600' : (screening?.matchScore ?? 0) >= 70
    ? 'text-blue-600' : (screening?.matchScore ?? 0) >= 55
    ? 'text-amber-600' : 'text-red-600';

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/applicants">
          <Button variant="ghost" size="sm" className="gap-1.5 text-slate-500 hover:text-slate-900 -ml-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Applicants
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-5">
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6 text-center">
              {applicant.avatarUrl ? (
                <img
                  src={applicant.avatarUrl}
                  alt={`${applicant.firstName} ${applicant.lastName}`}
                  className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-blue-100 shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold ring-4 ring-blue-100 shadow-md">
                  {applicant.firstName[0]}{applicant.lastName[0]}
                </div>
              )}
              <h2 className="mt-4 text-xl font-bold text-slate-900">{applicant.firstName} {applicant.lastName}</h2>
              <p className="text-slate-500 text-sm mt-1 leading-snug">{applicant.headline}</p>
              <div className="flex items-center justify-center gap-1.5 mt-2 text-sm text-slate-400">
                <MapPin className="w-3.5 h-3.5" />
                {applicant.location}
              </div>

              <div className="flex items-center justify-center gap-3 mt-4">
                {applicant.socialLinks.linkedin && (
                  <a href={applicant.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {applicant.socialLinks.github && (
                  <a href={applicant.socialLinks.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-300 transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {applicant.socialLinks.portfolio && (
                  <a href={applicant.socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-colors">
                    <Globe className="w-4 h-4" />
                  </a>
                )}
                <a href={`mailto:${applicant.email}`} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100 space-y-2">
                <Button className="w-full h-9 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Shortlist Candidate
                </Button>
                <Button variant="outline" className="w-full h-9 text-sm border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
                  <XCircle className="w-4 h-4 mr-2" />
                  Decline
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-5 space-y-3">
              <h3 className="text-sm font-semibold text-slate-900">Application Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Applied to</span>
                  <span className="font-medium text-slate-800 text-right max-w-[160px]">{job?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date applied</span>
                  <span className="font-medium text-slate-800">
                    {new Date(applicant.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Availability</span>
                  <span className="font-medium text-slate-800">{applicant.availability.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status</span>
                  <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', {
                    'bg-emerald-100 text-emerald-700': applicant.status === 'shortlisted',
                    'bg-blue-100 text-blue-700': applicant.status === 'screening',
                    'bg-gray-100 text-gray-600': applicant.status === 'pending',
                    'bg-red-100 text-red-600': applicant.status === 'rejected',
                  })}>{applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Languages</h3>
              <div className="space-y-2">
                {applicant.languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">{lang.name}</span>
                    <span className="text-xs text-slate-500 bg-gray-100 px-2 py-0.5 rounded-full">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-5">
          {screening && (
            <Card className="border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <BrainCircuit className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider">Gemini AI Analysis</span>
                    </div>
                    <div className="flex items-end gap-3">
                      <span className={cn('text-5xl font-black tabular-nums', scoreColor)}>{screening.matchScore}%</span>
                      <div className="mb-1">
                        <p className="text-slate-400 text-xs">Match Score</p>
                        {recConfig && RecIcon && (
                          <span className={cn('inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border mt-1', recConfig.color)}>
                            <RecIcon className="w-3 h-3" />
                            {screening.recommendation}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#334155" strokeWidth="3" />
                        <circle
                          cx="18" cy="18" r="15.9" fill="none"
                          stroke={screening.matchScore >= 85 ? '#10b981' : screening.matchScore >= 70 ? '#3b82f6' : screening.matchScore >= 55 ? '#f59e0b' : '#ef4444'}
                          strokeWidth="3"
                          strokeDasharray={`${screening.matchScore} ${100 - screening.matchScore}`}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mt-4 leading-relaxed">{screening.summary}</p>
              </div>

              <CardContent className="p-5 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" /> Strengths
                    </h4>
                    <ul className="space-y-2">
                      {screening.strengths.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <ThumbsDown className="w-3.5 h-3.5 text-red-400" /> Gaps
                    </h4>
                    <ul className="space-y-2">
                      {screening.gaps.map((g) => (
                        <li key={g} className="flex items-start gap-2 text-sm text-slate-700">
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Skill Breakdown</h4>
                  <div className="space-y-2.5">
                    {screening.skillBreakdown.map((sb) => (
                      <div key={sb.skill}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-700 font-medium">{sb.skill}</span>
                          <span className={cn('font-bold tabular-nums text-xs',
                            sb.score >= 85 ? 'text-emerald-600' : sb.score >= 70 ? 'text-blue-600' : 'text-amber-600'
                          )}>{sb.score}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={cn('h-full rounded-full', sb.score >= 85 ? 'bg-emerald-500' : sb.score >= 70 ? 'bg-blue-500' : 'bg-amber-400')}
                            style={{ width: `${sb.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-500" /> Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {applicant.skills.map((skill) => (
                  <span key={skill.name} className={cn('flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border', skillColors[skill.level])}>
                    {skill.name}
                    <span className="opacity-60">·</span>
                    <span className="opacity-80">{skill.yearsOfExperience}yr</span>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-500" /> Work Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-5">
              {applicant.experience.map((exp, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-4 h-4 text-blue-500" />
                    </div>
                    {i < applicant.experience.length - 1 && <div className="w-px flex-1 bg-gray-100 mt-2" />}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{exp.role}</p>
                        <p className="text-blue-600 text-sm font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-slate-500">{exp.startDate} – {exp.endDate}</p>
                        {exp.isCurrent && <span className="text-[10px] text-emerald-600 font-semibold">Current</span>}
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {exp.technologies.map((t) => (
                        <span key={t} className="text-[11px] bg-gray-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-500" /> Education
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {applicant.education.map((edu, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-4 h-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{edu.degree} in {edu.fieldOfStudy}</p>
                      <p className="text-blue-600 text-xs font-medium">{edu.institution}</p>
                      <p className="text-slate-400 text-xs">{edu.startYear} – {edu.endYear}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {applicant.certifications.length > 0 && (
              <Card className="border-gray-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-500" /> Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  {applicant.certifications.map((cert, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                        <Award className="w-4 h-4 text-amber-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{cert.name}</p>
                        <p className="text-slate-500 text-xs">{cert.issuer} · {cert.issueDate}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {applicant.projects.length > 0 && (
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-blue-500" /> Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                {applicant.projects.map((proj, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-start justify-between">
                      <p className="font-semibold text-slate-900 text-sm">{proj.name}</p>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-blue-600 font-medium mt-0.5">{proj.role}</p>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {proj.technologies.map((t) => (
                        <span key={t} className="text-[11px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
