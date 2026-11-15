import { useCallback, useState } from 'react';
import { resumePdf, resumeDocx, coverLetterPdf, coverLetterDocx } from '../lib/exporters.js';
import { downloadBlob } from '../lib/download.js';
import { apiStore } from '../store/stores.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useResume } from '../context/ResumeContext.jsx';
import { useUi } from '../context/UiContext.jsx';

const REASON = {
  resume: 'Create a free account or sign in to download. Everything you’ve built so far is saved to your account automatically.',
  cover: 'Create a free account or sign in to download your cover letter. Your work so far is saved to your account automatically.',
};

/* Downloads need an account. Guests see the sign-in dialog first; once signed in,
   the file downloads straight away and the export is counted on their account. */
export function useExporter() {
  const { showToast } = useUi();
  const { requireAuth } = useAuth();
  const { flushSave } = useResume();
  const [busy, setBusy] = useState(false);

  const run = useCallback(async (kind, build, label) => {
    await flushSave();
    const ok = await requireAuth({ reason: REASON[kind] });
    if (!ok) return;
    setBusy(true);
    try {
      const { blob, filename } = await build();
      downloadBlob(blob, filename);
      showToast(`Downloaded ${filename}`);
      /* always the account store: the user is signed in by now */
      Promise.allSettled([apiStore.incrementStat('exportsCount'), apiStore.addActivity(label)])
        .then(() => window.dispatchEvent(new Event('resumeforge:activity')));
    } catch (err) {
      console.error(err);
      showToast(`Export failed: ${err.message || err}`);
    } finally {
      setBusy(false);
    }
  }, [flushSave, requireAuth, showToast]);

  const exportResume = useCallback((data, format) => {
    const who = data?.heading?.name || 'Untitled';
    return format === 'docx'
      ? run('resume', () => resumeDocx(data), `Downloaded “${who}” as Word`)
      : run('resume', () => resumePdf(data), `Downloaded “${who}” as PDF`);
  }, [run]);

  const exportCoverLetter = useCallback((cl, format) => (
    format === 'docx'
      ? run('cover', () => coverLetterDocx(cl), 'Downloaded cover letter as Word')
      : run('cover', () => coverLetterPdf(cl), 'Downloaded cover letter as PDF')
  ), [run]);

  return { exportResume, exportCoverLetter, busy };
}
