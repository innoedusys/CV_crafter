import { ResumeData } from '@/types/resume';
import { TemplateConfig } from '@/lib/templates';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface Props {
  data: ResumeData;
  config: TemplateConfig;
  showWatermark: boolean;
  scale?: number;
}

function SectionHeading({ text, config }: { text: string; config: TemplateConfig }) {
  const style: React.CSSProperties = { color: config.colors.heading };
  const cls = config.style.headingStyle === 'uppercase'
    ? 'text-xs font-bold uppercase tracking-widest'
    : config.style.headingStyle === 'bold-caps'
    ? 'text-xs font-extrabold uppercase tracking-wider'
    : 'text-sm font-semibold';

  const divider = config.style.sectionDivider;
  const borderStyle: React.CSSProperties =
    divider === 'line' ? { borderBottomWidth: 1, borderColor: config.colors.border, paddingBottom: 4 }
    : divider === 'thick-line' ? { borderBottomWidth: 2, borderColor: config.colors.heading, paddingBottom: 4 }
    : divider === 'dotted' ? { borderBottomWidth: 1, borderStyle: 'dotted', borderColor: config.colors.border, paddingBottom: 4 }
    : {};

  return <h2 className={cls} style={{ ...style, ...borderStyle, marginBottom: 8 }}>{text}</h2>;
}

function ContactInfo({ data, config, isSidebar }: { data: ResumeData; config: TemplateConfig; isSidebar?: boolean }) {
  const { email, phone, location, website } = data.personalInfo;
  const color = isSidebar ? config.colors.sidebarAccent || config.colors.accent : config.colors.muted;
  const textColor = isSidebar ? config.colors.sidebarText : config.colors.muted;
  const items = [
    { icon: Mail, value: email },
    { icon: Phone, value: phone },
    { icon: MapPin, value: location },
    { icon: Globe, value: website },
  ].filter((i) => i.value);

  return (
    <div className={`flex ${isSidebar ? 'flex-col gap-2' : 'flex-wrap gap-4'} text-[10px]`}>
      {items.map(({ icon: Icon, value }) => (
        <span key={value} className="flex items-center gap-1.5" style={{ color: textColor }}>
          <Icon className="h-3 w-3" style={{ color }} />
          {value}
        </span>
      ))}
    </div>
  );
}

function SkillTags({ skills, config }: { skills: string[]; config: TemplateConfig }) {
  if (!skills.length) return null;
  return (
    <div className="flex flex-wrap gap-2.5">
      {skills.map((s) => (
        <span key={s} className="rounded px-3 py-1 text-[10px]" style={{ backgroundColor: config.colors.skillBg, color: config.colors.skillText }}>
          {s}
        </span>
      ))}
    </div>
  );
}

