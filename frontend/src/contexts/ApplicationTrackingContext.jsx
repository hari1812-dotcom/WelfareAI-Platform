import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ApplicationTrackingContext } from '@/contexts/applicationTrackingStore';
import {
  createApplicationApi,
  getApplicationsApi,
  updateApplicationBenefitApi,
} from '@/services/api';

const PENDING_APPLICATION_KEY = 'welfareai-pending-application';
const APPLICATION_LIMIT = 2;

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  } catch (error) {
    console.warn('Could not read the cached account for application tracking.', error);
    return null;
  }
}

function getStorageKey(user) {
  return `welfareai-applications:${user?.id || user?._id || 'demo'}`;
}

function readLocalApplications(user) {
  try {
    return JSON.parse(localStorage.getItem(getStorageKey(user)) || '[]');
  } catch (error) {
    console.warn('Could not read saved applications.', error);
    return [];
  }
}

function isAuthenticated() {
  const token = localStorage.getItem('token');
  return Boolean(token && token !== 'demo-token');
}

export function ApplicationTrackingProvider({ children }) {
  const location = useLocation();
  const [applications, setApplications] = useState([]);
  const [applicationPending, setApplicationPending] = useState(false);
  const [pendingApplication, setPendingApplication] = useState(null);
  const [showAmountForm, setShowAmountForm] = useState(false);
  const [benefitReceived, setBenefitReceived] = useState('0');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const refreshApplications = useCallback(async () => {
    const user = getCurrentUser();
    if (isAuthenticated()) {
      const response = await getApplicationsApi();
      const nextApplications = response.applications || [];
      setApplications(nextApplications);
      localStorage.setItem(getStorageKey(user), JSON.stringify(nextApplications));
      return nextApplications;
    }

    const nextApplications = readLocalApplications(user);
    setApplications(nextApplications);
    return nextApplications;
  }, []);

  useEffect(() => {
    refreshApplications().catch((error) => {
      console.error('Could not load your application records.', error);
    });
  }, [location.pathname, refreshApplications]);

  useEffect(() => {
    let sawBlur = false;
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') sawBlur = true;
      else checkForReturn();
    };
    const checkForReturn = () => {
      if (document.visibilityState !== 'visible' || !sawBlur) return;
      sawBlur = false;
      try {
        const pending = sessionStorage.getItem(PENDING_APPLICATION_KEY);
        if (!pending) return;
        setApplicationPending(false);
        setPendingApplication(JSON.parse(pending));
        setShowAmountForm(false);
        setBenefitReceived('0');
        setSaveError('');
      } catch (error) {
        console.error('Could not restore the pending application confirmation.', error);
      }
    };
    const handleBlur = () => {
      if (sessionStorage.getItem(PENDING_APPLICATION_KEY)) sawBlur = true;
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', checkForReturn);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', checkForReturn);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const beginApplication = useCallback((scheme) => {
    const schemeId = scheme.schemeId || scheme.id;
    if (!schemeId || applications.length >= APPLICATION_LIMIT || applications.some((item) => item.schemeId === schemeId)) {
      return false;
    }
    if (sessionStorage.getItem(PENDING_APPLICATION_KEY)) return false;

    sessionStorage.setItem(PENDING_APPLICATION_KEY, JSON.stringify({
      schemeId,
      schemeName: scheme.name,
      provider: scheme.provider || '',
    }));
    setApplicationPending(true);
    return true;
  }, [applications]);

  const dismissPendingApplication = useCallback(() => {
    sessionStorage.removeItem(PENDING_APPLICATION_KEY);
    setApplicationPending(false);
    setPendingApplication(null);
    setShowAmountForm(false);
    setBenefitReceived('0');
    setSaveError('');
  }, []);

  const confirmApplied = useCallback(async () => {
    if (!pendingApplication) return;
    const amount = Number(benefitReceived);
    if (!Number.isFinite(amount) || amount < 0) {
      setSaveError('Enter a valid non-negative amount received.');
      return;
    }

    setSaving(true);
    setSaveError('');
    try {
      let nextApplications;
      if (isAuthenticated()) {
        const response = await createApplicationApi({
          ...pendingApplication,
          benefitReceived: amount,
        });
        nextApplications = response.applications || [];
      } else {
        const user = getCurrentUser();
        const existing = readLocalApplications(user);
        if (existing.length >= APPLICATION_LIMIT) throw new Error(`You can apply to a maximum of ${APPLICATION_LIMIT} schemes.`);
        if (existing.some((item) => item.schemeId === pendingApplication.schemeId)) throw new Error('This scheme is already in your application list.');
        nextApplications = [...existing, { ...pendingApplication, benefitReceived: amount, status: 'applied', appliedAt: new Date().toISOString() }];
        localStorage.setItem(getStorageKey(user), JSON.stringify(nextApplications));
      }
      setApplications(nextApplications);
      localStorage.setItem(getStorageKey(getCurrentUser()), JSON.stringify(nextApplications));
      dismissPendingApplication();
    } catch (error) {
      setSaveError(error.message || 'Could not save this application.');
    } finally {
      setSaving(false);
    }
  }, [benefitReceived, dismissPendingApplication, pendingApplication]);

  const updateReceivedBenefit = useCallback(async (schemeId, amount) => {
    if (!Number.isFinite(amount) || amount < 0) throw new Error('Enter a valid non-negative amount received.');
    let nextApplications;
    if (isAuthenticated()) {
      const response = await updateApplicationBenefitApi(schemeId, amount);
      nextApplications = response.applications || [];
    } else {
      const user = getCurrentUser();
      nextApplications = readLocalApplications(user).map((item) => (
        item.schemeId === schemeId ? { ...item, benefitReceived: amount } : item
      ));
      localStorage.setItem(getStorageKey(user), JSON.stringify(nextApplications));
    }
    setApplications(nextApplications);
    localStorage.setItem(getStorageKey(getCurrentUser()), JSON.stringify(nextApplications));
  }, []);

  const value = useMemo(() => ({
    applications,
    applicationLimit: APPLICATION_LIMIT,
    applicationPending,
    beginApplication,
    refreshApplications,
    updateReceivedBenefit,
  }), [applicationPending, applications, beginApplication, refreshApplications, updateReceivedBenefit]);

  return (
    <ApplicationTrackingContext.Provider value={value}>
      {children}
      <Modal
        open={Boolean(pendingApplication)}
        onClose={() => !saving && dismissPendingApplication()}
        title={showAmountForm ? 'Record the benefit received' : 'Did you apply for this scheme?'}
      >
        {pendingApplication && (
          <div className="space-y-4">
            <p className="text-sm text-navy-700">
              {showAmountForm
                ? `Enter the amount you have actually received from ${pendingApplication.schemeName}. Enter 0 if you have not received any payment yet.`
                : `You returned from the official website for ${pendingApplication.schemeName}. Did you submit an application?`}
            </p>
            {showAmountForm ? (
              <>
                <label className="block text-sm font-semibold text-navy-800">
                  Amount received (₹)
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={benefitReceived}
                    onChange={(event) => setBenefitReceived(event.target.value)}
                    className="input-base mt-1"
                  />
                </label>
                {saveError && <p role="alert" className="text-sm text-error-600">{saveError}</p>}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" disabled={saving} onClick={() => setShowAmountForm(false)}>Back</Button>
                  <Button disabled={saving} onClick={confirmApplied}>{saving ? 'Saving…' : 'Confirm application'}</Button>
                </div>
              </>
            ) : (
              <>
                {saveError && <p role="alert" className="text-sm text-error-600">{saveError}</p>}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" disabled={saving} onClick={dismissPendingApplication}>No, I didn’t apply</Button>
                  <Button disabled={saving} onClick={() => { setSaveError(''); setShowAmountForm(true); }}>Yes, I applied</Button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </ApplicationTrackingContext.Provider>
  );
}
