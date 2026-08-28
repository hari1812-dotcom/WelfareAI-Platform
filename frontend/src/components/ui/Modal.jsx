import { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({ open, onClose, title, children, className = '' }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className={`relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-xl animate-slide-up ${className}`}>
        {title && (
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h3 className="text-lg font-bold text-navy-900">{title}</h3>
            <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-navy-700">
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
