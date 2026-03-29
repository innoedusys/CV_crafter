import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, ArrowLeft, Crown } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';
import { ResumeProvider, useResume } from '@/contexts/ResumeContext';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import TemplateSelector from '@/components/TemplateSelector';
import UpgradeModal from '@/components/UpgradeModal';

function BuilderContent() {
  const { template, isPremium } = useResume();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleDownload = async () => {
    const { getTemplate } = await import('@/lib/templates');
    const config = getTemplate(template);
    if (!isPremium && config.premium) {
      setShowUpgrade(true);
      return;
    }

    setExporting(true);
    try {
      const el = document.getElementById('resume-preview');
      if (!el) return;

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setExporting(false);
    }
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
        </div>
        <div className="flex items-center gap-2">
          {!isPremium && (
            <button
              onClick={() => setShowUpgrade(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
            >
              <Crown className="h-3.5 w-3.5" />
              Upgrade to Pro
            </button>
          )}
          <button
            onClick={handleDownload}
            disabled={exporting}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {exporting ? 'Exporting...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Form */}
        <div className="w-[420px] shrink-0 overflow-y-auto border-r bg-card">
          <TemplateSelector />
          <ResumeForm />
        </div>
        {/* Right: Preview */}
        <div className="flex-1 overflow-hidden">
          <ResumePreview />
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
