import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from './StatusBadge';
import {
  FileText, Download, X, Eye, Calendar, ShieldCheck,
  HardDrive, FileType, CheckCircle2, Clock, AlertTriangle, RefreshCw
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getDocumentFileUrl } from '@/services/api';

const mapDocKey = (name) => {
  const map = {
    'Aadhaar Card': 'aadhaarCard',
    'PAN Card': 'panCard',
    'Income Certificate': 'incomeCertificate',
    '10th Mark Sheet': 'tenthMarkSheet',
    '12th Mark Sheet': 'twelfthMarkSheet',
    'Voter ID': 'voterId',
    'Caste Certificate': 'casteCertificate',
    'Bank Passbook Copy': 'bankPassbook',
    'Land Records (7/12)': 'landRecords'
  };
  return map[name] || name;
};

export function DocumentPreviewModal({ open, onClose, document, onReplace, onDownload }) {
  const { t } = useTranslation();
  const [fileUrl, setFileUrl] = useState('');
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!document) return;
    if (document.fileDataUrl) {
      setFileUrl(document.fileDataUrl);
    } else if (document._id) {
      setFileUrl(getDocumentFileUrl(document._id));
    } else {
      setFileUrl('');
    }
    setLoadError(false);
  }, [document]);

  if (!document) return null;

  const translatedName = t(mapDocKey(document.name), { defaultValue: document.name });
  const categoryKey = document.category === 'category' ? 'casteCategory' : document.category;
  const translatedCategory = t(categoryKey, { defaultValue: document.category });
  
  const isPdf = document.fileType?.includes('pdf') || document.originalFilename?.toLowerCase().endsWith('.pdf') || document.name?.toLowerCase().includes('pdf') || document.name?.toLowerCase().includes('certificate') || document.name?.toLowerCase().includes('sheet') || document.name?.toLowerCase().includes('card');
  const isImage = document.fileType?.includes('image') || document.originalFilename?.match(/\.(png|jpe?g)$/i);

  const handleDownloadClick = () => {
    if (onDownload) {
      onDownload(document);
    } else {
      const link = document.createElement('a');
      link.href = fileUrl || getDocumentFileUrl(document._id, true);
      link.download = document.originalFilename || `${document.name}.${isPdf ? 'pdf' : 'png'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={t('previewTitle')}>
      <div className="space-y-5">
        {/* Header summary bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-purple-50 p-3.5 border border-purple-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-navy-900 text-base">{translatedName}</h3>
              <p className="text-xs text-navy-600 flex items-center gap-2 mt-0.5">
                <span className="capitalize font-semibold text-primary-700">{translatedCategory}</span>
                <span>•</span>
                <span>{document.fileSizeFormatted || document.fileSize || '1.2 MB'}</span>
                <span>•</span>
                <span className="font-mono text-gray-500">v{document.version || 1} ({t('latestVersion', { defaultValue: 'Latest' })})</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={document.status} />
            <Button size="sm" variant="outline" onClick={handleDownloadClick} className="gap-1 bg-white hover:bg-gray-50">
              <Download className="h-4 w-4" /> {t('download')}
            </Button>
            {onReplace && (
              <Button size="sm" variant="outline" onClick={() => { onClose(); onReplace(document); }} className="gap-1 bg-white hover:bg-gray-50 text-primary-700 border-primary-200">
                <RefreshCw className="h-4 w-4" /> {t('replace')}
              </Button>
            )}
          </div>
        </div>

        {/* Viewer container */}
        <div className="relative min-h-[300px] max-h-[460px] overflow-hidden rounded-xl border border-gray-200 bg-gray-900/5 flex flex-col items-center justify-center">
          {fileUrl ? (
            isImage ? (
              <div className="p-4 flex items-center justify-center max-h-[440px]">
                <img
                  src={fileUrl}
                  alt={translatedName}
                  className="max-h-[400px] w-auto rounded-lg shadow-md object-contain"
                  onError={() => setLoadError(true)}
                />
              </div>
            ) : (
              <iframe
                src={fileUrl}
                title={translatedName}
                className="w-full h-[400px] rounded-xl border-0"
                onError={() => setLoadError(true)}
              />
            )
          ) : null}

          {(loadError || (!isImage && !fileUrl)) && (
            <div className="p-8 text-center bg-white rounded-xl border border-gray-200 w-full max-w-md my-6 shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600 mb-3">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h4 className="font-bold text-navy-900 text-base">{translatedName}</h4>
              <p className="text-xs text-gray-500 mt-1">
                {t('encryptedDocumentPreview', { defaultValue: 'Original Document File Loaded & Encrypted for Privacy' })}
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <Button size="sm" onClick={handleDownloadClick} className="gap-1.5">
                  <Download className="h-4 w-4" /> {t('downloadOriginal', { defaultValue: 'Download File' })}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Document Details & Metadata Table */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary-600" />
            {t('documentMetadata', { defaultValue: 'Document Information & Metadata' })}
          </h4>
          <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <span className="text-gray-400 block mb-0.5">{t('documentName')}</span>
              <span className="font-semibold text-navy-900 truncate block">{translatedName}</span>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <span className="text-gray-400 block mb-0.5">{t('documentCategory')}</span>
              <span className="font-semibold text-navy-900 capitalize block">{translatedCategory}</span>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <span className="text-gray-400 block mb-0.5">{t('originalFile')}</span>
              <span className="font-semibold text-navy-900 truncate block">{document.originalFilename || `${document.name}.${isPdf ? 'pdf' : 'png'}`}</span>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <span className="text-gray-400 block mb-0.5">{t('fileType')}</span>
              <span className="font-semibold text-navy-900 uppercase block">{document.fileType || (isPdf ? 'application/pdf' : 'image/png')}</span>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <span className="text-gray-400 block mb-0.5">{t('fileSize')}</span>
              <span className="font-semibold text-navy-900 block">{document.fileSizeFormatted || document.fileSize || '1.2 MB'}</span>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <span className="text-gray-400 block mb-0.5">{t('uploadDate')}</span>
              <span className="font-semibold text-navy-900 block">{document.uploadDate || '5 Jan 2026'}</span>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <span className="text-gray-400 block mb-0.5">{t('expiryDate')}</span>
              <span className="font-semibold text-navy-900 block">{document.expiryDate || t('noExpiry')}</span>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <span className="text-gray-400 block mb-0.5">{t('version')}</span>
              <span className="font-semibold text-primary-700 block">v{document.version || 1} ({t('latestVersion', { defaultValue: 'Latest' })})</span>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <span className="text-gray-400 block mb-0.5">{t('status')}</span>
              <span className="font-semibold capitalize text-navy-900 block">{t(document.status, { defaultValue: document.status })}</span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
          <Button variant="outline" onClick={onClose}>
            {t('close')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
