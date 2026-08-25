import { useState } from 'react';
import { SlidersHorizontal, TrendingUp, TrendingDown, Sparkles, Info } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { states, occupations, incomeBrackets, schemes } from '@/data/mockData';

export function WhatIfPage() {
  const [income, setIncome] = useState('₹2.5-5 lakh');
  const [state, setState] = useState('Maharashtra');
  const [age, setAge] = useState('24');
  const [occupation, setOccupation] = useState('Student');
  const [familySize, setFamilySize] = useState('4');
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzed(true);
  };

  return (
    <DashboardLayout title="What-If Simulator" subtitle="See how changes in your situation may affect scheme eligibility">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="p-5">
            <div className="mb-4 flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-primary-600" />
              <h2 className="text-base font-bold text-navy-900">Your Scenario</h2>
            </div>
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div>
                <label className="label-base">Annual Income</label>
                <select value={income} onChange={(e) => setIncome(e.target.value)} className="input-base">
                  {incomeBrackets.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="label-base">Location (State)</label>
                <select value={state} onChange={(e) => setState(e.target.value)} className="input-base">
                  {states.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="label-base">Age</label>
                <input type="number" min={1} max={120} value={age} onChange={(e) => setAge(e.target.value)} className="input-base" />
              </div>
              <div>
                <label className="label-base">Occupation</label>
                <select value={occupation} onChange={(e) => setOccupation(e.target.value)} className="input-base">
                  {occupations.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="label-base">Family Size</label>
                <input type="number" min={1} max={20} value={familySize} onChange={(e) => setFamilySize(e.target.value)} className="input-base" />
              </div>
              <Button type="submit" size="lg" className="w-full">
                <Sparkles className="h-5 w-5" /> Analyze Changes
              </Button>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {!analyzed ? (
            <Card className="flex h-full min-h-[300px] flex-col items-center justify-center p-8 text-center">
              <SlidersHorizontal className="h-12 w-12 text-gray-300" />
              <p className="mt-4 text-sm text-gray-500">Adjust your scenario and click "Analyze Changes" to see how your eligibility may be affected.</p>
            </Card>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 rounded-xl border border-accent-200 bg-accent-50 p-3">
                <Info className="h-4 w-4 shrink-0 text-accent-600" />
                <p className="text-xs text-accent-800">These results are a demonstration based on mock data. The actual rules engine will be connected in a future stage.</p>
              </div>

              <Card className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-success-50 text-success-600">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-navy-900">Schemes that may remain available</h3>
                </div>
                <div className="space-y-2">
                  {schemes.filter((s) => s.matchScore >= 80).map((s) => (
                    <div key={s.id} className="flex items-center justify-between rounded-xl border border-gray-200 p-3">
                      <div>
                        <p className="text-sm font-bold text-navy-900">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.provider}</p>
                      </div>
                      <Badge variant="success">{s.matchScore}% match</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-error-50 text-error-600">
                    <TrendingDown className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-navy-900">Schemes that may become unavailable</h3>
                </div>
                <div className="space-y-2">
                  {schemes.filter((s) => s.matchScore < 80).map((s) => (
                    <div key={s.id} className="flex items-center justify-between rounded-xl border border-gray-200 p-3">
                      <div>
                        <p className="text-sm font-bold text-navy-900">{s.name}</p>
                        <p className="text-xs text-gray-500">Income may exceed eligibility threshold</p>
                      </div>
                      <Badge variant="error">May lose eligibility</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-navy-900">New potential schemes</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-xl border border-gray-200 p-3">
                    <div>
                      <p className="text-sm font-bold text-navy-900">National Apprenticeship Training Scheme</p>
                      <p className="text-xs text-gray-500">Ministry of Education — newly matched based on age and occupation</p>
                    </div>
                    <Badge variant="primary">New match</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-gray-200 p-3">
                    <div>
                      <p className="text-sm font-bold text-navy-900">Stand-Up India Loan Scheme</p>
                      <p className="text-xs text-gray-500">Department of Financial Services — matched based on income change</p>
                    </div>
                    <Badge variant="primary">New match</Badge>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
