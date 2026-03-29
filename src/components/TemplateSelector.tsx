import { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { templates, templateCategories, getTemplate, TemplateConfig } from '@/lib/templates';
import { Check, Lock, Crown } from 'lucide-react';
import { defaultResumeData } from '@/types/resume';
import TemplateRenderer from './templates/TemplateRenderer';

const sampleData = {
  ...defaultResumeData,
  personalInfo: {
    fullName: 'Jane Smith',
    jobTitle: 'Product Designer',
    email: 'jane@email.com',
    phone: '+1 555-0123',
    location: 'San Francisco, CA',
    website: 'janesmith.com',
  },
  summary: 'Experienced product designer with 5+ years creating user-centered digital experiences.',
  experience: [
    { id: '1', company: 'Acme Corp', position: 'Senior Designer', startDate: '2021', endDate: 'Present', description: 'Led design system and product redesign.' },
    { id: '2', company: 'StartupXYZ', position: 'UI Designer', startDate: '2019', endDate: '2021', description: 'Designed mobile and web interfaces.' },
  ],
  education: [
    { id: '1', school: 'State University', degree: 'B.A.', field: 'Design', startDate: '2015', endDate: '2019' },
  ],
  skills: ['Figma', 'React', 'CSS', 'UX Research'],
};

export default function TemplateSelector() {
  const { template, setTemplate, isPremium } = useResume();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showUpgrade, setShowUpgrade] = useState(false);

  const filtered = activeCategory === 'all'
    ? templates
    : templates.filter((t) => t.category === activeCategory);

  const handleSelect = (t: TemplateConfig) => {
    if (t.premium && !isPremium) {
      setShowUpgrade(true);
      setTimeout(() => setShowUpgrade(false), 2000);
      return;
    }
    setTemplate(t.id);
  };

  return (
    <div className="border-b">
      {/* Category tabs */}
      <div className="flex items-center gap-1 overflow-x-auto border-b px-3 py-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`shrink-0 rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
            activeCategory === 'all' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          All
        </button>
        {templateCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
              activeCategory === cat.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Upgrade toast */}
      {showUpgrade && (
        <div className="mx-3 mt-2 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-primary">
          <Crown className="h-3.5 w-3.5" />
          Upgrade to Pro to unlock this template
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2 p-3 max-h-[320px] overflow-y-auto">
        {filtered.map((t) => {
          const isSelected = template === t.id;
          const isLocked = t.premium && !isPremium;

          return (
            <button
              key={t.id}
              onClick={() => handleSelect(t)}
              className={`group relative overflow-hidden rounded-lg border text-left transition-all ${
                isSelected
                  ? 'border-primary ring-1 ring-primary/30'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              {/* Mini preview */}
              <div className="relative h-[120px] overflow-hidden bg-white">
                <div className="pointer-events-none" style={{ width: 595, transform: 'scale(0.27)', transformOrigin: 'top left' }}>
                  <TemplateRenderer data={sampleData} config={t} showWatermark={false} />
                </div>
                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/5 backdrop-blur-[0.5px]">
                    <div className="rounded-full bg-card p-1.5 shadow-sm">
                      <Lock className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                )}
                {isSelected && (
                  <div className="absolute right-1.5 top-1.5">
                    <Check className="h-4 w-4 rounded-full bg-primary p-0.5 text-primary-foreground" />
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="flex items-center justify-between border-t px-2 py-1.5">
                <span className="text-[10px] font-medium text-foreground">{t.name}</span>
                {t.premium && (
                  <span className="rounded bg-primary/10 px-1 py-0.5 text-[9px] font-medium text-primary">PRO</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
