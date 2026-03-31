import { ResumeData, Experience, Education } from '@/types/resume';

const generateId = () => Math.random().toString(36).substring(2, 9);

// ── Role-based summaries ──────────────────────────────────────────────────────
const SUMMARIES: Record<string, string> = {
  'frontend developer': 'Creative frontend developer with a strong eye for design and {years}+ years of experience building responsive, accessible web applications. Proficient in modern JavaScript frameworks with a focus on performance optimization and exceptional user experiences.',
  'backend developer': 'Results-driven backend developer with {years}+ years of experience designing scalable server-side systems. Expert in RESTful API development, database architecture, and cloud infrastructure. Passionate about building robust, high-performance services.',
  'full stack developer': 'Full-stack developer with {years}+ years of experience across the entire software development lifecycle. Comfortable working from database schemas to pixel-perfect UIs, leveraging modern frameworks to ship reliable, user-centric products.',
  'software engineer': 'Innovative software engineer with {years}+ years of experience delivering high-impact solutions. Skilled in system design, agile methodologies, and cross-functional collaboration. Committed to clean code and continuous improvement.',
  'ux designer': 'User-centred UX/UI designer with {years}+ years crafting intuitive digital products. Expert in user research, prototyping, and design systems. Passionate about transforming complex workflows into delightful, accessible experiences.',
  'ui designer': 'Detail-obsessed UI designer with {years}+ years creating visually compelling interfaces. Proficient in Figma, design tokens, and component-driven workflows. Bridges the gap between aesthetics and usability.',
  'data scientist': 'Analytical data scientist with {years}+ years transforming raw data into strategic insights. Skilled in machine learning, statistical modelling, and data visualisation. Translates complex findings into clear business recommendations.',
  'data analyst': 'Detail-oriented data analyst with {years}+ years turning complex datasets into actionable intelligence. Proficient in SQL, Python, and BI tools. Bridges the gap between data and business decision-making.',
  'devops engineer': 'Experienced DevOps engineer with {years}+ years building resilient CI/CD pipelines and cloud infrastructure. Expert in containerisation, infrastructure-as-code, and site reliability engineering. Drives developer productivity and system stability.',
  'product manager': 'Strategic product manager with {years}+ years leading cross-functional teams from ideation to launch. Skilled at translating customer insights into actionable roadmaps. Consistently delivers products that drive measurable business growth.',
  'mobile developer': 'Versatile mobile developer with {years}+ years building high-quality iOS and Android applications. Proficient in React Native and native development practices. Focused on performance, smooth animations, and great user experiences.',
  'cloud engineer': 'Cloud engineer with {years}+ years architecting scalable, fault-tolerant solutions on AWS, Azure, and GCP. Expert in serverless computing, microservices, and cloud cost optimisation.',
  'cybersecurity engineer': 'Dedicated cybersecurity engineer with {years}+ years protecting digital assets and infrastructure. Skilled in threat modelling, penetration testing, and security audits. Proactive in designing secure systems from the ground up.',
  'graphic designer': 'Imaginative graphic designer with {years}+ years crafting compelling visual identities and marketing materials. Proficient in the Adobe Creative Suite. Blends aesthetics with strategy to communicate brand stories effectively.',
  'marketing manager': 'Results-driven marketing manager with {years}+ years developing and executing data-backed campaigns. Skilled in SEO, paid media, and content strategy. Consistently delivers growth in brand awareness and pipeline.',
  'project manager': 'Organised project manager with {years}+ years successfully delivering complex initiatives on time and within budget. PMP-certified with expertise in Agile and Waterfall methodologies. Skilled at stakeholder management and risk mitigation.',
  'student': 'Motivated and enthusiastic student with a strong academic foundation and a passion for learning. Eager to apply theoretical knowledge in real-world settings. Quick learner with excellent communication and teamwork skills.',
  'default': 'Dedicated professional with {years}+ years of experience delivering results in fast-paced environments. Strong communicator and collaborative team player committed to continuous improvement and professional growth.',
};

