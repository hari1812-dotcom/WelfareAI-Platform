import { useContext } from 'react';
import { ApplicationTrackingContext } from '@/contexts/applicationTrackingStore';

export function useApplicationTracking() {
  const context = useContext(ApplicationTrackingContext);
  if (!context) throw new Error('useApplicationTracking must be used within ApplicationTrackingProvider.');
  return context;
}
