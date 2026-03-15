'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { BrainCircuit, Bell, Shield, User, Zap, Save, Building, Globe } from 'lucide-react';
import { toast } from 'sonner';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'ai', label: 'AI Settings', icon: BrainCircuit },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [autoScreen, setAutoScreen] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [highScoreAlert, setHighScoreAlert] = useState(true);

  const handleSave = () => toast.success('Settings saved successfully');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex gap-6">
        <div className="w-52 flex-shrink-0">
          <nav className="space-y-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 space-y-5">
          {activeTab === 'profile' && (
            <>
              <Card className="border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base">Organization Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Building className="w-7 h-7 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Umurava Inc.</p>
                      <p className="text-sm text-slate-500">Technology & AI Solutions</p>
                      <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">Change logo</Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-slate-700">First Name</Label>
                      <Input defaultValue="HR" className="h-9 border-gray-200 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-slate-700">Last Name</Label>
                      <Input defaultValue="Manager" className="h-9 border-gray-200 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-slate-700">Email</Label>
                      <Input defaultValue="recruiter@umurava.com" className="h-9 border-gray-200 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium text-slate-700">Role</Label>
                      <Input defaultValue="Recruitment Manager" className="h-9 border-gray-200 text-sm" />
                    </div>
                  </div>
                  <Button onClick={handleSave} className="h-9 bg-blue-600 hover:bg-blue-700 text-white text-sm gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'ai' && (
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-blue-500" />
                  <CardTitle className="text-base">AI Screening Configuration</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <p className="text-blue-800 font-semibold text-sm">Model: Gemini 2.5 Pro</p>
                  </div>
                  <p className="text-blue-600 text-xs">847 / 1,000 screening credits used this month</p>
                  <div className="h-1.5 bg-blue-200 rounded-full mt-2 overflow-hidden">
                    <div className="h-full w-[84.7%] bg-blue-500 rounded-full" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  {[
                    { id: 'auto', label: 'Auto-screen new applicants', desc: 'Automatically run AI screening when a new application is submitted', state: autoScreen, set: setAutoScreen },
                    { id: 'email', label: 'Email screening reports', desc: 'Send detailed AI analysis to your email after batch screening', state: emailAlerts, set: setEmailAlerts },
                    { id: 'high', label: 'High-score notifications', desc: 'Get notified when a candidate scores above 85%', state: highScoreAlert, set: setHighScoreAlert },
                  ].map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                      <Switch checked={item.state} onCheckedChange={item.set} />
                    </div>
                  ))}
                </div>

                <Separator />
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-slate-700">Minimum score threshold for shortlisting</Label>
                  <Input type="number" defaultValue="75" className="h-9 border-gray-200 text-sm w-28" min={0} max={100} />
                  <p className="text-xs text-slate-400">Candidates above this score are flagged for review</p>
                </div>
                <Button onClick={handleSave} className="h-9 bg-blue-600 hover:bg-blue-700 text-white text-sm gap-2">
                  <Save className="w-4 h-4" />
                  Save AI Settings
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  { label: 'New application received', desc: 'When someone applies to one of your jobs' },
                  { label: 'AI screening complete', desc: 'When batch AI screening finishes' },
                  { label: 'Strong candidate identified', desc: 'When AI scores a candidate 85%+' },
                  { label: 'Weekly digest', desc: 'Summary of pipeline activity every Monday' },
                ].map((n, i) => (
                  <div key={i} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{n.label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{n.desc}</p>
                    </div>
                    <Switch defaultChecked={i < 3} />
                  </div>
                ))}
                <Button onClick={handleSave} className="h-9 bg-blue-600 hover:bg-blue-700 text-white text-sm gap-2">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-slate-700">Current Password</Label>
                  <Input type="password" placeholder="••••••••" className="h-9 border-gray-200 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-slate-700">New Password</Label>
                  <Input type="password" placeholder="••••••••" className="h-9 border-gray-200 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-slate-700">Confirm New Password</Label>
                  <Input type="password" placeholder="••••••••" className="h-9 border-gray-200 text-sm" />
                </div>
                <Button onClick={handleSave} className="h-9 bg-blue-600 hover:bg-blue-700 text-white text-sm gap-2">
                  <Shield className="w-4 h-4" />
                  Update Password
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
