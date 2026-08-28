import { useState } from 'react';
import { Upload, FolderOpen, FileText } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DocumentCard } from '@/components/shared/DocumentCard';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { documents } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

const categoryLabels = {
  identity: 'Identity',
  income: 'Income',
  education: 'Education',
  residence: 'Residence',
  category: 'Category',
  other: 'Other',
};

export function DocumentsPage() {
  const { t } = useTranslation();
  const [showUpload, setShowUpload] = useState(false);
  const categories = ['all', 'identity', 'income', 'education', 'residence', 'category', 'other'];
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all' ? documents : documents.filter((d) => d.category === activeCategory);

  return (
    <DashboardLayout title={t('documentVaultTitle')} subtitle={t('documentVaultSubtitle')}>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${activeCategory === cat ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 bg-white text-navy-600 hover:border-primary-300'}`}
            >
              {cat === 'all' ? t('allDocuments') : t(cat)}
            </button>
          ))}
        </div>
        <Button onClick={() => setShowUpload(true)} size="sm">
          <Upload className="h-4 w-4" /> {t('uploadDocument')}
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center">
          <FolderOpen className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-3 text-sm text-gray-500">No documents in this category yet.</p>
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {filtered.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      )}

      <Modal open={showUpload} onClose={() => setShowUpload(false)} title={t('uploadDocument')}>
        <div className="space-y-4">
          <div>
            <label className="label-base">Document Name</label>
            <input type="text" placeholder="e.g. Income Certificate" className="input-base" />
          </div>
          <div>
            <label className="label-base">Category</label>
            <select className="input-base">
              {Object.keys(categoryLabels).map((key) => (
                <option key={key} value={key}>{t(key)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-base">Document File</label>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
              <FileText className="h-8 w-8 text-gray-300" />
              <p className="mt-2 text-sm text-gray-500">Drag and drop or click to browse</p>
              <p className="mt-1 text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowUpload(false)}>Cancel</Button>
            <Button className="flex-1" onClick={() => setShowUpload(false)}>Upload</Button>
          </div>
          <p className="text-center text-xs text-gray-400">OCR and auto-verification will be available in a future update.</p>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
