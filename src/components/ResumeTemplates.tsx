import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface Props {
  data: ResumeData;
  showWatermark: boolean;
}

export function MinimalTemplate({ data, showWatermark }: Props) {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="resume-content space-y-5 p-8 font-body text-[11px] leading-relaxed text-[#222]">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && <p className="mt-1 text-sm text-[#666]">{personalInfo.jobTitle}</p>}
        <div className="mt-2 flex flex-wrap gap-4 text-[10px] text-[#888]">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{personalInfo.location}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{personalInfo.website}</span>}
        </div>
      </div>

      {summary && (
        <div>
          <h2 className="mb-1 text-xs font-bold uppercase tracking-widest text-[#444]">Summary</h2>
          <p className="text-[#555]">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#444]">Experience</h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-[#222]">{exp.position}</p>
                    <p className="text-[#666]">{exp.company}</p>
                  </div>
                  <p className="shrink-0 text-[10px] text-[#999]">{exp.startDate} – {exp.endDate || 'Present'}</p>
                </div>
                {exp.description && <p className="mt-1 text-[#555]">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#444]">Education</h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-[#222]">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                  <p className="text-[#666]">{edu.school}</p>
                </div>
                <p className="shrink-0 text-[10px] text-[#999]">{edu.startDate} – {edu.endDate || 'Present'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#444]">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span key={skill} className="rounded bg-[#f3f3f3] px-2 py-0.5 text-[10px] text-[#555]">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {showWatermark && (
        <p className="pt-4 text-center text-[9px] text-[#ccc]">Created with ResumeForge</p>
      )}
    </div>
  );
}

export function ModernTemplate({ data, showWatermark }: Props) {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="resume-content flex font-body text-[11px] leading-relaxed text-[#222]">
      {/* Sidebar */}
      <div className="w-[35%] space-y-5 bg-[#1a1a2e] p-6 text-[#e0e0e0]">
        <div>
          <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.jobTitle && <p className="mt-1 text-xs text-[#a0a0cc]">{personalInfo.jobTitle}</p>}
        </div>

        <div className="space-y-2 text-[10px]">
          {personalInfo.email && <p className="flex items-center gap-2"><Mail className="h-3 w-3 text-[#6c63ff]" />{personalInfo.email}</p>}
          {personalInfo.phone && <p className="flex items-center gap-2"><Phone className="h-3 w-3 text-[#6c63ff]" />{personalInfo.phone}</p>}
          {personalInfo.location && <p className="flex items-center gap-2"><MapPin className="h-3 w-3 text-[#6c63ff]" />{personalInfo.location}</p>}
          {personalInfo.website && <p className="flex items-center gap-2"><Globe className="h-3 w-3 text-[#6c63ff]" />{personalInfo.website}</p>}
        </div>

        {skills.length > 0 && (
          <div>
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#6c63ff]">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span key={skill} className="rounded bg-[#2a2a4a] px-2 py-0.5 text-[10px]">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main */}
      <div className="flex-1 space-y-5 p-6">
        {summary && (
          <div>
            <h2 className="mb-1 text-xs font-bold uppercase tracking-widest text-[#6c63ff]">Summary</h2>
            <p className="text-[#555]">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#6c63ff]">Experience</h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <p className="font-semibold">{exp.position}</p>
                  <p className="text-[#888]">{exp.company} · {exp.startDate} – {exp.endDate || 'Present'}</p>
                  {exp.description && <p className="mt-1 text-[#555]">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#6c63ff]">Education</h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                  <p className="text-[#888]">{edu.school} · {edu.startDate} – {edu.endDate || 'Present'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {showWatermark && (
          <p className="pt-4 text-center text-[9px] text-[#ccc]">Created with ResumeForge</p>
        )}
      </div>
    </div>
  );
}

export function ProfessionalTemplate({ data, showWatermark }: Props) {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="resume-content space-y-5 p-8 font-body text-[11px] leading-relaxed text-[#222]">
      {/* Header */}
      <div className="border-b-2 border-[#2563eb] pb-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-[#1e3a5f]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && <p className="mt-1 text-sm text-[#2563eb]">{personalInfo.jobTitle}</p>}
        <div className="mt-2 flex flex-wrap justify-center gap-4 text-[10px] text-[#666]">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {summary && (
        <div>
          <h2 className="mb-1 border-b border-[#e5e7eb] pb-1 text-xs font-bold uppercase tracking-widest text-[#1e3a5f]">Professional Summary</h2>
          <p className="mt-2 text-[#555]">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div>
          <h2 className="mb-2 border-b border-[#e5e7eb] pb-1 text-xs font-bold uppercase tracking-widest text-[#1e3a5f]">Professional Experience</h2>
          <div className="mt-2 space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-[#222]">{exp.position}</p>
                    <p className="text-[#2563eb]">{exp.company}</p>
                  </div>
                  <p className="shrink-0 text-[10px] text-[#999]">{exp.startDate} – {exp.endDate || 'Present'}</p>
                </div>
                {exp.description && <p className="mt-1 text-[#555]">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div>
          <h2 className="mb-2 border-b border-[#e5e7eb] pb-1 text-xs font-bold uppercase tracking-widest text-[#1e3a5f]">Education</h2>
          <div className="mt-2 space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-[#222]">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                  <p className="text-[#666]">{edu.school}</p>
                </div>
                <p className="shrink-0 text-[10px] text-[#999]">{edu.startDate} – {edu.endDate || 'Present'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className="mb-2 border-b border-[#e5e7eb] pb-1 text-xs font-bold uppercase tracking-widest text-[#1e3a5f]">Skills</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="rounded border border-[#2563eb]/20 bg-[#eff6ff] px-2 py-0.5 text-[10px] text-[#2563eb]">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {showWatermark && (
        <p className="pt-4 text-center text-[9px] text-[#ccc]">Created with ResumeForge</p>
      )}
    </div>
  );
}
