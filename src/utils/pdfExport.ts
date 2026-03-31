import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

/** A4 in pixels at 96 DPI */
export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1123;

/** A4 in mm (for jsPDF) */
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

interface ExportOptions {
  /** DOM element to capture — must have id="cv-paper" or be passed directly */
  element: HTMLElement;
  /** Filename without extension */
  filename?: string;
}

/**
 * Renders the CV to a high-quality PNG canvas, then creates an A4 PDF.
 * The element is captured at 2× for crisp text, then fitted exactly to the A4 page.
 */
export async function exportToPDF({ element, filename = 'resume' }: ExportOptions): Promise<void> {
  // Temporarily remove any CSS transform on the element so html2canvas
  // captures the REAL A4 size, not the scaled preview size.
  const wrapper = element.parentElement;
  const savedTransform = wrapper?.style.transform ?? '';
  const savedTransformOrigin = wrapper?.style.transformOrigin ?? '';
  if (wrapper) {
    wrapper.style.transform = 'none';
    wrapper.style.transformOrigin = 'top left';
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    width: A4_WIDTH_PX,
    height: A4_HEIGHT_PX,
    windowWidth: A4_WIDTH_PX,
    windowHeight: A4_HEIGHT_PX,
  });

  // Restore the wrapper transform
  if (wrapper) {
    wrapper.style.transform = savedTransform;
    wrapper.style.transformOrigin = savedTransformOrigin;
  }

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  pdf.addImage(imgData, 'PNG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);
  pdf.save(`${filename}-${Date.now()}.pdf`);
}

/**
 * Exports the CV as a high-res PNG image.
 */
export async function exportToImage({ element, filename = 'resume' }: ExportOptions): Promise<void> {
  const wrapper = element.parentElement;
  const savedTransform = wrapper?.style.transform ?? '';
  const savedTransformOrigin = wrapper?.style.transformOrigin ?? '';
  if (wrapper) {
    wrapper.style.transform = 'none';
    wrapper.style.transformOrigin = 'top left';
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    width: A4_WIDTH_PX,
    height: A4_HEIGHT_PX,
    windowWidth: A4_WIDTH_PX,
    windowHeight: A4_HEIGHT_PX,
  });

  if (wrapper) {
    wrapper.style.transform = savedTransform;
    wrapper.style.transformOrigin = savedTransformOrigin;
  }

  const link = document.createElement('a');
  link.download = `${filename}-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
