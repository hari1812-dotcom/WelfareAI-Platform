import { useParams } from "react-router-dom";
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Calendar,
  Building2,
  Wallet,
  FileText,
  ArrowRight,
  Star,
  ExternalLink,
  Info,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { Accordion } from "@/components/ui/Accordion";
import { VerificationBadge } from "@/components/shared/VerificationBadge";
import { MatchScore } from "@/components/shared/MatchScore";
import { EligibilityIndicator } from "@/components/shared/EligibilityIndicator";
import { schemes, eligibilityFactors } from "@/data/mockData";

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
            <h1 className="text-2xl font-bold text-navy-900 lg:text-3xl">
              {scheme.name}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
              <Building2 className="h-4 w-4" /> {scheme.provider}
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-navy-700">
                <Wallet className="h-4 w-4 text-primary-600" />{" "}
                {scheme.benefitAmount}
              </span>
              <span className="flex items-center gap-1.5 text-navy-700">
                <Calendar className="h-4 w-4 text-accent-600" /> Deadline:{" "}
                {scheme.deadline}
              </span>
              <span className="flex items-center gap-1.5 text-navy-700">
                <FileText className="h-4 w-4 text-navy-500" />{" "}
                {scheme.applicationMethod}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <MatchScore score={scheme.matchScore} size="lg" />
            <span className="text-xs font-semibold text-primary-600">
              Potentially Eligible
            </span>
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
            id: "overview",
            label: "Overview",
            content: (
              <div className="space-y-6">
                <Card className="p-5">
                  <h3 className="mb-2 text-base font-bold text-navy-900">
                    Summary
                  </h3>
                  <p className="text-sm text-navy-600 leading-relaxed">
                    {scheme.overview}
                  </p>
                </Card>

                {/* Eligibility Visualization */}
                <Card className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-base font-bold text-navy-900">
                      Your Match: {scheme.matchScore}%
                    </h3>
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700"></span>
                  </div>
                </Card>
              </div>
            ),
          },
        ]}
      />
    </DashboardLayout>
  );
}
