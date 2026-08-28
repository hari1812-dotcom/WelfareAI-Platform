import { User, Mail, Phone, MapPin, Calendar, Globe, Edit, Shield } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getMe, updateCitizen } from '@/services/api';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function loadProfile() {
      try {
        const { user } = await getMe();
        setProfile(user);
      } catch (err) {
        console.error(err);
      }
    }
    loadProfile();
  }, []);

  const changeLanguage = async (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    if (profile?._id) {
       setProfile({...profile, language: newLang});
       try { await updateCitizen(profile._id, { language: newLang }); } catch(err) { console.error('Failed to update language'); }
    }
  };

  const fallback = {
    name: 'Citizen',
    email: 'No Email',
    mobile: 'No Mobile',
    state: 'Unknown',
    age: 0,
    occupation: 'None',
    income: 'None',
    language: 'English',
  };

  const current = profile ? {
    name: profile.fullName || fallback.name,
    email: profile.email || fallback.email,
    mobile: profile.mobile || fallback.mobile,
    state: profile.state || fallback.state,
    age: profile.age || fallback.age,
    occupation: profile.occupation || fallback.occupation,
    income: profile.income || fallback.income,
    language: profile.language || fallback.language,
  } : fallback;

  const fields = [
    { label: t('profile.fullName'), value: current.name, icon: User },
    { label: t('profile.email'), value: current.email, icon: Mail },
    { label: t('profile.mobile'), value: current.mobile, icon: Phone },
    { label: t('profile.state'), value: current.state, icon: MapPin },
    { label: t('profile.age'), value: current.age, icon: Calendar },
    { label: t('profile.occupation'), value: current.occupation, icon: User },
    { label: t('profile.incomeBracket'), value: current.income, icon: MapPin },
    { label: t('profile.preferredLanguage'), value: current.language, icon: Globe },
  ];

  return (
    <DashboardLayout title={t('profile.title')} subtitle={t('profile.subtitle')}>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="p-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-700">
              {current.name[0]?.toUpperCase() || 'C'}
            </div>
            <h2 className="mt-4 text-lg font-bold text-navy-900">{current.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{current.email}</p>
            <div className="mt-3 flex justify-center">
              <Badge variant="success" icon={<Shield className="h-3.5 w-3.5" />}>{t('common.citizenAccount')}</Badge>
            </div>
            
            <div className="mt-6 text-left">
              <label htmlFor="lang" className="label-base text-sm font-semibold mb-2 block">{t('common.changeLanguage')}</label>
              <select id="lang" value={i18n.language} onChange={changeLanguage} className="input-base text-sm">
                {['English', 'हिंदी', 'தமிழ்'].map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <Button variant="outline" size="sm" className="mt-4 w-full">
              <Edit className="h-4 w-4" /> {t('profile.editProfile')}
            </Button>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="mb-4 text-base font-bold text-navy-900">{t('profile.personalInfo')}</h3>
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
            <h3 className="mb-3 text-base font-bold text-navy-900">{t('profile.accountSummary')}</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-primary-50 p-4 text-center">
                <p className="text-2xl font-bold text-primary-700">0</p>
                <p className="mt-1 text-xs text-gray-500">{t('dashboard.recommendedSchemes')}</p>
              </div>
              <div className="rounded-xl bg-accent-50 p-4 text-center">
                <p className="text-2xl font-bold text-accent-700">0</p>
                <p className="mt-1 text-xs text-gray-500">{t('dashboard.activeApplications')}</p>
              </div>
              <div className="rounded-xl bg-success-50 p-4 text-center">
                <p className="text-2xl font-bold text-success-700">0</p>
                <p className="mt-1 text-xs text-gray-500">{t('dashboard.documents')}</p>
              </div>
            </div>
          </Card>

          <div className="mt-4 rounded-xl border border-navy-200 bg-navy-50 p-4">
            <p className="text-xs text-navy-600">
              {t('profile.note')}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
