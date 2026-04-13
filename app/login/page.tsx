'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { BrainCircuit, Eye, EyeOff, Loader as Loader2, Users, TrendingUp, Zap } from 'lucide-react';
import { toast } from 'sonner';

const features = [
  { icon: BrainCircuit, title: 'AI-Powered Screening', desc: 'Gemini 2.5 Pro analyzes every candidate instantly' },
  { icon: TrendingUp, title: 'Match Score Ranking', desc: 'Objective scores replace subjective gut feelings' },
  { icon: Users, title: 'Talent Pipeline', desc: 'Track candidates from apply to hire in one place' },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('recruiter@umurava.com');
  const [password, setPassword] = useState('password');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success('Welcome back! Redirecting to dashboard...');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-slate-900 p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-slate-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xl font-bold tracking-tight">TalentAI</span>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight">
              Hire smarter.<br />
              <span className="text-blue-400">Screen faster.</span>
            </h1>
            <p className="mt-4 text-slate-400 text-lg leading-relaxed max-w-sm">
              AI-powered recruitment that surfaces the best candidates in seconds, not days.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <f.icon className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{f.title}</p>
                  <p className="text-slate-500 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {['https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=40',
                'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=40',
                'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=40',
              ].map((src, i) => (
                <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" />
              ))}
            </div>
            <p className="text-slate-400 text-sm">
              <span className="text-white font-semibold">2,400+</span> candidates screened this week
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-slate-600 text-sm">Powered by Red Team Pro</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <span className="text-slate-900 text-lg font-bold">TalentAI</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Sign in to your account</h2>
              <p className="text-slate-500 mt-1 text-sm">Welcome back, recruiter</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-11 border-gray-200 focus-visible:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                  <button type="button" className="text-blue-500 text-sm hover:text-blue-600 font-medium">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-11 pr-10 border-gray-200 focus-visible:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-slate-600 font-normal text-sm cursor-pointer">
                  Keep me signed in for 30 days
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-all"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </span>
                ) : 'Sign in'}
              </Button>
            </form>

            <div className="relative my-6">
              <Separator />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-slate-400">
                Demo credentials pre-filled
              </span>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <p className="text-blue-700 font-semibold text-sm">Hackathon Demo</p>
              </div>
              <p className="text-blue-600 text-xs leading-relaxed">
                This is the Umurava AI Hackathon demo. Click "Sign in" to explore the full recruiter dashboard with AI screening.
              </p>
            </div>
          </div>

          <p className="text-center text-slate-500 text-sm mt-6">
            Don&apos;t have an account?{' '}
            <button className="text-blue-500 font-semibold hover:text-blue-600">Request access</button>
          </p>
        </div>
      </div>
    </div>
  );
}
