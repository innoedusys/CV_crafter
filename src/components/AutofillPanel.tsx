import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { exampleResumes, getSuggestedSkills, getSuggestedSummary } from '@/lib/resume-examples';
import { Sparkles, FileText, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AutofillPanel() {
  const { resumeData, setResumeData } = useResume();
  const [expanded, setExpanded] = useState(false);

  const loadExample = (exampleId: string) => {
    const example = exampleResumes.find((e) => e.id === exampleId);
    if (!example) return;
    if (!confirm('This will replace your current resume data. Continue?')) return;
    setResumeData(example.data);
  };

  const autofillSummary = () => {
    const title = resumeData.personalInfo.jobTitle;
    const summary = getSuggestedSummary(title);
    setResumeData((prev) => ({ ...prev, summary }));
  };

  const autofillSkills = () => {
    const title = resumeData.personalInfo.jobTitle;
    const suggested = getSuggestedSkills(title);
    const merged = [...new Set([...resumeData.skills, ...suggested])];
    setResumeData((prev) => ({ ...prev, skills: merged }));
  };

  return (
    <div className="mx-4 mb-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between rounded-lg border bg-card px-3 py-2 text-xs transition-colors hover:bg-muted"
      >
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="font-medium">Quick Fill & Examples</span>
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
            <div className="space-y-3 pt-3">
              {/* Quick actions */}
              <div>
                <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Quick Actions</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={autofillSummary}
                    className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] transition-colors hover:bg-muted"
                  >
                    <Zap className="h-3 w-3 text-primary" />
                    Generate Summary
                  </button>
                  <button
                    onClick={autofillSkills}
                    className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] transition-colors hover:bg-muted"
                  >
                    <Zap className="h-3 w-3 text-primary" />
                    Suggest Skills
                  </button>
                </div>
              </div>

              {/* Example resumes */}
              <div>
                <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Load Example Resume</p>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
