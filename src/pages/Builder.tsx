import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, ArrowLeft, Crown, RotateCcw, Copy, History, X } from 'lucide-react';
import { exportToPDF } from '@/utils/pdfExport';
import { ResumeProvider, useResume } from '@/contexts/ResumeContext';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import TemplateSelector from '@/components/TemplateSelector';
import UpgradeModal from '@/components/UpgradeModal';
import ValidationPanel from '@/components/ValidationPanel';
import AutofillPanel from '@/components/AutofillPanel';
import { defaultResumeData } from '@/types/resume';
import { motion, AnimatePresence } from 'framer-motion';

interface DownloadRecord {
  id: string;
  date: string;
  template: string;
}

function BuilderContent() {
  const { resumeData, setResumeData, template, isPremium } = useResume();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const [downloadHistory, setDownloadHistory] = useState<DownloadRecord[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('resumeforge-downloads') || '[]');
    } catch { return []; }
  });

  const handleDownload = async () => {
    const { getTemplate } = await import('@/lib/templates');
    const config = getTemplate(template);
    if (!isPremium && config.premium) {
      setShowUpgrade(true);
      return;
    }

    setExporting(true);
    try {
      const el = document.getElementById('cv-paper');
      if (!el) return;

      await exportToPDF({ element: el, filename: `resume-${template}` });

      // Save to download history
      const record: DownloadRecord = {
        id: Date.now().toString(),
        date: new Date().toLocaleString(),
        template: config.name,
      };
      const updated = [record, ...downloadHistory].slice(0, 20);
      setDownloadHistory(updated);
      localStorage.setItem('resumeforge-downloads', JSON.stringify(updated));
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setExporting(false);
    }
  };

  const handleReset = () => {
    if (!confirm('Barcha ma\'lumotlarni o\'chirishga ishonchingiz komilmi? Buni bekor qilib bo\'lmaydi.')) return;
    setResumeData(defaultResumeData);
  };

  const handleDuplicate = () => {
    // Save current state as a "duplicate" in localStorage
    const duplicates = JSON.parse(localStorage.getItem('resumeforge-duplicates') || '[]');
    const dup = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      data: resumeData,
      template,
    };
    const updated = [dup, ...duplicates].slice(0, 10);
    localStorage.setItem('resumeforge-duplicates', JSON.stringify(updated));
    alert('Rezyume nushasi yaratildi! Saqlangan nushalarni huddi shu yerdan yuklashingiz mumkin.');
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-display text-lg">ResumeForge</span>
          </div>
          <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-green-600">Avto-saqlangan</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
            title="Shaklni tozalash"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleDuplicate}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
            title="Nusha ko'chirish"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="relative inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
            title="Yuklashlar tarixi"
          >
            <History className="h-3.5 w-3.5" />
            {downloadHistory.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground">
                {downloadHistory.length}
              </span>
            )}
          </button>
          {!isPremium && (
            <button
              onClick={() => setShowUpgrade(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
            >
              <Crown className="h-3.5 w-3.5" />
              Pro-ga Yangilash
            </button>
          )}
          <button
            onClick={handleDownload}
            disabled={exporting}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {exporting ? 'Yuklanmoqda...' : 'PDF Yuklash'}
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Form */}
        <div className="w-[420px] shrink-0 overflow-y-auto border-r bg-card">
          <TemplateSelector />
          <AutofillPanel />
          <ValidationPanel />
          <ResumeForm />
        </div>
        {/* Right: Preview */}
        <div className="relative flex-1 overflow-hidden">
          <ResumePreview />

          {/* Download History Dropdown */}
          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-4 top-4 z-10 w-72 rounded-lg border bg-card p-4 shadow-elevated"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground">Yuklashlar Tarixi</h4>
                  <button onClick={() => setShowHistory(false)} className="rounded p-1 text-muted-foreground hover:bg-muted">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                {downloadHistory.length === 0 ? (
                  <p className="text-xs text-muted-foreground">Hali yuklashlar yo'q.</p>
                ) : (
                  <div className="max-h-60 space-y-2 overflow-y-auto">
                    {downloadHistory.map((record) => (
                      <div key={record.id} className="flex items-center justify-between rounded-md border px-3 py-2 text-xs">
                        <div>
                          <p className="font-medium text-foreground">{record.template}</p>
                          <p className="text-muted-foreground">{record.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </div>
  );
}

export default function BuilderPage() {
  return (
    <ResumeProvider>
      <BuilderContent />
    </ResumeProvider>
  );
}
