import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Mail, Phone, MapPin, ArrowRight, Globe, CreditCard, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { states } from '@/data/mockData';
import { registerCitizen } from '@/services/api';

export function RegisterPage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('English');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = e.target;
    const citizenData = {
      fullName: form.name.value.trim(),
      email: form.email.value.trim(),
      mobile: form.mobile.value.trim(),
      state: form.state.value,
      password: form.password.value,
      language,
      aadharNumber: form.aadharNumber.value.trim(),
      rationCard: form.rationCard.value.trim(),
    };

    try {
      const { token, user } = await registerCitizen(citizenData);
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-primary-50/40 to-white">
      <div className="container-page flex flex-1 items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </Link>
            <h1 className="mt-4 text-2xl font-bold text-navy-900">Create your account</h1>
            <p className="mt-1 text-sm text-gray-500">Get started with WelfareAI in minutes</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card lg:p-8">
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="label-base">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input id="name" name="name" type="text" placeholder="Enter your full name" className="input-base pl-10" required />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="label-base">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input id="email" name="email" type="email" placeholder="you@example.com" className="input-base pl-10" required />
                </div>
              </div>

              <div>
                <label htmlFor="mobile" className="label-base">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input id="mobile" name="mobile" type="tel" placeholder="+91 98765 43210" className="input-base pl-10" required />
                </div>
              </div>

              <div>
                <label htmlFor="state" className="label-base">
                  <MapPin className="mr-1 inline h-4 w-4" /> State
                </label>
                <select id="state" name="state" className="input-base" required>
                  <option value="">Select your state</option>
                  {states.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="aadharNumber" className="label-base">Aadhar Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input id="aadharNumber" name="aadharNumber" type="text" placeholder="12-digit Aadhar (Optional)" className="input-base pl-10" />
                </div>
              </div>

              <div>
                <label htmlFor="rationCard" className="label-base">Ration Card Number</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input id="rationCard" name="rationCard" type="text" placeholder="Ration Card Number (Optional)" className="input-base pl-10" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="label-base">Password</label>
                <input id="password" name="password" type="password" placeholder="Create a password" className="input-base" minLength={6} required />
              </div>

              <label className="flex items-start gap-2 text-sm text-navy-600">
                <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" required />
                <span>I agree to the Terms of Service and Privacy Policy</span>
              </label>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Creating Account...' : <>Create Account <ArrowRight className="h-5 w-5" /></>}
              </Button>
            </form>

            <div className="mt-5 border-t border-gray-100 pt-4">
              <label htmlFor="lang" className="label-base">
                <Globe className="mr-1 inline h-4 w-4" /> Language
              </label>
              <select id="lang" value={language} onChange={(e) => setLanguage(e.target.value)} className="input-base">
                {['English', 'हिंदी', 'मराठी', 'தமிழ்', 'తెలుగు', 'বাংলা', 'ગુજરાતી', 'ಕನ್ನಡ'].map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div className="mt-5 text-center">
              <Button to="/dashboard" variant="ghost" size="md" className="w-full">
                <User className="h-4 w-4" /> Continue as Guest
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
