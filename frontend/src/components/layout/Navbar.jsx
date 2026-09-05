import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ShieldCheck,
  LogIn,
  UserPlus,
  Sparkles,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslation } from 'react-i18next';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const supportedLanguages = ['English', 'हिंदी', 'தமிழ்'];
  const navLinks = [
    { label: "findSchemes", to: "/schemes" },
    { label: "categories", to: "/#categories" },
    { label: "howItWorks", to: "/#how-it-works" },
    { label: "about", to: "/#trust" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-bold text-navy-900">WelfareAI</span>
            <span className="ml-1.5 hidden text-xs font-medium text-primary-600 sm:inline">
              Discover. Understand. Apply. Track.
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-navy-600 transition-colors hover:text-primary-700 hover:bg-gray-50"
            >
              {t(`nav.${link.label}`)}
            </Link>
          ))}
          <div className="relative ml-2">
            <Globe className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white py-1.5 pl-8 pr-3 text-sm font-medium text-navy-600 focus:border-primary-500"
              aria-label="Select language"
            >
              {supportedLanguages.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <Button to="/login" variant="ghost" size="sm">
            <LogIn className="h-4 w-4" /> Login
          </Button>
          <Button to="/register" variant="primary" size="sm">
            <UserPlus className="h-4 w-4" /> Sign Up
          </Button>
        </div>

        <button
          className="rounded-lg p-2 text-navy-700 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-gray-100 bg-white md:hidden animate-slide-down">
          <div className="container-page space-y-1 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-navy-600 hover:bg-primary-50 hover:text-primary-700"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 px-3 py-2">
              <Globe className="h-4 w-4 text-gray-400" />
              <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm"
                aria-label="Select language"
              >
                {supportedLanguages.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                to="/login"
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <LogIn className="h-4 w-4" /> {t('login')}
              </Button>
              <Button
                to="/register"
                variant="primary"
                size="sm"
                className="flex-1"
              >
                <UserPlus className="h-4 w-4" /> {t('signUp')}
              </Button>
            </div>
            <Link
              to="/assistant"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-navy-50 px-3 py-2.5 text-sm font-semibold text-navy-700"
            >
              <Sparkles className="h-4 w-4 text-accent-500" /> Ask AI Assistant
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
