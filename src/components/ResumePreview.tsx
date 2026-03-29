import { useResume } from '@/contexts/ResumeContext';
import { getTemplate } from '@/lib/templates';
import TemplateRenderer from './templates/TemplateRenderer';

export default function ResumePreview() {
  const { resumeData, template, isPremium } = useResume();
  const config = getTemplate(template);
  const showWatermark = !isPremium;

  return (
    <div className="flex h-full items-start justify-center overflow-y-auto bg-muted/50 p-6">
      <div className="w-[210mm] min-h-[297mm] bg-white shadow-elevated rounded-sm" id="resume-preview" style={{ aspectRatio: '210 / 297' }}>
        <TemplateRenderer data={resumeData} config={config} showWatermark={showWatermark} />
      </div>
    </div>
  );
}
