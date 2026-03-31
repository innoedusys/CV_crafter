import { useEffect, useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Experience, Education } from '@/types/resume';
import {
  Plus, Trash2, User, Briefcase, GraduationCap, Lightbulb,
  X, GripVertical, Type, Wand2, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { generateCVData, improveWithAI } from '@/utils/generator';

const ROLE_SUGGESTIONS = [
  'Frontend Dasturchi', 'Backend Dasturchi', 'Full Stack Dasturchi', 'Dasturiy Ta\'minot',
  'UX Dizayner', 'UI Dizayner', 'Data Scientist', 'Ma\'lumotlar Tahlilchisi', 'DevOps Muhandisi',
  'Mahsulot Menejeri', 'Mobil Dasturchi', 'Bulut Muhandisi', 'Marketing Menejeri',
  'Loyiha Menejeri', 'Grafik Dizayner', 'Kiberxavfsizlik Muhandisi', 'Talaba',
];

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export default function ResumeForm() {
  const { resumeData, setResumeData } = useResume();
  const [skillInput, setSkillInput] = useState('');
  const [roleDropdown, setRoleDropdown] = useState(false);
  const [improving, setImproving] = useState(false);

  // ── Auto-fill: when name + role filled, auto-populate everything else ──────
  useEffect(() => {
    const name = resumeData.personalInfo.fullName;
    const role = resumeData.personalInfo.jobTitle;
    if (!name || !role) return;

    // Only auto-fill sections that are still empty
    const needsFill =
      !resumeData.summary ||
      resumeData.experience.length === 0 ||
      resumeData.education.length === 0 ||
      resumeData.skills.length === 0;

    if (!needsFill) return;

    const generated = generateCVData(name, role, resumeData);
    setResumeData((prev) => ({
      ...generated,
      personalInfo: prev.personalInfo, // keep whatever the user typed in the form
      // only fill empty fields
      summary: prev.summary || generated.summary,
      experience: prev.experience.length > 0 ? prev.experience : generated.experience,
      education: prev.education.length > 0 ? prev.education : generated.education,
      skills: prev.skills.length > 0 ? prev.skills : generated.skills,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeData.personalInfo.fullName, resumeData.personalInfo.jobTitle]);

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const handleRoleSelect = (role: string) => {
    updatePersonalInfo('jobTitle', role);
    setRoleDropdown(false);
  };

  const handleImproveWithAI = async () => {
    setImproving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setResumeData((prev) => improveWithAI(prev));
    setImproving(false);
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: generateId(), company: '', position: '', startDate: '', endDate: '', description: '',
    };
    setResumeData((prev) => ({ ...prev, experience: [...prev.experience, newExp] }));
  };
  const updateExperience = (id: string, field: string, value: string) =>
    setResumeData((prev) => ({
      ...prev, experience: prev.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  const removeExperience = (id: string) =>
    setResumeData((prev) => ({ ...prev, experience: prev.experience.filter((e) => e.id !== id) }));
  const reorderExperience = (newOrder: Experience[]) =>
    setResumeData((prev) => ({ ...prev, experience: newOrder }));

  const addEducation = () => {
    const newEdu: Education = {
      id: generateId(), school: '', degree: '', field: '', startDate: '', endDate: '',
    };
    setResumeData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };
  const updateEducation = (id: string, field: string, value: string) =>
    setResumeData((prev) => ({
      ...prev, education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  const removeEducation = (id: string) =>
    setResumeData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));
  const reorderEducation = (newOrder: Education[]) =>
    setResumeData((prev) => ({ ...prev, education: newOrder }));

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed || resumeData.skills.includes(trimmed)) { setSkillInput(''); return; }
    setResumeData((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    setSkillInput('');
  };
  const removeSkill = (skill: string) =>
    setResumeData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));

  const inputClass =
    'w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors';

  const filteredRoles = ROLE_SUGGESTIONS.filter(
    (r) => r.toLowerCase().includes((resumeData.personalInfo.jobTitle || '').toLowerCase())
  );

  return (
    <div className="space-y-6 overflow-y-auto p-6">

      {/* Smart Quick-Fill banner */}
      <div className="rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-md bg-primary/15 p-1.5">
            <Wand2 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Aqlli Avto-To'ldirish ✨</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Faqat <strong>Ismingizni</strong> va <strong>Rolinigizni</strong> kiriting — sun'iy intellekt to'liq rezyumeni avtomatik yaratadi.
            </p>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <Section icon={User} title="Shaxsiy Ma'lumotlar">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <input
              id="cv-full-name"
              className={inputClass}
              placeholder="To'liq Ism *"
              value={resumeData.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            />
          </div>

          {/* Role with dropdown */}
          <div className="relative col-span-2">
            <div className="relative">
              <input
                id="cv-job-title"
                className={inputClass}
                placeholder="Kasb / Rol *"
                value={resumeData.personalInfo.jobTitle}
                onChange={(e) => { updatePersonalInfo('jobTitle', e.target.value); setRoleDropdown(true); }}
                onFocus={() => setRoleDropdown(true)}
                onBlur={() => setTimeout(() => setRoleDropdown(false), 150)}
                autoComplete="off"
              />
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <AnimatePresence>
              {roleDropdown && filteredRoles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute left-0 right-0 top-full z-50 mt-1 max-h-52 overflow-y-auto rounded-lg border bg-popover shadow-elevated"
                >
                  {filteredRoles.map((role) => (
                    <button
                      key={role}
                      onMouseDown={() => handleRoleSelect(role)}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted transition-colors"
                    >
                      <Briefcase className="h-3.5 w-3.5 shrink-0 text-primary" />
                      {role}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <input className={inputClass} placeholder="Elektron pochta (ixtiyoriy)" value={resumeData.personalInfo.email} onChange={(e) => updatePersonalInfo('email', e.target.value)} />
          <input className={inputClass} placeholder="Telefon (ixtiyoriy)" value={resumeData.personalInfo.phone} onChange={(e) => updatePersonalInfo('phone', e.target.value)} />
          <input className={inputClass} placeholder="Manzil (ixtiyoriy)" value={resumeData.personalInfo.location} onChange={(e) => updatePersonalInfo('location', e.target.value)} />
          <input className={inputClass} placeholder="Veb-sayt (ixtiyoriy)" value={resumeData.personalInfo.website} onChange={(e) => updatePersonalInfo('website', e.target.value)} />
        </div>
      </Section>

      {/* Summary */}
      <Section icon={Type} title="Kasbiy Xulosa">
        <textarea
          className={`${inputClass} min-h-[90px] resize-none`}
          placeholder="Qisqacha kasbiy xulosa yozing... (rolingizdan avtomatik yaratiladi)"
          value={resumeData.summary}
          onChange={(e) => setResumeData((prev) => ({ ...prev, summary: e.target.value }))}
        />
        <button
          onClick={handleImproveWithAI}
          disabled={improving}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 px-3 py-1.5 text-xs font-semibold text-white shadow transition-all hover:shadow-md hover:scale-[1.02] disabled:opacity-70"
        >
          <Wand2 className={`h-3.5 w-3.5 ${improving ? 'animate-spin' : ''}`} />
          {improving ? 'Yaxshilanmoqda...' : '✨ AI bilan Yaxshilash'}
        </button>
      </Section>

      {/* Experience */}
      <Section icon={Briefcase} title="Tajriba" onAdd={addExperience}>
        {resumeData.experience.length > 0 && (
          <Reorder.Group axis="y" values={resumeData.experience} onReorder={reorderExperience} className="space-y-3">
            {resumeData.experience.map((exp) => (
              <Reorder.Item key={exp.id} value={exp}>
                <div className="relative space-y-3 rounded-lg border bg-muted/30 p-4">
                  <div className="absolute left-2 top-3 cursor-grab text-muted-foreground/50 active:cursor-grabbing">
                    <GripVertical className="h-4 w-4" />
                  </div>
                  <button onClick={() => removeExperience(exp.id)} className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition-colors hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="grid grid-cols-2 gap-3 pl-5">
                    <input className={inputClass} placeholder="Kompaniya" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} />
                    <input className={inputClass} placeholder="Lavozim" value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} />
                    <input className={inputClass} placeholder="Boshlanish Sanasi (masalan, Yan 2022)" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} />
                    <input className={inputClass} placeholder="Tugash Sanasi (yoki Hozirgacha)" value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} />
                  </div>
                  <textarea
                    className={`${inputClass} ml-5 min-h-[60px] w-[calc(100%-1.25rem)] resize-none`}
                    placeholder="Vazifalaringiz va yutuqlaringizni ta'riflang..."
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
      <Section icon={GraduationCap} title="Ta'lim" onAdd={addEducation}>
        {resumeData.education.length > 0 && (
          <Reorder.Group axis="y" values={resumeData.education} onReorder={reorderEducation} className="space-y-3">
            {resumeData.education.map((edu) => (
              <Reorder.Item key={edu.id} value={edu}>
                <div className="relative space-y-3 rounded-lg border bg-muted/30 p-4">
                  <div className="absolute left-2 top-3 cursor-grab text-muted-foreground/50 active:cursor-grabbing">
                    <GripVertical className="h-4 w-4" />
                  </div>
                  <button onClick={() => removeEducation(edu.id)} className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition-colors hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="grid grid-cols-2 gap-3 pl-5">
                    <input className={inputClass} placeholder="Maktab / Universitet" value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} />
                    <input className={inputClass} placeholder="Daraja (masalan, Bakalavr)" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} />
                    <input className={inputClass} placeholder="Ta'lim Sohasi" value={edu.field} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} />
                    <input className={inputClass} placeholder="Boshlanish Yili" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} />
                    <input className={inputClass} placeholder="Tugash Yili (yoki Hozirgacha)" value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} />
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </Section>

      {/* Skills */}
      <Section icon={Lightbulb} title="Ko'nikmalar">
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
            <Plus className="h-3 w-3" /> Qo'shish
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
  icon: Icon, title, children, onAdd,
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
            <Plus className="h-3 w-3" /> Qo'shish
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
