import { FileText, Calendar, Upload } from 'lucide-react';
import type { DocumentItem } from '@/types';
import { StatusBadge } from './StatusBadge';

interface DocumentCardProps {
  document: DocumentItem;
}

export function DocumentCard({ document }: DocumentCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-card-hover hover:border-primary-200">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-500">
        <FileText className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-navy-900 truncate">{document.name}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Upload className="h-3 w-3" /> {document.uploadDate}</span>
          {document.expiryDate && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Expires {document.expiryDate}</span>}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3"><StatusBadge status={document.status} /></div>
    </div>
  );
}
