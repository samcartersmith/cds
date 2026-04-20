import { useCallback, useRef, useState } from 'react';

export type ReportReplaceOp = 'report-apply' | 'report-revert' | 'suggestion' | null;

export function useReplaceState() {
  const [replaceLoading, setReplaceLoading] = useState(false);
  const [replaceSuccess, setReplaceSuccess] = useState(false);
  const [replaceError, setReplaceError] = useState<string | null>(null);
  const [replacedLayerId, setReplacedLayerId] = useState<string | null>(null);
  const [reportFixSuccessWasRevert, setReportFixSuccessWasRevert] = useState(false);

  const revertPayloadByFindingIdRef = useRef<
    Record<string, { layerId: string; originalText: string }>
  >({});
  const replaceOperationRef = useRef<ReportReplaceOp>(null);
  const lastReportFindingIdRef = useRef<string | null>(null);

  const resetReplaceFeedback = useCallback(() => {
    setReplaceError(null);
    setReplaceSuccess(false);
    setReplacedLayerId(null);
  }, []);

  return {
    replaceLoading,
    setReplaceLoading,
    replaceSuccess,
    setReplaceSuccess,
    replaceError,
    setReplaceError,
    replacedLayerId,
    setReplacedLayerId,
    reportFixSuccessWasRevert,
    setReportFixSuccessWasRevert,
    revertPayloadByFindingIdRef,
    replaceOperationRef,
    lastReportFindingIdRef,
    resetReplaceFeedback,
  };
}
