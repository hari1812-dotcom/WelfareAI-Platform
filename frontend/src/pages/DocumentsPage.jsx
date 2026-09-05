import { useState, useEffect } from 'react';
import { Upload, FolderOpen, CheckCircle2, AlertCircle, RefreshCw, Filter } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DocumentCard } from '@/components/shared/DocumentCard';
import { DocumentPreviewModal } from '@/components/shared/DocumentPreviewModal';
import { DocumentUploadModal } from '@/components/shared/DocumentUploadModal';
import { DeleteConfirmModal } from '@/components/shared/DeleteConfirmModal';
import { Button } from '@/components/ui/Button';
import { documents as mockDocuments } from '@/data/mockData';
import { useTranslation } from 'react-i18next';
import {
  getDocumentsApi,
  uploadDocumentApi,
  updateDocumentApi,
  deleteDocumentApi,
  getDocumentFileUrl,
} from '@/services/api';

const INITIAL_DOCS_KEY = 'welfareai_documents';

function getInitialDocuments() {
  try {
    const saved = localStorage.getItem(INITIAL_DOCS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}

  return mockDocuments.map((d, i) => ({
    _id: d.id,
    id: d.id,
    name: d.name,
    category: d.category,
    originalFilename: `${d.name.toLowerCase().replace(/\s+/g, '_')}.${d.name.includes('Sheet') || d.name.includes('Certificate') || d.name.includes('Aadhaar') || d.name.includes('Records') ? 'pdf' : 'png'}`,
    fileType: d.name.includes('Sheet') || d.name.includes('Certificate') || d.name.includes('Aadhaar') || d.name.includes('Records') ? 'application/pdf' : 'image/png',
    fileSize: (i + 1) * 750000,
    fileSizeFormatted: `${((i + 1) * 0.75).toFixed(1)} MB`,
    uploadDate: d.uploadDate || '5 Jan 2026',
    expiryDate: d.expiryDate || '',
    status: d.status || 'verified',
    version: 1,
  }));
}

export function DocumentsPage() {
  const { t } = useTranslation();
  const [docList, setDocList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Modals state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [deletingDoc, setDeletingDoc] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const categories = [
    { key: 'all', labelKey: 'allDocuments' },
    { key: 'identity', labelKey: 'identity' },
    { key: 'income', labelKey: 'income' },
    { key: 'education', labelKey: 'education' },
    { key: 'residence', labelKey: 'residence' },
    { key: 'category', labelKey: 'casteCategory' },
    { key: 'other', labelKey: 'other' },
  ];

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const data = await getDocumentsApi();
      if (data.documents && data.documents.length > 0) {
        setDocList(data.documents);
        localStorage.setItem(INITIAL_DOCS_KEY, JSON.stringify(data.documents));
      } else {
        const local = getInitialDocuments();
        setDocList(local);
      }
    } catch (err) {
      // Backend unauthenticated or offline fallback
      const local = getInitialDocuments();
      setDocList(local);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const saveToLocalStorage = (newList) => {
    setDocList(newList);
    try {
      localStorage.setItem(INITIAL_DOCS_KEY, JSON.stringify(newList));
    } catch (e) {}
  };

  const handleSaveDocument = async ({ name, category, expiryDate, file, isReplace, existingId }) => {
    let fileDataUrl = '';
    let originalFilename = file?.name || 'document.pdf';
    let fileType = file?.type || 'application/pdf';
    let fileSize = file?.size || 1200000;
    let fileSizeFormatted = `${(fileSize / (1024 * 1024)).toFixed(1)} MB`;

    if (file) {
      fileDataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      if (expiryDate) formData.append('expiryDate', expiryDate);
      if (file) formData.append('file', file);

      let savedDoc;
      if (isReplace && existingId) {
        try {
          const res = await updateDocumentApi(existingId, formData);
          savedDoc = res.document;
        } catch (e) {
          // Fallback local update
          const existing = docList.find((d) => (d._id || d.id) === existingId);
          savedDoc = {
            ...existing,
            name,
            category,
            expiryDate,
            originalFilename: file ? originalFilename : existing.originalFilename,
            fileType: file ? fileType : existing.fileType,
            fileSize: file ? fileSize : existing.fileSize,
            fileSizeFormatted: file ? fileSizeFormatted : existing.fileSizeFormatted,
            fileDataUrl: file ? fileDataUrl : existing.fileDataUrl,
            version: (existing.version || 1) + (file ? 1 : 0),
            status: 'pending',
          };
        }

        const updatedList = docList.map((d) => ((d._id || d.id) === existingId ? savedDoc : d));
        saveToLocalStorage(updatedList);
        showToast(t('updateSuccess', { defaultValue: 'Document updated successfully!' }));
      } else {
        try {
          const res = await uploadDocumentApi(formData);
          savedDoc = res.document;
        } catch (e) {
          // Fallback local create
          savedDoc = {
            _id: `doc-custom-${Date.now()}`,
            id: `doc-custom-${Date.now()}`,
            name,
            category,
            originalFilename,
            fileType,
            fileSize,
            fileSizeFormatted,
            fileDataUrl: fileDataUrl || `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="600" height="400" fill="%23EFF6FF"/><text x="300" y="200" font-family="Arial" font-size="24" fill="%231E40AF" text-anchor="middle">${encodeURIComponent(name)}</text></svg>`,
            uploadDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            expiryDate,
            status: 'pending',
            version: 1,
          };
        }

        const updatedList = [savedDoc, ...docList];
        saveToLocalStorage(updatedList);
        showToast(t('uploadSuccess', { defaultValue: 'Document uploaded successfully!' }));
      }
    } catch (err) {
      showToast(err.message || 'Failed to save document', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingDoc) return;
    setIsDeleting(true);
    const docId = deletingDoc._id || deletingDoc.id;

    try {
      try {
        await deleteDocumentApi(docId);
      } catch (e) {
        // Backend offline fallback
      }

      const updatedList = docList.filter((d) => (d._id || d.id) !== docId);
      saveToLocalStorage(updatedList);
      showToast(t('deleteSuccess', { defaultValue: 'Document deleted successfully!' }));
    } catch (err) {
      showToast(err.message || 'Failed to delete document', 'error');
    } finally {
      setIsDeleting(false);
      setDeletingDoc(null);
    }
  };

  const handleDownload = (doc) => {
    if (doc.fileDataUrl) {
      const link = document.createElement('a');
      link.href = doc.fileDataUrl;
      link.download = doc.originalFilename || `${doc.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (doc._id) {
      window.open(getDocumentFileUrl(doc._id, true), '_blank');
    } else {
      const link = document.createElement('a');
      const isPdf = doc.fileType?.includes('pdf') || doc.name?.includes('Sheet') || doc.name?.includes('Certificate') || doc.name?.includes('Aadhaar') || doc.name?.includes('Records');
      const dummyContent = `WelfareAI Official Document Proof\nDocument: ${doc.name}\nCategory: ${doc.category}\nStatus: Verified\nVersion: ${doc.version || 1}`;
      const blob = new Blob([dummyContent], { type: isPdf ? 'application/pdf' : 'text/plain' });
      link.href = URL.createObjectURL(blob);
      link.download = doc.originalFilename || `${doc.name}.${isPdf ? 'pdf' : 'txt'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const filtered = activeCategory === 'all'
    ? docList
    : docList.filter((d) => d.category === activeCategory);

  return (
    <DashboardLayout title={t('documentVaultTitle')} subtitle={t('documentVaultSubtitle')}>
      {/* Toast Banner */}
      {toast && (
        <div className={`mb-5 flex items-center justify-between gap-3 rounded-xl p-4 border shadow-sm animate-slide-down ${
          toast.type === 'error' ? 'bg-error-50 text-error-800 border-error-200' : 'bg-success-50 text-success-800 border-success-200'
        }`}>
          <div className="flex items-center gap-2.5">
            {toast.type === 'error' ? <AlertCircle className="h-5 w-5 text-error-600" /> : <CheckCircle2 className="h-5 w-5 text-success-600" />}
            <span className="text-sm font-semibold">{toast.message}</span>
          </div>
          <button onClick={() => setToast(null)} className="text-xs font-bold opacity-75 hover:opacity-100">
            ✕
          </button>
        </div>
      )}

      {/* Header Controls Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all ${
                activeCategory === cat.key
                  ? 'border-primary-600 bg-primary-600 text-white shadow-sm'
                  : 'border-gray-200 bg-white text-navy-700 hover:border-primary-300 hover:bg-purple-50/50'
              }`}
            >
              {t(cat.labelKey, { defaultValue: cat.key })}
            </button>
          ))}
        </div>

        <Button
          onClick={() => { setEditingDoc(null); setShowUploadModal(true); }}
          className="gap-2 shadow-sm shrink-0"
        >
          <Upload className="h-4 w-4" />
          {t('uploadDocument')}
        </Button>
      </div>

      {/* Main Document Grid */}
      {loading ? (
        <div className="grid gap-3 lg:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-24 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center shadow-xs">
          <FolderOpen className="mx-auto h-12 w-12 text-primary-300" />
          <p className="mt-3 text-sm font-medium text-gray-500">{t('noDocuments')}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setEditingDoc(null); setShowUploadModal(true); }}
            className="mt-4 gap-1.5"
          >
            <Upload className="h-4 w-4" /> {t('uploadDocument')}
          </Button>
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {filtered.map((doc) => (
            <DocumentCard
              key={doc._id || doc.id}
              document={doc}
              onView={(d) => setPreviewDoc(d)}
              onDownload={handleDownload}
              onReplace={(d) => { setEditingDoc(d); setShowUploadModal(true); }}
              onDelete={(d) => setDeletingDoc(d)}
            />
          ))}
        </div>
      )}

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        open={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        document={previewDoc}
        onReplace={(d) => { setEditingDoc(d); setShowUploadModal(true); }}
        onDownload={handleDownload}
      />

      {/* Document Upload & Replacement Modal */}
      <DocumentUploadModal
        open={showUploadModal}
        onClose={() => { setShowUploadModal(false); setEditingDoc(null); }}
        onSave={handleSaveDocument}
        existingDocument={editingDoc}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmModal
        open={!!deletingDoc}
        onClose={() => setDeletingDoc(null)}
        onConfirm={handleDeleteConfirm}
        documentName={deletingDoc?.name}
        isDeleting={isDeleting}
      />
    </DashboardLayout>
  );
}
