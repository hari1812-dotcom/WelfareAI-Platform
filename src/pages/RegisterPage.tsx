import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Mail, Phone, MapPin, ArrowRight, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { states } from '@/data/mockData';

export function RegisterPage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('English');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="label-base">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input id="name" type="text" placeholder="Enter your full name" className="input-base pl-10" required />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="label-base">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input id="email" type="email" placeholder="you@example.com" className="input-base pl-10" required />
                </div>
              </div>

              <div>
                <label htmlFor="mobile" className="label-base">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input id="mobile" type="tel" placeholder="+91 98765 43210" className="input-base pl-10" required />
                </div>
              </div>

              <div>
                <label htmlFor="state" className="label-base">
                  <MapPin className="mr-1 inline h-4 w-4" /> State
                </label>
                <select id="state" className="input-base" required>
                  <option value="">Select your state</option>
                  {states.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="password" className="label-base">Password</label>
                <input id="password" type="password" placeholder="Create a password" className="input-base" required />
              </div>

              <label className="flex items-start gap-2 text-sm text-navy-600">
                <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" required />
                <span>I agree to the Terms of Service and Privacy Policy</span>
              </label>

              <Button type="submit" size="lg" className="w-full">
                Create Account <ArrowRight className="h-5 w-5" />
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

          <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">Login</Link>
          </p>

          <p className="mt-3 text-center text-xs text-gray-400">
            Demo authentication — no real credentials are stored.
          </p>
        </div>
      </div>
    </div>
  );
}