// ── Role-based skills ─────────────────────────────────────────────────────────
const SKILLS: Record<string, string[]> = {
  'frontend developer': ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Next.js', 'HTML5', 'CSS3', 'Figma', 'Git', 'Responsive Design', 'Accessibility'],
  'backend developer': ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'REST APIs', 'GraphQL', 'AWS', 'Kubernetes', 'Microservices', 'Prisma'],
  'full stack developer': ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Git', 'REST APIs', 'GraphQL', 'CI/CD'],
  'software engineer': ['JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'SQL', 'Docker', 'AWS', 'Git', 'System Design', 'Agile'],
  'ux designer': ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing', 'Adobe XD', 'Information Architecture', 'A/B Testing'],
  'ui designer': ['Figma', 'Sketch', 'Adobe Illustrator', 'Typography', 'Colour Theory', 'Design Tokens', 'Component Libraries', 'Motion Design', 'HTML/CSS'],
  'data scientist': ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'NumPy', 'SQL', 'Deep Learning', 'NLP', 'Scikit-learn', 'Statistics', 'R'],
  'data analyst': ['SQL', 'Python', 'Excel', 'Tableau', 'Power BI', 'Data Visualisation', 'Statistics', 'ETL', 'R', 'Google Analytics', 'Looker'],
  'devops engineer': ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Linux', 'Jenkins', 'Ansible', 'Monitoring', 'Bash', 'Python'],
  'product manager': ['Product Strategy', 'Agile/Scrum', 'User Research', 'Data Analysis', 'Roadmapping', 'Jira', 'Stakeholder Management', 'A/B Testing', 'OKRs'],
  'mobile developer': ['React Native', 'Swift', 'Kotlin', 'iOS', 'Android', 'Expo', 'Redux', 'TypeScript', 'APIs', 'App Store Deployment'],
  'cloud engineer': ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'Docker', 'Serverless', 'IAM', 'VPC', 'Lambda', 'CloudFormation'],
  'cybersecurity engineer': ['Penetration Testing', 'SIEM', 'Network Security', 'AWS Security', 'ISO 27001', 'Threat Modelling', 'Python', 'Linux', 'Wireshark'],
  'graphic designer': ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Figma', 'Typography', 'Branding', 'Print Design', 'Motion Graphics', 'Colour Theory'],
  'marketing manager': ['SEO/SEM', 'Google Analytics', 'Content Strategy', 'Social Media', 'Email Marketing', 'HubSpot', 'Paid Ads', 'CRM', 'Copywriting', 'A/B Testing'],
  'project manager': ['Agile/Scrum', 'Risk Management', 'Jira', 'Confluence', 'Stakeholder Management', 'Budgeting', 'MS Project', 'PMP', 'Kanban'],
  'student': ['Microsoft Office', 'Research', 'Critical Thinking', 'Team Collaboration', 'Presentation', 'Python (basics)', 'Time Management', 'Communication'],
  'default': ['Communication', 'Problem Solving', 'Team Leadership', 'Time Management', 'Critical Thinking', 'Adaptability', 'Project Planning', 'Microsoft Office'],
};

