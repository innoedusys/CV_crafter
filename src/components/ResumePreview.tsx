import { useResume } from '@/contexts/ResumeContext';
import { getTemplate } from '@/lib/templates';
import TemplateRenderer from './templates/TemplateRenderer';
import { getDisplayData } from '@/utils/generator';
import PreviewWrapper from './PreviewWrapper';

export default function ResumePreview() {
  const { resumeData, template, isPremium } = useResume();
  const config = getTemplate(template);
  const showWatermark = !isPremium;

  // Always display a fully-populated CV — never empty
  const displayData = getDisplayData(resumeData);

  return (
    <PreviewWrapper>
      <div
        id="cv-paper"
        className="relative shadow-elevated overflow-hidden bg-white rounded-[2px]"
        style={{
          width: '794px',
          height: '1123px',   
          backgroundColor: '#ffffff'
        }}
      >
        <TemplateRenderer 
          data={displayData} 
          config={config} 
          showWatermark={showWatermark} 
        />
      </div>
    </PreviewWrapper>
  );
}
