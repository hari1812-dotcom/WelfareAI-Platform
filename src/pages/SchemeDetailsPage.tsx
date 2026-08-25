import { useParams } from 'react-router-dom';
import {
  CheckCircle2, AlertTriangle, AlertCircle, Calendar, Building2,
  Wallet, FileText, ArrowRight, Star, ExternalLink, Info,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { Accordion } from '@/components/ui/Accordion';
import { VerificationBadge } from '@/components/shared/VerificationBadge';
import { MatchScore } from '@/components/shared/MatchScore';
import { EligibilityIndicator } from '@/components/shared/EligibilityIndicator';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { schemes, eligibilityFactors } from '@/data/mockData';

export function SchemeDetailsPage() {
  const { id } = useParams();
  const scheme = schemes.find((s) => s.id === id) ?? schemes[0];

  return (
    <DashboardLayout backTo="/schemes">
      {/* Header */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="mb-2">
              <VerificationBadge status={scheme.verification} size="md" />
            </div>
            <h1 className="text-2xl font-bold text-navy-900 lg:text-3xl">{scheme.name}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
              <Building2 className="h-4 w-4" /> {scheme.provider}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-navy-700">
                <Wallet className="h-4 w-4 text-primary-600" /> {scheme.benefitAmount}
              </span>
              <span className="flex items-center gap-1.5 text-navy-700">
                <Calendar className="h-4 w-4 text-accent-600" /> Deadline: {scheme.deadline}
              </span>
              <span className="flex items-center gap-1.5 text-navy-700">
                <FileText className="h-4 w-4 text-navy-500" /> {scheme.applicationMethod}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <MatchScore score={scheme.matchScore} size="lg" />
            <span className="text-xs font-semibold text-primary-600">Potentially Eligible</span>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button size="lg" className="flex-1">
            Check My Eligibility <ArrowRight className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="flex-1">
            Apply Now
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        items={[
          {
            id: 'overview',
            label: 'Overview',
            content: (
              <div className="space-y-6">
                <Card className="p-5">
                  <h3 className="mb-2 text-base font-bold text-navy-900">Summary</h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{scheme.overview}</p>
                </Card>

                {/* Eligibility Visualization */}
                <Card className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-base font-bold text-navy-900">Your Match: {scheme.matchScore}%</h3>
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">Potentially Eligible</span>
                  </div>
                  <EligibilityIndicator factors={eligibilityFactors} />
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-success-50 p-4">
                      <p className="mb-2 text-sm font-bold text-success-800">Why we recommend this</p>
                      <ul className="space-y-1.5">
                        {scheme.matchReasons.filter((r) => r.status === 'match').map((r, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-success-700">
                            <CheckCircle2 className="h-4 w-4 shrink-0" /> {r.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl bg-warning-50 p-4">
                      <p className="mb-2 text-sm font-bold text-warning-800">Information still required</p>
                      <ul className="space-y-1.5">
                        {scheme.matchReasons.filter((r) => r.status !== 'match').map((r, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-warning-700">
                            {r.status === 'partial' ? <AlertTriangle className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
                            {r.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="mt-4 flex items-start gap-2 rounded-lg bg-navy-50 p-3 text-xs text-navy-600">
                    <Info className="h-4 w-4 shrink-0 text-navy-400 mt-0.5" />
                    Match scores are estimates based on the information you provided. They do not guarantee eligibility. Final eligibility is determined by the scheme provider.
                  </p>
                </Card>
              </div>
            ),
          },
          {
            id: 'eligibility',
            label: 'Eligibility',
            content: (
              <Card className="p-5">
                <h3 className="mb-3 text-base font-bold text-navy-900">Eligibility Criteria</h3>
                <ul className="space-y-3">
                  {scheme.eligibility.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-navy-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ),
          },
          {
            id: 'benefits',
            label: 'Benefits',
            content: (
              <Card className="p-5">
                <h3 className="mb-3 text-base font-bold text-navy-900">What You Receive</h3>
                <ul className="space-y-3">
                  {scheme.benefits.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-navy-700">
                      <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-success-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ),
          },
          {
            id: 'documents',
            label: 'Documents',
            content: (
              <Card className="p-5">
                <h3 className="mb-3 text-base font-bold text-navy-900">Documents Required</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {scheme.documentsRequired.map((doc, i) => (
                    <div key={i} className="flex items-center gap-2.5 rounded-xl border border-gray-200 p-3 text-sm text-navy-700">
                      <FileText className="h-4 w-4 text-navy-400" /> {doc}
                    </div>
                  ))}
                </div>
              </Card>
            ),
          },
          {
            id: 'process',
            label: 'Application Process',
            content: (
              <Card className="p-5">
                <h3 className="mb-4 text-base font-bold text-navy-900">How to Apply</h3>
                <ol className="space-y-4">
                  {scheme.applicationProcess.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                        {i + 1}
                      </span>
                      <p className="pt-1 text-sm text-navy-700">{step}</p>
                    </li>
                  ))}
                </ol>
              </Card>
            ),
          },
          {
            id: 'faq',
            label: 'FAQ',
            content: (
              <Accordion
                items={scheme.faqs.map((faq, i) => ({
                  id: `faq-${i}`,
                  title: faq.question,
                  content: <p>{faq.answer}</p>,
                }))}
              />
            ),
          },
          {
            id: 'sources',
            label: 'Sources',
            content: (
              <div className="space-y-3">
                {scheme.sources.map((source, i) => (
                  <Card key={i} className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm font-bold text-navy-900">{source.name}</p>
                      <p className="mt-0.5 text-xs text-gray-500">Last verified: {source.lastVerified}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {source.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-success-200 bg-success-50 px-2.5 py-1 text-xs font-semibold text-success-700">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                        </span>
                      )}
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            ),
          },
          {
            id: 'reviews',
            label: 'Reviews',
            content: (
              <div className="space-y-4">
                {scheme.reviews.map((review, i) => (
                  <Card key={i} className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-navy-900">{review.author}</p>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className={`h-4 w-4 ${j < review.rating ? 'fill-accent-400 text-accent-400' : 'text-gray-200'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-navy-600">{review.comment}</p>
                  </Card>
                ))}
              </div>
            ),
          },
        ]}
      />
    </DashboardLayout>
  );
}
