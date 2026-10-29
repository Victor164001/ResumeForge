import { useCallback, useState } from 'react';
import { resumePdf, resumeDocx, coverLetterPdf, coverLetterDocx } from '../lib/exporters.js';
import { downloadBlob } from '../lib/download.js';
import { track } from '../api/client.js';
import { useUi } from '../context/UiContext.jsx';

/* Runs an export, downloads the file and records it (stat + activity) on the server. */
export function useExporter() {
  const { showToast } = useUi();
  const [busy, setBusy] = useState(false);

  const run = useCallback(async (build, label) => {
    setBusy(true);
    try {
      const { blob, filename } = await build();
      downloadBlob(blob, filename);
      showToast(`Downloaded ${filename}`);
      track('exportsCount', label);
    } catch (err) {
      console.error(err);
      showToast(`Export failed: ${err.message || err}`);
    } finally {
      setBusy(false);
    }
  }, [showToast]);

  const exportResume = useCallback((data, format) => {
    const who = data?.heading?.name || 'Untitled';
    return format === 'docx'
      ? run(() => resumeDocx(data), `Downloaded “${who}” as Word`)
      : run(() => resumePdf(data), `Downloaded “${who}” as PDF`);
  }, [run]);

  const exportCoverLetter = useCallback((cl, format) => (
    format === 'docx'
      ? run(() => coverLetterDocx(cl), 'Downloaded cover letter as Word')
      : run(() => coverLetterPdf(cl), 'Downloaded cover letter as PDF')
  ), [run]);

  return { exportResume, exportCoverLetter, busy };
}