// ── Role-based experience entries ─────────────────────────────────────────────
const EXPERIENCE_TEMPLATES: Record<string, Array<{ company: string; position: string; description: string }>> = {
  'frontend developer': [
    { company: 'TechVision Inc.', position: 'Senior Frontend Developer', description: 'Built responsive, accessible web interfaces using React and TypeScript serving 200K+ daily users. Reduced page load time by 45% through code-splitting and lazy-loading optimisations.' },
    { company: 'Pixel & Code Studio', position: 'Frontend Developer', description: 'Developed and maintained a shared UI component library adopted by 6 cross-functional teams. Collaborated closely with designers to deliver pixel-perfect implementations from Figma mockups.' },
  ],
  'backend developer': [
    { company: 'CloudAxis Ltd.', position: 'Senior Backend Engineer', description: 'Designed and maintained RESTful microservices handling 50K+ requests per minute. Implemented Redis caching strategy that reduced database load by 60% and improved API response times by 40%.' },
    { company: 'DataBridge Solutions', position: 'Backend Developer', description: 'Built event-driven data pipelines processing 1M+ records daily using Node.js and Kafka. Maintained 99.9% uptime SLA through proactive monitoring and automated alerting.' },
  ],
  'full stack developer': [
    { company: 'NovaSoft Technologies', position: 'Full Stack Developer', description: 'Delivered end-to-end features across a SaaS platform used by 15,000 businesses. Contributed to both React frontend and Node.js/PostgreSQL backend, reducing release cycle time by 30%.' },
    { company: 'Digital Ventures Co.', position: 'Junior Full Stack Developer', description: 'Implemented user authentication flows, REST APIs, and reusable UI components. Improved test coverage from 40% to 87% using Jest and React Testing Library.' },
  ],
  'software engineer': [
    { company: 'TechCorp Inc.', position: 'Senior Software Engineer', description: 'Led development of a customer-facing analytics dashboard used by 500+ enterprise clients. Improved system performance by 40% through database query optimisation and intelligent caching.' },
    { company: 'StartupLabs', position: 'Software Engineer', description: 'Built RESTful APIs and microservices handling 10K requests per second. Implemented CI/CD pipeline that reduced deployment time from 2 hours to 12 minutes.' },
  ],
  'ux designer': [
    { company: 'DesignFirst Agency', position: 'Senior UX Designer', description: 'Led end-to-end UX design for an enterprise SaaS suite used by 200+ companies. Redesigned the core workflow reducing average task completion time by 35% based on usability testing.' },
    { company: 'Creative Digital Studio', position: 'UX/UI Designer', description: 'Designed mobile and web interfaces for 12+ client projects across e-commerce, fintech, and healthcare. Established and maintained a design system with 80+ reusable Figma components.' },
  ],
  'data scientist': [
    { company: 'Insight Analytics Corp.', position: 'Senior Data Scientist', description: 'Developed ML models for customer churn prediction with 91% accuracy, saving $2M annually. Built NLP pipeline to analyse 50K+ customer support tickets, reducing resolution time by 28%.' },
    { company: 'DataDriven Solutions', position: 'Data Scientist', description: 'Built recommendation engine that increased e-commerce conversion rates by 22%. Collaborated with engineering to deploy models to production via REST API using FastAPI and Docker.' },
  ],
  'data analyst': [
    { company: 'Metrix Analytics', position: 'Senior Data Analyst', description: 'Developed executive dashboards in Tableau that informed $10M+ strategic decisions quarterly. Automated weekly reporting pipelines using Python, saving 15+ hours of manual work per week.' },
    { company: 'GrowFast Startup', position: 'Data Analyst', description: 'Conducted cohort analysis and funnel optimisation that improved user retention by 18%. Built SQL queries and data models to support product and marketing decision-making.' },
  ],
  'devops engineer': [
    { company: 'InfraPro Solutions', position: 'Senior DevOps Engineer', description: 'Architected a Kubernetes-based infrastructure on AWS supporting 300+ microservices. Reduced deployment incidents by 70% by introducing GitOps workflows and automated canary releases.' },
    { company: 'CloudScale Ltd.', position: 'DevOps Engineer', description: 'Built and maintained CI/CD pipelines for 40+ repositories using GitHub Actions and ArgoCD. Achieved 99.95% platform uptime through proactive monitoring with Datadog and PagerDuty.' },
  ],
  'product manager': [
    { company: 'InnovateTech', position: 'Senior Product Manager', description: 'Led product strategy for a B2B SaaS platform with $8M ARR. Launched 4 major product features resulting in 45% increase in user retention and 25% growth in NPS.' },
    { company: 'Digital Solutions Co.', position: 'Product Manager', description: 'Managed product roadmap for a mobile app with 600K+ downloads. Conducted user research and A/B testing to optimise the onboarding flow, increasing Day-7 retention by 32%.' },
  ],
  'marketing manager': [
    { company: 'BrandGrowth Agency', position: 'Marketing Manager', description: 'Led a team of 6 to execute multi-channel campaigns generating 3x pipeline growth YoY. Managed $500K annual paid media budget across Google Ads, LinkedIn, and Meta with a 4.2x ROAS.' },
    { company: 'TechStartup HQ', position: 'Digital Marketing Specialist', description: 'Grew organic traffic by 180% in 12 months through SEO strategy and technical content. Built and optimised email nurture sequences achieving a 38% open rate.' },
  ],
  'student': [
    { company: 'Tech Innovators Club', position: 'Project Lead', description: 'Led a team of 5 students to build a community app for local residents, reaching 200+ downloads in the first month. Managed project planning, design sprints, and stakeholder presentations.' },
    { company: 'University Research Lab', position: 'Research Assistant', description: 'Assisted in conducting surveys, analysing data, and preparing literature reviews for published academic research. Developed strong skills in data collection, critical analysis, and scientific writing.' },
  ],
  'default': [
    { company: 'Innovate Corp.', position: 'Senior Specialist', description: 'Led cross-functional initiatives that improved operational efficiency by 25%. Collaborated with stakeholders to define KPIs and track progress against quarterly goals.' },
    { company: 'Global Solutions Ltd.', position: 'Specialist', description: 'Delivered high-impact projects on time and within budget, consistently exceeding team targets. Mentored junior colleagues and contributed to knowledge-sharing sessions and best practices documentation.' },
  ],
};

