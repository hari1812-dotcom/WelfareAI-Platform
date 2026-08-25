import { useState } from 'react';
import { GitCompare, X, Sparkles, Check } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MatchScore } from '@/components/shared/MatchScore';
import { VerificationBadge } from '@/components/shared/VerificationBadge';
import { schemes } from '@/data/mockData';
import type { Scheme } from '@/types';

export function ComparePage() {
  const [selected, setSelected] = useState<string[]>([schemes[0].id, schemes[1].id]);

  const toggleScheme = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const selectedSchemes = schemes.filter((s) => selected.includes(s.id));
  const availableSchemes = schemes.filter((s) => !selected.includes(s.id));

  const fields: { label: string; render: (s: Scheme) => React.ReactNode }[] = [
    { label: 'Match Score', render: (s) => <MatchScore score={s.matchScore} size="sm" showLabel={false} /> },
    { label: 'Benefit', render: (s) => <span className="text-sm font-semibold text-navy-800">{s.benefitAmount}</span> },
    { label: 'Eligibility', render: (s) => <span className="text-xs text-navy-600">{s.eligibility[0]}</span> },
    { label: 'Documents', render: (s) => <span className="text-xs text-navy-600">{s.documentsRequired.length} required</span> },
    { label: 'Processing Time', render: (s) => <span className="text-xs text-navy-600">{s.processingTime}</span> },
    { label: 'Deadline', render: (s) => <span className="text-xs text-navy-600">{s.deadline}</span> },
    { label: 'Provider', render: (s) => <span className="text-xs text-navy-600">{s.provider}</span> },
    { label: 'Verification', render: (s) => <VerificationBadge status={s.verification} /> },
    { label: 'Application Method', render: (s) => <span className="text-xs text-navy-600">{s.applicationMethod}</span> },
  ];

  return (
    <DashboardLayout title="Compare Schemes" subtitle="Compare up to three schemes side by side">
      {selectedSchemes.length === 0 ? (
        <Card className="p-8 text-center">
          <GitCompare className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-3 text-sm text-gray-500">Select schemes below to start comparing.</p>
        </Card>
      ) : (
        <div className="mb-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-40 p-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Comparison</th>
                {selectedSchemes.map((s) => (
                  <th key={s.id} className="min-w-[200px] p-3 text-left align-top">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-navy-900">{s.name}</p>
                        <p className="mt-0.5 text-xs text-gray-500">{s.provider}</p>
                      </div>
                      <button onClick={() => toggleScheme(s.id)} aria-label="Remove scheme" className="shrink-0 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-error-600">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields.map((field, i) => (
                <tr key={field.label} className={i % 2 === 0 ? 'bg-gray-50/50' : ''}>
                  <td className="p-3 text-xs font-semibold text-gray-500">{field.label}</td>
                  {selectedSchemes.map((s) => (
                    <td key={s.id} className="p-3 align-top">{field.render(s)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedSchemes.length >= 2 && (
        <Card className="mb-6 p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-navy-900">AI Trade-off Summary</h3>
            <Badge variant="warning" className="ml-1">Demo</Badge>
          </div>
          <p className="text-sm text-navy-600 leading-relaxed">
            {selectedSchemes[0].name} offers {selectedSchemes[0].benefitAmount} with {selectedSchemes[0].matchScore}% match and {selectedSchemes[0].processingTime} processing time.
            {' '}{selectedSchemes[1].name} offers {selectedSchemes[1].benefitAmount} with {selectedSchemes[1].matchScore}% match and {selectedSchemes[1].processingTime} processing time.
            {selectedSchemes.length === 3 && ` ${selectedSchemes[2].name} offers ${selectedSchemes[2].benefitAmount} with ${selectedSchemes[2].matchScore}% match.`}
            {' '}Consider applying for the highest match first, then use the others as backup options. The AI trade-off analysis will provide deeper insights once the rules engine is connected.
          </p>
        </Card>
      )}

      {availableSchemes.length > 0 && selected.length < 3 && (
        <div>
          <h3 className="mb-3 text-sm font-bold text-navy-900">Add a scheme to compare ({selected.length}/3 selected)</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {availableSchemes.map((s) => (
              <button
                key={s.id}
                onClick={() => toggleScheme(s.id)}
                disabled={selected.length >= 3}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:border-primary-300 hover:shadow-card disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div>
                  <p className="text-sm font-bold text-navy-900">{s.name}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{s.provider}</p>
                </div>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-gray-400">
                  <Check className="h-4 w-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
