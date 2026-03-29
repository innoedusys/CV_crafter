export type TemplateCategory = 'minimal' | 'modern' | 'creative' | 'professional' | 'compact';

export type LayoutType = 'single-column' | 'sidebar-left' | 'sidebar-right' | 'top-header';

export interface TemplateConfig {
  id: string;
  name: string;
  category: TemplateCategory;
  premium: boolean;
  layout: LayoutType;
  colors: {
    primary: string;
    accent: string;
    heading: string;
    body: string;
    muted: string;
    sidebarBg?: string;
    sidebarText?: string;
    sidebarAccent?: string;
    headerBg?: string;
    headerText?: string;
    border: string;
    skillBg: string;
    skillText: string;
  };
  style: {
    sectionDivider: 'line' | 'thick-line' | 'none' | 'dotted';
    headingStyle: 'uppercase' | 'normal' | 'bold-caps';
    nameSize: 'lg' | 'xl' | '2xl';
    density: 'normal' | 'compact' | 'relaxed';
  };
}

export const templateCategories: { id: TemplateCategory; label: string }[] = [
  { id: 'minimal', label: 'Minimal' },
  { id: 'modern', label: 'Modern' },
  { id: 'creative', label: 'Creative' },
  { id: 'professional', label: 'Professional' },
  { id: 'compact', label: 'Compact' },
];