// ── Education templates ───────────────────────────────────────────────────────
const EDUCATION_TEMPLATES: Record<string, { school: string; degree: string; field: string }> = {
  'frontend developer': { school: 'University of Technology', degree: 'B.Sc.', field: 'Computer Science' },
  'backend developer': { school: 'State University of Engineering', degree: 'B.Eng.', field: 'Software Engineering' },
  'full stack developer': { school: 'Institute of Technology', degree: 'B.Sc.', field: 'Computer Science' },
  'software engineer': { school: 'University of California, Berkeley', degree: 'B.Sc.', field: 'Computer Science' },
  'ux designer': { school: 'Rhode Island School of Design', degree: 'B.F.A.', field: 'Interaction Design' },
  'ui designer': { school: 'Parsons School of Design', degree: 'B.F.A.', field: 'Communication Design' },
  'data scientist': { school: 'Massachusetts Institute of Technology', degree: 'M.Sc.', field: 'Data Science' },
  'data analyst': { school: 'London School of Economics', degree: 'B.Sc.', field: 'Statistics & Data Analysis' },
  'devops engineer': { school: 'University of Washington', degree: 'B.Sc.', field: 'Information Systems' },
  'product manager': { school: 'Stanford University', degree: 'M.B.A.', field: 'Business Administration' },
  'mobile developer': { school: 'Carnegie Mellon University', degree: 'B.Sc.', field: 'Computer Science' },
  'cloud engineer': { school: 'Georgia Institute of Technology', degree: 'B.Sc.', field: 'Computer Engineering' },
  'marketing manager': { school: 'University of Michigan', degree: 'B.B.A.', field: 'Marketing' },
  'project manager': { school: 'Cornell University', degree: 'B.Sc.', field: 'Business Management' },
  'student': { school: 'State University', degree: 'B.Sc.', field: 'Computer Science' },
  'default': { school: 'State University', degree: 'B.Sc.', field: 'Business Administration' },
};

// ── Fallback contact info ─────────────────────────────────────────────────────
const FALLBACK_EMAILS: Record<string, string> = {
  default: 'your.email@example.com',
};
const FALLBACK_PHONES = '+1 (555) 000-0000';
const FALLBACK_LOCATIONS: string[] = [
  'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Boston, MA', 'Chicago, IL',
];

function matchRole(jobTitle: string): string {
  const lower = jobTitle.toLowerCase();
  const keys = [
    'frontend developer', 'backend developer', 'full stack developer', 'software engineer',
    'ux designer', 'ui designer', 'data scientist', 'data analyst', 'devops engineer',
    'product manager', 'mobile developer', 'cloud engineer', 'cybersecurity engineer',
    'graphic designer', 'marketing manager', 'project manager', 'student',
  ];
  return keys.find((k) => lower.includes(k.split(' ')[0]) && lower.includes(k.split(' ').slice(-1)[0])) ||
    keys.find((k) => lower.includes(k.split(' ')[0])) || 'default';
}

