import { Link } from 'react-router-dom';
import { ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container-page py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white"><ShieldCheck className="h-5 w-5" /></div>
              <span className="text-lg font-bold text-navy-900">WelfareAI</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-gray-500 leading-relaxed">Discover government, NGO, and private welfare programs matched to your needs — with simple explanations and personalized guidance.</p>
            <p className="mt-3 text-xs font-semibold text-primary-600">Discover. Understand. Apply. Track.</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-navy-900">Platform</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/schemes" className="text-gray-500 hover:text-primary-600">Explore Schemes</Link></li>
              <li><Link to="/login" className="text-gray-500 hover:text-primary-600">Login</Link></li>
              <li><Link to="/register" className="text-gray-500 hover:text-primary-600">Sign Up</Link></li>
              <li><Link to="/assistant" className="text-gray-500 hover:text-primary-600">AI Assistant</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-navy-900">Categories</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/schemes?category=education" className="text-gray-500 hover:text-primary-600">Education</Link></li>
              <li><Link to="/schemes?category=healthcare" className="text-gray-500 hover:text-primary-600">Healthcare</Link></li>
              <li><Link to="/schemes?category=employment" className="text-gray-500 hover:text-primary-600">Employment</Link></li>
              <li><Link to="/schemes?category=housing" className="text-gray-500 hover:text-primary-600">Housing</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row">
          <p className="text-xs text-gray-400">© 2026 WelfareAI. A student project for S7 Computer Science mini project.</p>
          <p className="flex items-center gap-1.5 text-xs text-gray-400">Built with <Heart className="h-3.5 w-3.5 text-error-400" /> for social welfare</p>
        </div>
      </div>
    </footer>
  );
}
