import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Experience, Education } from '@/types/resume';
import { Plus, Trash2, User, Briefcase, GraduationCap, Type, Lightbulb, X, GripVertical } from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export default function ResumeForm() {
  const { resumeData, setResumeData } = useResume();

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: generateId(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setResumeData((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  const reorderExperience = (newOrder: Experience[]) => {
    setResumeData((prev) => ({ ...prev, experience: newOrder }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: generateId(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    };
    setResumeData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const reorderEducation = (newOrder: Education[]) => {
    setResumeData((prev) => ({ ...prev, education: newOrder }));
  };

  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    if (resumeData.skills.includes(trimmed)) { setSkillInput(''); return; }
    setResumeData((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    setSkillInput('');
  };

  const removeSkill = (skill: string) => {
    setResumeData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  };

  const inputClass =
    'w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors';

  return (
    <div className="space-y-6 overflow-y-auto p-6">
      {/* Personal Info */}
      <Section icon={User} title="Personal Information">
        <div className="grid grid-cols-2 gap-3">
          <input className={inputClass} placeholder="Full Name" value={resumeData.personalInfo.fullName} onChange={(e) => updatePersonalInfo('fullName', e.target.value)} />
          <input className={inputClass} placeholder="Job Title" value={resumeData.personalInfo.jobTitle} onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)} />
          <input className={inputClass} placeholder="Email" value={resumeData.personalInfo.email} onChange={(e) => updatePersonalInfo('email', e.target.value)} />
          <input className={inputClass} placeholder="Phone" value={resumeData.personalInfo.phone} onChange={(e) => updatePersonalInfo('phone', e.target.value)} />
          <input className={inputClass} placeholder="Location" value={resumeData.personalInfo.location} onChange={(e) => updatePersonalInfo('location', e.target.value)} />
          <input className={inputClass} placeholder="Website" value={resumeData.personalInfo.website} onChange={(e) => updatePersonalInfo('website', e.target.value)} />
        </div>
      </Section>

      {/* Summary */}
      <Section icon={Type} title="Professional Summary">
        <textarea
          className={`${inputClass} min-h-[80px] resize-none`}
          placeholder="Write a brief professional summary..."
          value={resumeData.summary}
          onChange={(e) => setResumeData((prev) => ({ ...prev, summary: e.target.value }))}
        />
      </Section>

      {/* Experience */}
      <Section icon={Briefcase} title="Experience" onAdd={addExperience}>
        {resumeData.experience.length > 0 && (
          <Reorder.Group axis="y" values={resumeData.experience} onReorder={reorderExperience} className="space-y-3">
            {resumeData.experience.map((exp) => (
              <Reorder.Item key={exp.id} value={exp}>
                <div className="relative space-y-3 rounded-lg border bg-muted/30 p-4">
                  <div className="absolute left-2 top-3 cursor-grab text-muted-foreground/50 active:cursor-grabbing">
                    <GripVertical className="h-4 w-4" />
                  </div>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="grid grid-cols-2 gap-3 pl-5">
                    <input className={inputClass} placeholder="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} />
                    <input className={inputClass} placeholder="Position" value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} />
                    <input className={inputClass} placeholder="Start Date (e.g. Jan 2022)" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} />
                    <input className={inputClass} placeholder="End Date (or Present)" value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} />
                  </div>
                  <textarea
                    className={`${inputClass} ml-5 min-h-[60px] w-[calc(100%-1.25rem)] resize-none`}
                    placeholder="Describe your responsibilities..."
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  />
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </Section>

      {/* Education */}
      <Section icon={GraduationCap} title="Education" onAdd={addEducation}>
        {resumeData.education.length > 0 && (
          <Reorder.Group axis="y" values={resumeData.education} onReorder={reorderEducation} className="space-y-3">
            {resumeData.education.map((edu) => (
              <Reorder.Item key={edu.id} value={edu}>
                <div className="relative space-y-3 rounded-lg border bg-muted/30 p-4">
                  <div className="absolute left-2 top-3 cursor-grab text-muted-foreground/50 active:cursor-grabbing">
                    <GripVertical className="h-4 w-4" />
                  </div>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="grid grid-cols-2 gap-3 pl-5">
                    <input className={inputClass} placeholder="School" value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} />
                    <input className={inputClass} placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} />
                    <input className={inputClass} placeholder="Field of Study" value={edu.field} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} />
                    <input className={inputClass} placeholder="Start Date" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} />
                    <input className={inputClass} placeholder="End Date" value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} />
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </Section>

      {/* Skills */}
      <Section icon={Lightbulb} title="Skills">
        <div className="flex gap-2">
          <input
            className={`${inputClass} flex-1`}
            placeholder="e.g. JavaScript"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
          />
          <button
            onClick={addSkill}
            className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
          >
            <Plus className="h-3 w-3" /> Add
          </button>
        </div>
        {resumeData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            <AnimatePresence>
              {resumeData.skills.map((skill) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                >
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="rounded-full p-0.5 transition-colors hover:bg-primary/20">
                    <X className="h-3 w-3" />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Section>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
  onAdd,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  onAdd?: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <h3 className="font-body text-sm font-semibold text-foreground">{title}</h3>
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
          >
            <Plus className="h-3 w-3" /> Add
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
