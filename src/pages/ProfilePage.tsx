import { User, Mail, Phone, MapPin, Calendar, Globe, Edit, Shield } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function ProfilePage() {
  const profile = {
    name: 'Rahul Kumar',
    email: 'rahul.kumar@example.com',
    mobile: '+91 98765 43210',
    state: 'Maharashtra',
    age: 24,
    occupation: 'Student',
    income: '₹1-2.5 lakh',
    language: 'English',
  };

  const fields = [
    { label: 'Full Name', value: profile.name, icon: User },
    { label: 'Email', value: profile.email, icon: Mail },
    { label: 'Mobile', value: profile.mobile, icon: Phone },
    { label: 'State', value: profile.state, icon: MapPin },
    { label: 'Age', value: profile.age, icon: Calendar },
    { label: 'Occupation', value: profile.occupation, icon: User },
    { label: 'Income Bracket', value: profile.income, icon: MapPin },
    { label: 'Preferred Language', value: profile.language, icon: Globe },
  ];

  return (
    <DashboardLayout title="My Profile" subtitle="Manage your personal information">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="p-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-700">
              R
            </div>
            <h2 className="mt-4 text-lg font-bold text-navy-900">{profile.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{profile.email}</p>
            <div className="mt-3 flex justify-center">
              <Badge variant="success" icon={<Shield className="h-3.5 w-3.5" />}>Citizen Account</Badge>
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              <Edit className="h-4 w-4" /> Edit Profile
            </Button>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="mb-4 text-base font-bold text-navy-900">Personal Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => {
                const Icon = field.icon;
                return (
                  <div key={field.label} className="rounded-xl border border-gray-200 p-4">
                    <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      <Icon className="h-3.5 w-3.5" /> {field.label}
                    </p>
                    <p className="text-sm font-bold text-navy-900">{field.value}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="mt-4 p-6">
            <h3 className="mb-3 text-base font-bold text-navy-900">Account Summary</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-primary-50 p-4 text-center">
                <p className="text-2xl font-bold text-primary-700">6</p>
                <p className="mt-1 text-xs text-gray-500">Recommended Schemes</p>
              </div>
              <div className="rounded-xl bg-accent-50 p-4 text-center">
                <p className="text-2xl font-bold text-accent-700">3</p>
                <p className="mt-1 text-xs text-gray-500">Active Applications</p>
              </div>
              <div className="rounded-xl bg-success-50 p-4 text-center">
                <p className="text-2xl font-bold text-success-700">9</p>
                <p className="mt-1 text-xs text-gray-500">Documents</p>
              </div>
            </div>
          </Card>

          <div className="mt-4 rounded-xl border border-navy-200 bg-navy-50 p-4">
            <p className="text-xs text-navy-600">
              <span className="font-semibold">Note:</span> Profile editing and account settings will be available once authentication is implemented. This is a demo profile.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
