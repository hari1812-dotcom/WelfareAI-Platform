import { Link } from "react-router-dom";
import {
  Sparkles,
  FileText,
  Wallet,
  FolderOpen,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import { DashboardCard } from "@/components/shared/DashboardCard";
import { SchemeCard } from "@/components/shared/SchemeCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { applications, benefits, documents } from "@/data/mockData";
import { getDashboardData, getMe, getRecommendedSchemes } from "@/services/api";
import { useTranslation } from "react-i18next";

export function DashboardPage() {
  const { t } = useTranslation();
  const hour = new Date().getHours();
  const [dashboardData, setDashboardData] = useState(null);
  const [user, setUser] = useState(null);
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [dashData, userData, recommendedSchemes] = await Promise.all([
          getDashboardData(),
          getMe(),
          getRecommendedSchemes(),
        ]);
        setDashboardData(dashData);
        setUser(userData?.user);
        setSchemes(recommendedSchemes);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    }
    loadData();
  }, []);

  const greeting =
    hour < 12
      ? t('dashboard.greeting.morning')
      : hour < 17
      ? t('dashboard.greeting.afternoon')
      : t('dashboard.greeting.evening');

  return (
    <DashboardLayout>
      <div className="mb-6">
        <p className="text-sm text-gray-500">{greeting}</p>
        <h1 className="text-2xl font-bold text-navy-900 lg:text-3xl">
          {t('dashboard.welcomeBack')}, {user?.fullName?.split(' ')[0] || 'Citizen'}
        </h1>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          label={t('dashboard.recommendedSchemes')}
          value={schemes.length}
          icon={Sparkles}
          color="primary"
          trend="+3 new"
        />
        <DashboardCard
          label={t('dashboard.activeApplications')}
          value={dashboardData?.pendingApplications || applications.length}
          icon={FileText}
          color="accent"
        />
        <DashboardCard
          label={t('dashboard.benefitsReceived')}
          value={`₹${(dashboardData?.benefitsReceived || benefits
            .reduce((s, b) => s + b.receivedAmount, 0))
            .toLocaleString("en-IN")}`}
          icon={Wallet}
          color="success"
        />
        <DashboardCard
          label={t('dashboard.documents')}
          value={dashboardData?.documentsCount || documents.length}
          icon={FolderOpen}
          color="navy"
        />
      </div>

      {/* AI-Matched Schemes */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-navy-900">
              {t('dashboard.aiMatchedSchemes')}
            </h2>
            <p className="mt-0.5 text-sm text-gray-500">
              {t('dashboard.aiMatchedDesc')}
            </p>
          </div>
          <Link
            to="/schemes"
            className="hidden text-sm font-semibold text-primary-600 hover:text-primary-700 sm:flex items-center gap-1"
          >
            {t('dashboard.viewAll')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {schemes.slice(0, 4).map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-navy-900">
              {t('dashboard.applicationStatus')}
            </h3>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
