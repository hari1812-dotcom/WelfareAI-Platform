import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function DeleteConfirmModal({ open, onClose, onConfirm, documentName, isDeleting }) {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={() => !isDeleting && onClose()} title={t('confirmDeleteTitle', { defaultValue: 'Delete Document' })}>
      <div className="space-y-4 text-center py-2">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-error-100 text-error-600">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <div>
          <h3 className="text-base font-bold text-navy-900">
            {t('deleteConfirmTitle')}
          </h3>
          <p className="mt-1.5 text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
            {t('confirmDeleteMsg', { defaultValue: 'Are you sure you want to delete this document? This action cannot be undone.' })}
          </p>
          {documentName && (
            <div className="mt-3 rounded-lg bg-gray-50 border border-gray-200 py-2 px-3 inline-block">
              <span className="text-xs font-bold text-navy-900">{documentName}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-3">
          <Button variant="outline" className="flex-1" onClick={onClose} disabled={isDeleting}>
            {t('cancel')}
          </Button>
          <Button variant="danger" className="flex-1 gap-1.5" onClick={onConfirm} disabled={isDeleting}>
            <Trash2 className="h-4 w-4" />
            {isDeleting ? t('deleting', { defaultValue: 'Deleting...' }) : t('delete')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