function ExperienceSection({ data, config }: { data: ResumeData; config: TemplateConfig }) {
  if (!data.experience.length) return null;
  return (
    <div>
      <SectionHeading text="Experience" config={config} />
      <div className={config.style.density === 'compact' ? 'space-y-4' : 'space-y-5'}>
        {data.experience.map((exp) => (
          <div key={exp.id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold" style={{ color: config.colors.heading }}>{exp.position}</p>
                <p style={{ color: config.colors.accent }}>{exp.company}</p>
              </div>
              <p className="shrink-0 text-[10px]" style={{ color: config.colors.muted }}>
                {exp.startDate} – {exp.endDate || 'Present'}
              </p>
            </div>
            {exp.description && <p className="mt-1.5 leading-relaxed" style={{ color: config.colors.body }}>{exp.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationSection({ data, config }: { data: ResumeData; config: TemplateConfig }) {
  if (!data.education.length) return null;
  return (
    <div>
      <SectionHeading text="Education" config={config} />
      <div className={config.style.density === 'compact' ? 'space-y-3' : 'space-y-4'}>
        {data.education.map((edu) => (
          <div key={edu.id} className="flex items-start justify-between">
            <div>
              <p className="font-semibold" style={{ color: config.colors.heading }}>
                {edu.degree} {edu.field && `in ${edu.field}`}
              </p>
              <p className="mt-0.5" style={{ color: config.colors.muted }}>{edu.school}</p>
            </div>
            <p className="shrink-0 text-[10px]" style={{ color: config.colors.muted }}>
              {edu.startDate} – {edu.endDate || 'Present'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsSection({ data, config }: { data: ResumeData; config: TemplateConfig }) {
  if (!data.skills.length) return null;
  return (
    <div>
      <SectionHeading text="Skills" config={config} />
      <SkillTags skills={data.skills} config={config} />
    </div>
  );
}

function SummarySection({ data, config }: { data: ResumeData; config: TemplateConfig }) {
  if (!data.summary) return null;
  return (
    <div>
      <SectionHeading text="Summary" config={config} />
      <p className="leading-[1.8] max-w-[95%]" style={{ color: config.colors.body }}>{data.summary}</p>
    </div>
  );
}

// ── Layout: Single Column ──
function SingleColumnLayout({ data, config, showWatermark }: Props) {
  const padding = config.style.density === 'compact' ? 'p-8' : 'p-10';
  const gap = config.style.density === 'compact' ? 'space-y-6' : config.style.density === 'relaxed' ? 'space-y-10' : 'space-y-8';
  const isDark = config.id === 'creative-dark';
  const nameSize = config.style.nameSize === '2xl' ? 'text-2xl' : config.style.nameSize === 'xl' ? 'text-xl' : 'text-lg';

  return (
    <div
      className={`resume-content flex flex-col justify-between ${padding} text-[11px] leading-relaxed`}
      style={{ backgroundColor: isDark ? '#1e293b' : '#fff', fontFamily: "'DM Sans', sans-serif", minHeight: '297mm' }}
    >
      {/* Accent bar for creative-accent */}
      {config.id === 'creative-accent' && (
        <div className="h-1.5 w-16 rounded-full" style={{ backgroundColor: config.colors.primary }} />
      )}
      <div style={{ borderBottom: `1px solid ${config.colors.border}`, paddingBottom: 20 }}>
        <h1 className={`${nameSize} font-bold tracking-tight`} style={{ color: config.colors.primary }}>
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        {data.personalInfo.jobTitle && (
          <p className="mt-1.5 text-sm" style={{ color: config.colors.muted }}>{data.personalInfo.jobTitle}</p>
        )}
        <div className="mt-3">
          <ContactInfo data={data} config={config} />
        </div>
      </div>
      <div className={`${gap} flex-1 pt-6`}>
        <SummarySection data={data} config={config} />
        <ExperienceSection data={data} config={config} />
        <EducationSection data={data} config={config} />
        <SkillsSection data={data} config={config} />
      </div>
      {showWatermark && <p className="mt-auto pt-6 text-center text-[9px]" style={{ color: config.colors.muted }}>Created with ResumeForge</p>}
    </div>
  );
}

// ── Layout: Sidebar ──
function SidebarLayout({ data, config, showWatermark }: Props) {
  const isRight = config.layout === 'sidebar-right';
  const sidebarBg = config.colors.sidebarBg || '#1a1a2e';
  const sidebarText = config.colors.sidebarText || '#e0e0e0';
  const sidebarAccent = config.colors.sidebarAccent || config.colors.accent;
  const nameSize = config.style.nameSize === '2xl' ? 'text-xl' : config.style.nameSize === 'xl' ? 'text-lg' : 'text-base';
  const density = config.style.density === 'compact' ? 'space-y-5' : 'space-y-7';
  const lightSidebar = isLightColor(sidebarBg);

  const sidebar = (
    <div className={`w-[35%] flex flex-col justify-between ${density} p-8`} style={{ backgroundColor: sidebarBg, color: sidebarText, fontFamily: "'DM Sans', sans-serif" }}>
      <div className={density}>
        <div>
          <h1 className={`${nameSize} font-bold`} style={{ color: lightSidebar ? config.colors.heading : '#fff' }}>
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          {data.personalInfo.jobTitle && (
            <p className="mt-1.5 text-xs" style={{ color: sidebarAccent }}>{data.personalInfo.jobTitle}</p>
          )}
        </div>
        <ContactInfo data={data} config={config} isSidebar />
        {data.skills.length > 0 && (
          <div>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: sidebarAccent }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s) => (
                <span key={s} className="rounded px-2.5 py-1 text-[10px]"
                  style={{ backgroundColor: lightSidebar ? config.colors.skillBg : `${sidebarAccent}22`, color: lightSidebar ? config.colors.skillText : sidebarText }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div />
    </div>
  );

  const main = (
    <div className={`flex-1 flex flex-col justify-between ${density} p-8 text-[11px] leading-relaxed`} style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className={density}>
        <SummarySection data={data} config={config} />
        <ExperienceSection data={data} config={config} />
        <EducationSection data={data} config={config} />
      </div>
      {showWatermark && <p className="pt-6 text-center text-[9px]" style={{ color: config.colors.muted }}>Created with ResumeForge</p>}
    </div>
  );

  return (
    <div className="resume-content flex text-[11px] leading-relaxed" style={{ minHeight: '297mm' }}>
      {isRight ? <>{main}{sidebar}</> : <>{sidebar}{main}</>}
    </div>
  );
}

// ── Layout: Top Header ──
function TopHeaderLayout({ data, config, showWatermark }: Props) {
  const headerBg = config.colors.headerBg || config.colors.primary;
  const headerText = config.colors.headerText || '#fff';
  const density = config.style.density === 'compact' ? 'space-y-6' : 'space-y-8';
  const nameSize = config.style.nameSize === '2xl' ? 'text-2xl' : config.style.nameSize === 'xl' ? 'text-xl' : 'text-lg';

  return (
    <div className="resume-content flex flex-col justify-between text-[11px] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '297mm' }}>
      <div className="p-10 text-center" style={{ backgroundColor: headerBg, color: headerText }}>
        <h1 className={`${nameSize} font-bold tracking-tight`}>
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        {data.personalInfo.jobTitle && <p className="mt-1.5 text-sm opacity-80">{data.personalInfo.jobTitle}</p>}
        <div className="mt-4 flex flex-wrap justify-center gap-5 text-[10px] opacity-75">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>
      <div className={`${density} flex-1 p-10`}>
        <SummarySection data={data} config={config} />
        <ExperienceSection data={data} config={config} />
        <EducationSection data={data} config={config} />
        <SkillsSection data={data} config={config} />
      </div>
      {showWatermark && <p className="px-10 pb-8 text-center text-[9px]" style={{ color: config.colors.muted }}>Created with ResumeForge</p>}
    </div>
  );
}

function isLightColor(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

export default function TemplateRenderer({ data, config, showWatermark, scale }: Props) {
  const content = (() => {
    switch (config.layout) {
      case 'sidebar-left':
      case 'sidebar-right':
        return <SidebarLayout data={data} config={config} showWatermark={showWatermark} />;
      case 'top-header':
        return <TopHeaderLayout data={data} config={config} showWatermark={showWatermark} />;
      default:
        return <SingleColumnLayout data={data} config={config} showWatermark={showWatermark} />;
    }
  })();

  if (scale && scale !== 1) {
    return (
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: `${100 / scale}%` }}>
        {content}
      </div>
    );
  }
  return content;
}
