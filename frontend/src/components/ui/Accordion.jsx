import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function Accordion({ items, defaultOpen, className = '' }) {
  const [openId, setOpenId] = useState(defaultOpen ?? null);

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-navy-800 transition-colors hover:bg-gray-50"
            >
              <span className="flex items-center gap-3">{item.icon}{item.title}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="border-t border-gray-100 px-5 py-4 text-sm text-navy-600 animate-slide-down">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
