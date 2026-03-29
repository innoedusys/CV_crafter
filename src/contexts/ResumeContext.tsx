import { useState } from 'react';
import { createContext, useContext } from 'react';
import { ResumeData, TemplateType, defaultResumeData } from '@/types/resume';

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  template: TemplateType;
  setTemplate: (t: TemplateType) => void;
  isPremium: boolean;
  setIsPremium: (v: boolean) => void;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
}

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem('resumeforge-data');
      return saved ? JSON.parse(saved) : defaultResumeData;
    } catch {
      return defaultResumeData;
    }
  });

  const [template, setTemplate] = useState<TemplateType>(() => {
    return (localStorage.getItem('resumeforge-template') as TemplateType) || 'minimal';
  });

  const [isPremium] = useState(false);

  const updateResumeData: React.Dispatch<React.SetStateAction<ResumeData>> = (value) => {
    setResumeData((prev) => {
      const next = typeof value === 'function' ? value(prev) : value;
      localStorage.setItem('resumeforge-data', JSON.stringify(next));
      return next;
    });
  };

  const updateTemplate = (t: TemplateType) => {
    setTemplate(t);
    localStorage.setItem('resumeforge-template', t);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData: updateResumeData,
        template,
        setTemplate: updateTemplate,
        isPremium,
        setIsPremium: () => {},
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}
