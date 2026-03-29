import { useResume } from '@/contexts/ResumeContext';
import { TemplateType } from '@/types/resume';
import { Check } from 'lucide-react';

const templates: { id: TemplateType; name: string; premium: boolean }[] = [
  { id: 'minimal', name: 'Minimal', premium: false },
  { id: 'modern', name: 'Modern', premium: true },
  { id: 'professional', name: 'Professional', premium: true },
];

export default function TemplateSelector() {
  const { template, setTemplate } = useResume();

  return (
    <div className="flex gap-2 p-4 border-b">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => setTemplate(t.id)}
          className={`relative rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
            template === t.id
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border text-muted-foreground hover:border-primary/30'
          }`}
        >
          {template === t.id && <Check className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-primary p-0.5 text-primary-foreground" />}
          {t.name}
          {t.premium && <span className="ml-1 text-[10px] text-muted-foreground">PRO</span>}
        </button>
      ))}
    </div>
  );
}
