import { useResume } from '@/contexts/ResumeContext';
import { validateResume, ValidationWarning } from '@/lib/validation';
import { AlertTriangle, Info, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ValidationPanel() {
  const { resumeData } = useResume();
  const [expanded, setExpanded] = useState(false);
  const warnings = validateResume(resumeData);

  if (warnings.length === 0) {
    return (
      <div className="mx-4 mb-3 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Your resume looks great!
      </div>
    );
  }

  const warningCount = warnings.filter((w) => w.severity === 'warning').length;
  const infoCount = warnings.filter((w) => w.severity === 'info').length;

  return (
    <div className="mx-4 mb-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs transition-colors hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/30 dark:hover:bg-amber-950/50"
      >
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>
            {warningCount > 0 && `${warningCount} suggestion${warningCount > 1 ? 's' : ''}`}
            {warningCount > 0 && infoCount > 0 && ', '}
            {infoCount > 0 && `${infoCount} tip${infoCount > 1 ? 's' : ''}`}
          </span>
        </div>
        {expanded ? <ChevronUp className="h-3.5 w-3.5 text-amber-600" /> : <ChevronDown className="h-3.5 w-3.5 text-amber-600" />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-1 pt-2">
              {warnings.map((w) => (
                <WarningItem key={w.id} warning={w} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WarningItem({ warning }: { warning: ValidationWarning }) {
  const isWarning = warning.severity === 'warning';
  return (
    <div className={`flex items-start gap-2 rounded-md px-3 py-1.5 text-[11px] ${
      isWarning
        ? 'text-amber-700 dark:text-amber-400'
        : 'text-muted-foreground'
    }`}>
      {isWarning ? <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" /> : <Info className="mt-0.5 h-3 w-3 shrink-0" />}
      <span><strong className="font-medium">{warning.section}:</strong> {warning.message}</span>
    </div>
  );
}
