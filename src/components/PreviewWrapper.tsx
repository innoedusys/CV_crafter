import React, { useEffect, useState, useRef } from 'react';
import { ZoomIn, ZoomOut, Maximize, Image as ImageIcon, Download } from 'lucide-react';
import { A4_HEIGHT_PX, A4_WIDTH_PX, exportToImage, exportToPDF } from '@/utils/pdfExport';
import { useResume } from '@/contexts/ResumeContext';
import { getTemplate } from '@/lib/templates';
import UpgradeModal from './UpgradeModal';

interface PreviewWrapperProps {
  children: React.ReactNode;
}

export default function PreviewWrapper({ children }: PreviewWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isFitToScreen, setIsFitToScreen] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const { isPremium, template } = useResume();
  const config = getTemplate(template);

  const PADDING = 60; // Total vertical padding (top + bottom)

  const calculateFitScale = () => {
    if (!wrapperRef.current) return 1;
    const containerHeight = wrapperRef.current.clientHeight;
    // Calculate scale strictly based on height to never scroll vertically
    const calculatedScale = (containerHeight - PADDING) / A4_HEIGHT_PX;
    return Math.max(0.1, calculatedScale); // ensure reasonable min scale
  };

  useEffect(() => {
    if (!isFitToScreen) return;

    const handleResize = () => {
      setScale(calculateFitScale());
    };

    // Initial calculation
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFitToScreen]);

  const handleZoomIn = () => {
    setIsFitToScreen(false);
    setScale((s) => Math.min(s + 0.1, 2));
  };

  const handleZoomOut = () => {
    setIsFitToScreen(false);
    setScale((s) => Math.max(s - 0.1, 0.2));
  };

  const handleFitToScreen = () => {
    setIsFitToScreen(true);
    setScale(calculateFitScale());
  };

  const handleDownloadPDF = async () => {
    if (!isPremium && config.premium) {
      setShowUpgrade(true);
      return;
    }
    
    const element = document.getElementById('cv-paper');
    if (!element) return;

    setExporting(true);
    try {
      await exportToPDF({ element, filename: `resume-${template}` });
    } catch (error) {
      console.error('Failed to export PDF:', error);
    } finally {
      setExporting(false);
    }
  };

  const handleDownloadImage = async () => {
        if (!isPremium && config.premium) {
      setShowUpgrade(true);
      return;
    }

    const element = document.getElementById('cv-paper');
    if (!element) return;

    setExporting(true);
    try {
      await exportToImage({ element, filename: `resume-${template}` });
    } catch (error) {
      console.error('Failed to export Image:', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div 
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-muted/30"
      ref={wrapperRef}
    >
      {/* Zoom / Actions floating bar */}
      <div className="absolute bottom-6 z-10 flex items-center gap-2 rounded-full border bg-card/80 p-1.5 shadow-elevated backdrop-blur-sm">
        <button
          onClick={handleZoomOut}
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <span className="w-12 text-center text-xs font-medium text-muted-foreground">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={handleZoomIn}
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <div className="mx-1 h-4 w-px bg-border flex-none" />
        <button
          onClick={handleFitToScreen}
          className={`rounded-full p-2 transition-colors ${
            isFitToScreen
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
          title="Fit to Screen"
        >
          <Maximize className="h-4 w-4" />
        </button>
        <div className="mx-1 h-4 w-px bg-border flex-none" />
        <button
          onClick={handleDownloadImage}
          disabled={exporting}
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
          title="Download as PNG Image"
        >
          <ImageIcon className="h-4 w-4" />
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={exporting}
          className="rounded-full bg-primary p-2 text-primary-foreground shadow-sm transition-transform hover:scale-105 disabled:opacity-50"
          title="Download PDF"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>

      {/* 
        This is the scaled wrapper. 
        It visually scales the CV, but preserves the original logical document sizing.
      */}
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          width: A4_WIDTH_PX,
          height: A4_HEIGHT_PX,
        }}
      >
        {children}
      </div>

      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </div>
  );
}
