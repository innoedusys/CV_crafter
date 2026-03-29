import { X, Crown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpgradeModal({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border bg-card p-8 shadow-elevated"
          >
            <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <div className="mx-auto mb-4 inline-flex rounded-full bg-primary/10 p-3">
                <Crown className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-display text-2xl">Upgrade to Pro</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Unlock all templates and remove the watermark from your resume.
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              {['All premium templates', 'No watermark', 'Custom colors', 'Priority support', 'Multiple resumes'].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-success" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 text-center">
              <p className="mb-3 font-display text-3xl">$9<span className="text-base text-muted-foreground">/month</span></p>
              <button className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                Start Pro Trial
              </button>
              <p className="mt-2 text-xs text-muted-foreground">7-day free trial · Cancel anytime</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
