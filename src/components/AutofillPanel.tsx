import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { exampleResumes } from '@/lib/resume-examples';
import { generateCVData } from '@/utils/generator';
import { Sparkles, FileText, ChevronDown, ChevronUp, Zap, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QUICK_ROLES = [
  { label: 'Frontend Dev', role: 'Frontend Developer', emoji: '🎨' },
  { label: 'Backend Dev', role: 'Backend Developer', emoji: '⚙️' },
  { label: 'Full Stack', role: 'Full Stack Developer', emoji: '🚀' },
  { label: 'Data Scientist', role: 'Data Scientist', emoji: '📊' },
  { label: 'UX Designer', role: 'UX Designer', emoji: '✏️' },
  { label: 'Product Manager', role: 'Product Manager', emoji: '📋' },
  { label: 'DevOps', role: 'DevOps Engineer', emoji: '🔧' },
  { label: 'Student', role: 'Student', emoji: '🎓' },
];

export default function AutofillPanel() {
  const { resumeData, setResumeData } = useResume();
  const [expanded, setExpanded] = useState(false);

  const quickFillRole = (role: string) => {
    const name = resumeData.personalInfo.fullName || 'Alex Johnson';
    const generated = generateCVData(name, role);
    setResumeData({
      ...generated,
      personalInfo: {
        ...generated.personalInfo,
        // keep user's name if they typed one
        fullName: resumeData.personalInfo.fullName || generated.personalInfo.fullName,
      },
    });
  };

  const loadExample = (exampleId: string) => {
    const example = exampleResumes.find((e) => e.id === exampleId);
    if (!example) return;
    if (!confirm('This will replace your current resume data. Continue?')) return;
    setResumeData(example.data);
  };

  return (
    <div className="mx-4 mb-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between rounded-lg border bg-gradient-to-r from-primary/5 to-primary/10 px-3 py-2.5 text-xs transition-colors hover:bg-primary/10"
      >
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="font-semibold">Quick Fill &amp; Smart Examples</span>
        </div>
        {expanded ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-3">
              {/* One-click role quick fills */}
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  ⚡ One-Click Full CV Generation
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {QUICK_ROLES.map(({ label, role, emoji }) => (
                    <button
                      key={role}
                      onClick={() => quickFillRole(role)}
                      className="flex items-center gap-1.5 rounded-md border bg-card px-2.5 py-2 text-left text-[11px] font-medium transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                    >
                      <span>{emoji}</span>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Example resumes */}
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  📄 Load Complete Example
                </p>
                <div className="space-y-1.5">
                  {exampleResumes.map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => loadExample(ex.id)}
                      className="flex w-full items-center gap-2 rounded-md border px-2.5 py-2 text-left text-[11px] transition-colors hover:bg-muted"
                    >
                      <FileText className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">{ex.title}</p>
                        <p className="text-muted-foreground">{ex.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tip */}
              <div className="rounded-md bg-primary/5 px-3 py-2 text-[10px] text-primary/80">
                <span className="font-semibold">💡 Tip:</span> Enter your Name + Role in the form and the CV auto-fills instantly.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
