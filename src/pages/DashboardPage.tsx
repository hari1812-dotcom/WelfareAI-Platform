import { Link } from 'react-router-dom';
import {
  Sparkles, FileText, Wallet, FolderOpen, ArrowRight,
  TrendingUp, Clock, CheckCircle2,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardCard } from '@/components/shared/DashboardCard';
import { SchemeCard } from '@/components/shared/SchemeCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { schemes, applications, benefits, documents } from '@/data/mockData';

export function DashboardPage() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning!' : hour < 17 ? 'Good afternoon!' : 'Good evening!';

  return (
    <DashboardLayout>
      <div className="mb-6">
        <p className="text-sm text-gray-500">{greeting}</p>
        <h1 className="text-2xl font-bold text-navy-900 lg:text-3xl">Welcome back, Rahul</h1>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard label="Recommended Schemes" value={schemes.length} icon={Sparkles} color="primary" trend="+3 new" />
        <DashboardCard label="Active Applications" value={applications.length} icon={FileText} color="accent" />
        <DashboardCard label="Benefits Received" value={`₹${benefits.reduce((s, b) => s + b.receivedAmount, 0).toLocaleString('en-IN')}`} icon={Wallet} color="success" />
        <DashboardCard label="Documents" value={documents.length} icon={FolderOpen} color="navy" />
      </div>

      {/* AI-Matched Schemes */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-navy-900">AI-Matched Schemes</h2>
            <p className="mt-0.5 text-sm text-gray-500">Schemes matched to your profile — potentially eligible</p>
          </div>
          <Link to="/schemes" className="hidden text-sm font-semibold text-primary-600 hover:text-primary-700 sm:flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
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
            <h3 className="text-sm font-bold text-navy-900">Application Status</h3>
          </div>
          <p className="mt-3 text-sm text-gray-500">You have {applications.filter(a => a.status !== 'approved' && a.status !== 'benefit_disbursed').length} applications in progress.</p>
          <Button to="/applications" variant="ghost" size="sm" className="mt-3 p-0 hover:bg-transparent">
            Track applications <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-50 text-success-600">
              <Wallet className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-navy-900">Benefits Tracking</h3>
          </div>
          <p className="mt-3 text-sm text-gray-500">₹{benefits.reduce((s, b) => s + (b.expectedAmount - b.receivedAmount), 0).toLocaleString('en-IN')} in pending benefits.</p>
          <Button to="/benefits" variant="ghost" size="sm" className="mt-3 p-0 hover:bg-transparent">
            View benefits <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-navy-900">Document Vault</h3>
          </div>
          <p className="mt-3 text-sm text-gray-500">{documents.filter(d => d.status === 'expiring').length} document(s) expiring soon.</p>
          <Button to="/documents" variant="ghost" size="sm" className="mt-3 p-0 hover:bg-transparent">
            Manage documents <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  );
}
