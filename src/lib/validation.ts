import { ResumeData } from '@/types/resume';

export interface ValidationWarning {
  id: string;
  section: string;
  message: string;
  severity: 'info' | 'warning';
}

export function validateResume(data: ResumeData): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];

  if (!data.personalInfo.fullName.trim()) {
    warnings.push({ id: 'name', section: 'Personal Info', message: 'Add your full name', severity: 'warning' });
  }
  if (!data.personalInfo.email.trim()) {
    warnings.push({ id: 'email', section: 'Personal Info', message: 'Add your email address', severity: 'warning' });
  }
  if (!data.personalInfo.jobTitle.trim()) {
    warnings.push({ id: 'title', section: 'Personal Info', message: 'Add a job title to stand out', severity: 'info' });
  }
  if (!data.summary.trim()) {
    warnings.push({ id: 'summary', section: 'Summary', message: 'Add a professional summary', severity: 'info' });
  }
  if (data.experience.length === 0) {
    warnings.push({ id: 'exp', section: 'Experience', message: 'Add at least one work experience', severity: 'warning' });
  }
  if (data.education.length === 0) {
    warnings.push({ id: 'edu', section: 'Education', message: 'Add your education background', severity: 'info' });
  }
  if (data.skills.length < 2) {
    warnings.push({ id: 'skills', section: 'Skills', message: 'Add at least 2 skills to improve your resume', severity: 'warning' });
  }
  if (data.skills.length > 15) {
    warnings.push({ id: 'skills-max', section: 'Skills', message: 'Consider trimming skills to the most relevant 10–15', severity: 'info' });
  }

  // Check for incomplete experience entries
  data.experience.forEach((exp, i) => {
    if (!exp.description.trim()) {
      warnings.push({ id: `exp-desc-${i}`, section: 'Experience', message: `Add a description for "${exp.position || `Experience ${i + 1}`}"`, severity: 'info' });
    }
  });

  return warnings;
}
