import { useState } from 'react';

export function Tabs({ items, defaultTab, className = '' }) {
  const [active, setActive] = useState(defaultTab ?? items[0]?.id);
  const activeItem = items.find((i) => i.id === active) ?? items[0];

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-1 border-b border-gray-200" role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={active === item.id}
            onClick={() => setActive(item.id)}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              active === item.id ? 'border-primary-600 text-primary-700' : 'border-transparent text-navy-500 hover:text-navy-800 hover:border-gray-300'
            }`}
          >
            {item.icon}{item.label}
          </button>
        ))}
      </div>
      <div className="pt-5 animate-fade-in" role="tabpanel">{activeItem?.content}</div>
    </div>
  );
}
