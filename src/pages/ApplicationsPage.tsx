import { useState } from 'react';
import { AlertCircle, Calendar } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ApplicationTimeline } from '@/components/shared/ApplicationTimeline';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { VerificationBadge } from '@/components/shared/VerificationBadge';
import { Card } from '@/components/ui/Card';
import { applications } from '@/data/mockData';
import type { Application } from '@/types';

export function ApplicationsPage() {
  const [selected, setSelected] = useState<Application>(applications[0]);

  return (
    <DashboardLayout title="My Applications" subtitle="Track the status of your scheme applications">
      {/* Deadline alerts */}
      {applications.filter((a) => a.deadline !== '—').length > 0 && (
        <div className="mb-6 space-y-3">
          {applications
            .filter((a) => a.deadline !== '—')
            .map((app) => (
              <div key={app.id} className="flex items-center gap-3 rounded-xl border border-warning-200 bg-warning-50 p-4">
                <AlertCircle className="h-5 w-5 shrink-0 text-warning-600" />
                <p className="text-sm text-warning-800">
                  <span className="font-bold">{app.schemeName}</span> — Deadline approaching: {app.deadline}
                </p>
              </div>
            ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Application list */}
        <div className="space-y-3 lg:col-span-1">
          {applications.map((app) => (
            <Card
              key={app.id}
              className={`cursor-pointer p-4 transition-all ${selected.id === app.id ? 'border-primary-500 ring-2 ring-primary-200' : 'hover:border-primary-300'}`}
              onClick={() => setSelected(app)}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-navy-900">{app.schemeName}</h3>
                <StatusBadge status={app.status} />
              </div>
              <p className="mt-1 text-xs text-gray-500">{app.provider}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {app.submittedDate}
                </span>
              </div>
              <div className="mt-2">
                <VerificationBadge status={app.verification} showLabel={false} />
              </div>
            </Card>
          ))}
        </div>

        {/* Timeline */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-navy-900">{selected.schemeName}</h2>
                <p className="mt-0.5 text-sm text-gray-500">{selected.provider}</p>
              </div>
              <StatusBadge status={selected.status} />
            </div>
            <div className="border-t border-gray-100 pt-5">
              <ApplicationTimeline application={selected} />
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
