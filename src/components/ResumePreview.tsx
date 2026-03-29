import { useResume } from '@/contexts/ResumeContext';
import { MinimalTemplate, ModernTemplate, ProfessionalTemplate } from './ResumeTemplates';

export default function ResumePreview() {
  const { resumeData, template, isPremium } = useResume();
  const showWatermark = !isPremium;

  return (
    <div className="flex h-full items-start justify-center overflow-y-auto bg-muted/50 p-6">
      <div className="w-[595px] min-h-[842px] bg-white shadow-elevated rounded-sm" id="resume-preview">
        {template === 'minimal' && <MinimalTemplate data={resumeData} showWatermark={showWatermark} />}
        {template === 'modern' && <ModernTemplate data={resumeData} showWatermark={showWatermark} />}
        {template === 'professional' && <ProfessionalTemplate data={resumeData} showWatermark={showWatermark} />}
      </div>
    </div>
  );
}