function pickLocation(): string {
  return FALLBACK_LOCATIONS[Math.floor(Math.random() * FALLBACK_LOCATIONS.length)];
}

/**
 * Generate a complete ResumeData object from minimal inputs.
 * Any fields already provided by the user will be preserved.
 */
export function generateCVData(
  name: string,
  role: string,
  partialData?: Partial<ResumeData>,
): ResumeData {
  const roleKey = matchRole(role);
  const years = String(Math.floor(Math.random() * 4) + 3); // 3–6 years
  const firstName = name.split(' ')[0] || 'Your';
  const lastName = name.split(' ').slice(1).join(' ') || 'Name';
  const emailBase = `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(/\s/g, '')}`;

  // ── summary ──────────────────────────────────────────────────────────────
  const summaryTemplate = SUMMARIES[roleKey] ?? SUMMARIES.default;
  const summary = partialData?.summary || summaryTemplate.replace('{years}', years);

  // ── skills ───────────────────────────────────────────────────────────────
  const skills =
    partialData?.skills && partialData.skills.length > 0
      ? partialData.skills
      : (SKILLS[roleKey] ?? SKILLS.default).slice(0, 9);

  // ── experience ───────────────────────────────────────────────────────────
  const expTemplates = EXPERIENCE_TEMPLATES[roleKey] ?? EXPERIENCE_TEMPLATES.default;
  const experience: Experience[] =
    partialData?.experience && partialData.experience.length > 0
      ? partialData.experience
      : expTemplates.map((t, i) => ({
          id: generateId(),
          company: t.company,
          position: t.position,
          startDate: i === 0 ? 'Jan 2022' : 'Jun 2019',
          endDate: i === 0 ? 'Present' : 'Dec 2021',
          description: t.description,
        }));

  // ── education ────────────────────────────────────────────────────────────
  const eduTemplate = EDUCATION_TEMPLATES[roleKey] ?? EDUCATION_TEMPLATES.default;
  const education: Education[] =
    partialData?.education && partialData.education.length > 0
      ? partialData.education
      : [
          {
            id: generateId(),
            school: eduTemplate.school,
            degree: eduTemplate.degree,
            field: eduTemplate.field,
            startDate: '2015',
            endDate: '2019',
          },
        ];

  // ── personal info ─────────────────────────────────────────────────────────
  const existingInfo = partialData?.personalInfo;
  const personalInfo = {
    fullName: name || existingInfo?.fullName || 'Your Name',
    jobTitle: role || existingInfo?.jobTitle || 'Professional',
    email: existingInfo?.email || `${emailBase}@email.com`,
    phone: existingInfo?.phone || FALLBACK_PHONES,
    location: existingInfo?.location || pickLocation(),
    website: existingInfo?.website || `${firstName.toLowerCase()}${lastName.toLowerCase()}.dev`,
  };

  return { personalInfo, summary, experience, education, skills };
}

/**
 * "Improve with AI" mock — slightly rewrites a summary with added flair.
 */
export function improveWithAI(data: ResumeData): ResumeData {
  const openers = [
    'Dynamic and innovative',
    'Highly accomplished and results-oriented',
    'Visionary and execution-focused',
    'Seasoned and adaptable',
    'Passionate and detail-driven',
  ];
  const opener = openers[Math.floor(Math.random() * openers.length)];
  const existingSummary = data.summary || '';
  const improved = existingSummary
    ? `${opener} ${existingSummary.charAt(0).toLowerCase()}${existingSummary.slice(1)}`
    : existingSummary;

  return { ...data, summary: improved };
}

/**
 * Return a smart, completed version of the resume data —
 * so the CV never renders as empty even with zero input.
 */
export function getDisplayData(data: ResumeData): ResumeData {
  const hasName = !!data.personalInfo.fullName;
  const hasRole = !!data.personalInfo.jobTitle;

  // If user hasn't typed anything meaningful yet, show a placeholder example
  if (!hasName && !hasRole) {
    return generateCVData('Alex Johnson', 'Frontend Developer');
  }

  return generateCVData(
    data.personalInfo.fullName || 'Your Name',
    data.personalInfo.jobTitle || 'Professional',
    data,
  );
}
