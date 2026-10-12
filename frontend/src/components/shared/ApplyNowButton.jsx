import { useApplicationTracking } from '@/contexts/useApplicationTracking';
import { getSchemeApplicationUrl } from '@/utils/schemeLinks';
import { Button } from '@/components/ui/Button';

export function ApplyNowButton({
  scheme,
  children,
  disabled = false,
  ...buttonProps
}) {
  const { applications, applicationLimit, applicationPending, beginApplication } = useApplicationTracking();
  const url = getSchemeApplicationUrl(scheme);
  const schemeId = scheme.schemeId || scheme.id;
  const alreadyApplied = applications.some((application) => application.schemeId === schemeId);
  const limitReached = applications.length >= applicationLimit;
  const isDisabled = disabled || !url || alreadyApplied || limitReached || applicationPending;
  const title = alreadyApplied
    ? 'You already recorded an application for this scheme.'
    : limitReached
      ? `You can apply to a maximum of ${applicationLimit} schemes.`
      : applicationPending
        ? 'Confirm or dismiss the pending application before applying to another scheme.'
        : !url
          ? 'Application website is not provided in the scheme data.'
          : undefined;
  const label = alreadyApplied
    ? 'Applied'
    : limitReached
      ? `Application limit reached (${applications.length}/${applicationLimit})`
      : applicationPending
        ? 'Confirm pending application'
        : !url
          ? 'Apply link unavailable'
          : children;

  const handleClick = (event) => {
    if (isDisabled || !beginApplication(scheme)) {
      event.preventDefault();
    }
  };

  return (
    <Button
      href={url || undefined}
      target="_blank"
      rel="noopener noreferrer"
      disabled={isDisabled}
      title={title}
      onClick={handleClick}
      {...buttonProps}
    >
      {label}
    </Button>
  );
}
