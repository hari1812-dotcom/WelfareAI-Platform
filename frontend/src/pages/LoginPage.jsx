import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, Lock, Eye, EyeOff, Globe, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { login } from '@/services/api';

export function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [language, setLanguage] = useState('English');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (mode === 'email') {
        const data = await login({ email, password });
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        // Mobile login logic if implemented
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
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
            <h1 className="mt-4 text-2xl font-bold text-navy-900">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">Login to your WelfareAI account</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card lg:p-8">
            {/* Mode toggle */}
            <div className="mb-5 flex rounded-xl bg-gray-100 p-1">
              <button
                onClick={() => setMode('email')}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${mode === 'email' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500'}`}
              >
                <Mail className="mr-1.5 inline h-4 w-4" /> Email
              </button>
              <button
                onClick={() => setMode('mobile')}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${mode === 'mobile' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500'}`}
              >
                <Phone className="mr-1.5 inline h-4 w-4" /> Mobile
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'email' ? (
                <div>
                  <label htmlFor="email" className="label-base">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input-base pl-10" required />
                  </div>
                </div>
              ) : (
                <div>
                  <label htmlFor="mobile" className="label-base">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input id="mobile" type="tel" placeholder="+91 98765 43210" className="input-base pl-10" required />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="password" className="label-base">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-base pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {showOtp && (
                <div className="animate-slide-down">
                  <label htmlFor="otp" className="label-base">Enter OTP</label>
                  <input id="otp" type="text" maxLength={6} placeholder="6-digit OTP" className="input-base tracking-widest" />
                  <p className="mt-1 text-xs text-gray-400">Demo OTP: 123456</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-navy-600">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  Remember me
                </label>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" size="lg" className="w-full">Login</Button>
            </form>

            <div className="mt-5 border-t border-gray-100 pt-4">
              <p className="text-center text-sm text-navy-600">
                Don't have an account? <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
