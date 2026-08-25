import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, Search, FileText, Wallet, FolderOpen, Sparkles,
  GitCompare, SlidersHorizontal, MessageSquare, User, LogOut,
  ShieldCheck, Menu, X, ChevronLeft,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface NavItem { label: string; to: string; icon: LucideIcon }

const navItems: NavItem[] = [
  { label: 'Home', to: '/dashboard', icon: Home },
  { label: 'Find Schemes', to: '/schemes', icon: Search },
  { label: 'My Applications', to: '/applications', icon: FileText },
  { label: 'My Benefits', to: '/benefits', icon: Wallet },
  { label: 'Documents', to: '/documents', icon: FolderOpen },
  { label: 'AI Assistant', to: '/assistant', icon: Sparkles },
  { label: 'What-If Simulator', to: '/what-if', icon: SlidersHorizontal },
  { label: 'Compare Schemes', to: '/compare', icon: GitCompare },
  { label: 'Feedback', to: '/feedback', icon: MessageSquare },
  { label: 'Profile', to: '/profile', icon: User },
];

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  backTo?: string;
}

export function DashboardLayout({ children, title, subtitle, backTo }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
        <button onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu className="h-6 w-6 text-navy-700" /></button>
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white"><ShieldCheck className="h-4 w-4" /></div>
          <span className="font-bold text-navy-900">WelfareAI</span>
        </Link>
        <Link to="/profile" aria-label="Profile"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-bold">R</div></Link>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[85%] bg-white shadow-xl animate-slide-down">
            <SidebarContent location={location} onClose={() => setSidebarOpen(false)} onLogout={() => navigate('/')} />
          </div>
        </div>
      )}

      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-gray-200 bg-white lg:block">
          <SidebarContent location={location} onLogout={() => navigate('/')} />
        </aside>

        <main className="flex-1 min-w-0">
          <div className="container-page py-6 lg:py-8">
            {backTo && (
              <Link to={backTo} className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-primary-600">
                <ChevronLeft className="h-4 w-4" /> Back
              </Link>
            )}
            {title && (
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-navy-900 lg:text-3xl">{title}</h1>
                {subtitle && <p className="mt-1.5 text-sm text-gray-500">{subtitle}</p>}
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ location, onClose, onLogout }: { location: ReturnType<typeof useLocation>; onClose?: () => void; onLogout: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5">
        <Link to="/dashboard" onClick={onClose} className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white"><ShieldCheck className="h-5 w-5" /></div>
          <span className="text-lg font-bold text-navy-900">WelfareAI</span>
        </Link>
        {onClose && <button onClick={onClose} aria-label="Close menu"><X className="h-5 w-5 text-gray-400" /></button>}
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          const Icon = item.icon;
          return (
            <Link key={item.to} to={item.to} onClick={onClose} className={`nav-link ${active ? 'nav-link-active' : ''}`}>
              <Icon className="h-5 w-5" />{item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-100 p-3">
        <div className="mb-2 flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-bold">R</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-navy-800">Rahul Kumar</p>
            <p className="truncate text-xs text-gray-500">Citizen Account</p>
          </div>
        </div>
        <Link to="/admin" onClick={onClose} className="nav-link mb-1"><ShieldCheck className="h-5 w-5" /> Admin Dashboard</Link>
        <button onClick={onLogout} className="nav-link w-full text-error-600 hover:bg-error-50 hover:text-error-700"><LogOut className="h-5 w-5" /> Logout</button>
      </div>
    </div>
  );
}