export const templates: TemplateConfig[] = [
  // ── Minimal (5) ──
  {
    id: 'minimal-classic',
    name: 'Classic',
    category: 'minimal',
    premium: false,
    layout: 'single-column',
    colors: {
      primary: '#222', accent: '#222', heading: '#333', body: '#444', muted: '#888',
      border: '#e5e5e5', skillBg: '#f3f3f3', skillText: '#555',
    },
    style: { sectionDivider: 'line', headingStyle: 'uppercase', nameSize: '2xl', density: 'normal' },
  },
  {
    id: 'minimal-clean',
    name: 'Clean',
    category: 'minimal',
    premium: false,
    layout: 'single-column',
    colors: {
      primary: '#1a1a1a', accent: '#1a1a1a', heading: '#1a1a1a', body: '#4a4a4a', muted: '#999',
      border: '#eee', skillBg: '#fafafa', skillText: '#666',
    },
    style: { sectionDivider: 'none', headingStyle: 'bold-caps', nameSize: 'xl', density: 'normal' },
  },
  {
    id: 'minimal-elegant',
    name: 'Elegant',
    category: 'minimal',
    premium: true,
    layout: 'single-column',
    colors: {
      primary: '#2c2c2c', accent: '#8b7355', heading: '#2c2c2c', body: '#555', muted: '#aaa',
      border: '#d4c5a9', skillBg: '#f9f6f0', skillText: '#8b7355',
    },
    style: { sectionDivider: 'line', headingStyle: 'normal', nameSize: '2xl', density: 'relaxed' },
  },
  {
    id: 'minimal-mono',
    name: 'Mono',
    category: 'minimal',
    premium: true,
    layout: 'single-column',
    colors: {
      primary: '#000', accent: '#000', heading: '#000', body: '#333', muted: '#777',
      border: '#000', skillBg: '#000', skillText: '#fff',
    },
    style: { sectionDivider: 'thick-line', headingStyle: 'uppercase', nameSize: '2xl', density: 'normal' },
  },
  {
    id: 'minimal-slate',
    name: 'Slate',
    category: 'minimal',
    premium: true,
    layout: 'single-column',
    colors: {
      primary: '#334155', accent: '#64748b', heading: '#1e293b', body: '#475569', muted: '#94a3b8',
      border: '#e2e8f0', skillBg: '#f1f5f9', skillText: '#475569',
    },
    style: { sectionDivider: 'line', headingStyle: 'uppercase', nameSize: 'xl', density: 'normal' },
  },

  // ── Modern (5) ──
  {
    id: 'modern-blue',
    name: 'Ocean',
    category: 'modern',
    premium: false,
    layout: 'sidebar-left',
    colors: {
      primary: '#2563eb', accent: '#3b82f6', heading: '#1e3a5f', body: '#555', muted: '#888',
      sidebarBg: '#1e3a5f', sidebarText: '#e0e7ef', sidebarAccent: '#60a5fa',
      border: '#e5e7eb', skillBg: '#dbeafe', skillText: '#2563eb',
    },
    style: { sectionDivider: 'none', headingStyle: 'uppercase', nameSize: 'xl', density: 'normal' },
  },
  {
    id: 'modern-teal',
    name: 'Teal Wave',
    category: 'modern',
    premium: true,
    layout: 'sidebar-left',
    colors: {
      primary: '#0d9488', accent: '#14b8a6', heading: '#134e4a', body: '#555', muted: '#888',
      sidebarBg: '#134e4a', sidebarText: '#ccfbf1', sidebarAccent: '#5eead4',
      border: '#e5e7eb', skillBg: '#ccfbf1', skillText: '#0d9488',
    },
    style: { sectionDivider: 'none', headingStyle: 'uppercase', nameSize: 'xl', density: 'normal' },
  },
  {
    id: 'modern-coral',
    name: 'Coral',
    category: 'modern',
    premium: true,
    layout: 'sidebar-left',
    colors: {
      primary: '#e11d48', accent: '#fb7185', heading: '#881337', body: '#555', muted: '#888',
      sidebarBg: '#881337', sidebarText: '#ffe4e6', sidebarAccent: '#fda4af',
      border: '#e5e7eb', skillBg: '#ffe4e6', skillText: '#e11d48',
    },
    style: { sectionDivider: 'none', headingStyle: 'uppercase', nameSize: 'xl', density: 'normal' },
  },
  {
    id: 'modern-violet',
    name: 'Violet',
    category: 'modern',
    premium: true,
    layout: 'sidebar-left',
    colors: {
      primary: '#7c3aed', accent: '#a78bfa', heading: '#4c1d95', body: '#555', muted: '#888',
      sidebarBg: '#4c1d95', sidebarText: '#ede9fe', sidebarAccent: '#c4b5fd',
      border: '#e5e7eb', skillBg: '#ede9fe', skillText: '#7c3aed',
    },
    style: { sectionDivider: 'none', headingStyle: 'uppercase', nameSize: 'xl', density: 'normal' },
  },
  {
    id: 'modern-green',
    name: 'Forest',
    category: 'modern',
    premium: true,
    layout: 'sidebar-left',
    colors: {
      primary: '#16a34a', accent: '#4ade80', heading: '#14532d', body: '#555', muted: '#888',
      sidebarBg: '#14532d', sidebarText: '#dcfce7', sidebarAccent: '#86efac',
      border: '#e5e7eb', skillBg: '#dcfce7', skillText: '#16a34a',
    },
    style: { sectionDivider: 'none', headingStyle: 'uppercase', nameSize: 'xl', density: 'normal' },
  },

  // ── Creative (5) ──
  {
    id: 'creative-sidebar',
    name: 'Side Panel',
    category: 'creative',
    premium: true,
    layout: 'sidebar-right',
    colors: {
      primary: '#f59e0b', accent: '#fbbf24', heading: '#78350f', body: '#555', muted: '#888',
      sidebarBg: '#fef3c7', sidebarText: '#78350f', sidebarAccent: '#f59e0b',
      border: '#fde68a', skillBg: '#fef9c3', skillText: '#92400e',
    },
    style: { sectionDivider: 'dotted', headingStyle: 'normal', nameSize: '2xl', density: 'normal' },
  },
  {
    id: 'creative-bold',
    name: 'Bold',
    category: 'creative',
    premium: true,
    layout: 'top-header',
    colors: {
      primary: '#dc2626', accent: '#ef4444', heading: '#dc2626', body: '#333', muted: '#888',
      headerBg: '#dc2626', headerText: '#fff',
      border: '#fecaca', skillBg: '#fef2f2', skillText: '#dc2626',
    },
    style: { sectionDivider: 'thick-line', headingStyle: 'uppercase', nameSize: '2xl', density: 'normal' },
  },
  {
    id: 'creative-accent',
    name: 'Accent Strip',
    category: 'creative',
    premium: true,
    layout: 'single-column',
    colors: {
      primary: '#8b5cf6', accent: '#a78bfa', heading: '#6d28d9', body: '#444', muted: '#888',
      border: '#ddd6fe', skillBg: '#ede9fe', skillText: '#7c3aed',
    },
    style: { sectionDivider: 'line', headingStyle: 'normal', nameSize: '2xl', density: 'relaxed' },
  },
  {
    id: 'creative-split',
    name: 'Split',
    category: 'creative',
    premium: true,
    layout: 'sidebar-left',
    colors: {
      primary: '#0ea5e9', accent: '#38bdf8', heading: '#0c4a6e', body: '#555', muted: '#888',
      sidebarBg: '#0c4a6e', sidebarText: '#e0f2fe', sidebarAccent: '#7dd3fc',
      border: '#e0f2fe', skillBg: '#e0f2fe', skillText: '#0284c7',
    },
    style: { sectionDivider: 'none', headingStyle: 'bold-caps', nameSize: '2xl', density: 'normal' },
  },
  {
    id: 'creative-dark',
    name: 'Dark Mode',
    category: 'creative',
    premium: true,
    layout: 'single-column',
    colors: {
      primary: '#e2e8f0', accent: '#94a3b8', heading: '#f8fafc', body: '#cbd5e1', muted: '#64748b',
      border: '#334155', skillBg: '#334155', skillText: '#e2e8f0',
    },
    style: { sectionDivider: 'line', headingStyle: 'uppercase', nameSize: '2xl', density: 'normal' },
  },

  // ── Professional (5) ──
  {
    id: 'pro-executive',
    name: 'Executive',
    category: 'professional',
    premium: false,
    layout: 'top-header',
    colors: {
      primary: '#1e3a5f', accent: '#2563eb', heading: '#1e3a5f', body: '#555', muted: '#999',
      headerBg: '#1e3a5f', headerText: '#fff',
      border: '#e5e7eb', skillBg: '#eff6ff', skillText: '#2563eb',
    },
    style: { sectionDivider: 'line', headingStyle: 'uppercase', nameSize: '2xl', density: 'normal' },
  },
  {
    id: 'pro-corporate',
    name: 'Corporate',
    category: 'professional',
    premium: true,
    layout: 'top-header',
    colors: {
      primary: '#1f2937', accent: '#374151', heading: '#111827', body: '#4b5563', muted: '#9ca3af',
      headerBg: '#111827', headerText: '#f9fafb',
      border: '#d1d5db', skillBg: '#f3f4f6', skillText: '#374151',
    },
    style: { sectionDivider: 'line', headingStyle: 'uppercase', nameSize: 'xl', density: 'normal' },
  },
  {
    id: 'pro-traditional',
    name: 'Traditional',
    category: 'professional',
    premium: true,
    layout: 'single-column',
    colors: {
      primary: '#1e293b', accent: '#475569', heading: '#0f172a', body: '#334155', muted: '#94a3b8',
      border: '#cbd5e1', skillBg: '#f8fafc', skillText: '#334155',
    },
    style: { sectionDivider: 'thick-line', headingStyle: 'bold-caps', nameSize: '2xl', density: 'relaxed' },
  },
  {
    id: 'pro-formal',
    name: 'Formal',
    category: 'professional',
    premium: true,
    layout: 'single-column',
    colors: {
      primary: '#44403c', accent: '#78716c', heading: '#292524', body: '#57534e', muted: '#a8a29e',
      border: '#d6d3d1', skillBg: '#fafaf9', skillText: '#57534e',
    },
    style: { sectionDivider: 'line', headingStyle: 'uppercase', nameSize: 'xl', density: 'normal' },
  },
  {
    id: 'pro-banking',
    name: 'Finance',
    category: 'professional',
    premium: true,
    layout: 'top-header',
    colors: {
      primary: '#1e3a5f', accent: '#1e40af', heading: '#172554', body: '#334155', muted: '#94a3b8',
      headerBg: '#172554', headerText: '#dbeafe',
      border: '#bfdbfe', skillBg: '#dbeafe', skillText: '#1e40af',
    },
    style: { sectionDivider: 'line', headingStyle: 'uppercase', nameSize: 'xl', density: 'compact' },
  },

  // ── Compact (5) ──
  {
    id: 'compact-dense',
    name: 'Dense',
    category: 'compact',
    premium: true,
    layout: 'single-column',
    colors: {
      primary: '#333', accent: '#555', heading: '#111', body: '#444', muted: '#999',
      border: '#ddd', skillBg: '#f5f5f5', skillText: '#555',
    },
    style: { sectionDivider: 'line', headingStyle: 'uppercase', nameSize: 'lg', density: 'compact' },
  },
  {
    id: 'compact-two-col',
    name: 'Two Column',
    category: 'compact',
    premium: true,
    layout: 'sidebar-left',
    colors: {
      primary: '#374151', accent: '#6b7280', heading: '#111827', body: '#4b5563', muted: '#9ca3af',
      sidebarBg: '#f9fafb', sidebarText: '#111827', sidebarAccent: '#374151',
      border: '#e5e7eb', skillBg: '#f3f4f6', skillText: '#374151',
    },
    style: { sectionDivider: 'none', headingStyle: 'uppercase', nameSize: 'lg', density: 'compact' },
  },
  {
    id: 'compact-tight',
    name: 'Tight',
    category: 'compact',
    premium: false,
    layout: 'single-column',
    colors: {
      primary: '#1f2937', accent: '#4b5563', heading: '#111827', body: '#374151', muted: '#6b7280',
      border: '#d1d5db', skillBg: '#e5e7eb', skillText: '#374151',
    },
    style: { sectionDivider: 'dotted', headingStyle: 'bold-caps', nameSize: 'lg', density: 'compact' },
  },
  {
    id: 'compact-mini',
    name: 'Mini',
    category: 'compact',
    premium: true,
    layout: 'single-column',
    colors: {
      primary: '#0f172a', accent: '#334155', heading: '#0f172a', body: '#475569', muted: '#94a3b8',
      border: '#e2e8f0', skillBg: '#f1f5f9', skillText: '#334155',
    },
    style: { sectionDivider: 'none', headingStyle: 'uppercase', nameSize: 'lg', density: 'compact' },
  },
  {
    id: 'compact-brief',
    name: 'Brief',
    category: 'compact',
    premium: true,
    layout: 'sidebar-right',
    colors: {
      primary: '#065f46', accent: '#059669', heading: '#064e3b', body: '#555', muted: '#888',
      sidebarBg: '#ecfdf5', sidebarText: '#064e3b', sidebarAccent: '#059669',
      border: '#a7f3d0', skillBg: '#d1fae5', skillText: '#065f46',
    },
    style: { sectionDivider: 'none', headingStyle: 'uppercase', nameSize: 'lg', density: 'compact' },
  },
];

export function getTemplate(id: string): TemplateConfig {
  return templates.find((t) => t.id === id) || templates[0];
}

export function getFreeTemplates(): TemplateConfig[] {
  return templates.filter((t) => !t.premium);
}
