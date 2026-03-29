import { ResumeData } from '@/types/resume';

export interface ExampleResume {
  id: string;
  title: string;
  description: string;
  data: ResumeData;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const jobTitleSuggestions = [
  'Software Engineer', 'Frontend Developer', 'Full Stack Developer', 'Backend Developer',
  'Product Manager', 'UX Designer', 'UI Designer', 'Data Analyst', 'Data Scientist',
  'DevOps Engineer', 'Project Manager', 'Marketing Manager', 'Sales Representative',
  'Business Analyst', 'Quality Assurance Engineer', 'Mobile Developer', 'Cloud Engineer',
  'Systems Administrator', 'Content Writer', 'Graphic Designer',
];

export const skillSuggestions: Record<string, string[]> = {
  'Software Engineer': ['JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'Git', 'SQL', 'Docker', 'AWS', 'REST APIs'],
  'Frontend Developer': ['React', 'TypeScript', 'CSS', 'Tailwind CSS', 'Next.js', 'HTML', 'JavaScript', 'Figma', 'Git', 'Responsive Design'],
  'Full Stack Developer': ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Git', 'REST APIs', 'GraphQL'],
  'Backend Developer': ['Python', 'Java', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'REST APIs', 'Microservices'],
  'Product Manager': ['Product Strategy', 'Agile/Scrum', 'User Research', 'Data Analysis', 'Roadmapping', 'Jira', 'Stakeholder Management', 'A/B Testing'],
  'UX Designer': ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Design Systems', 'Sketch', 'Information Architecture'],
  'Data Analyst': ['SQL', 'Python', 'Excel', 'Tableau', 'Power BI', 'Statistics', 'Data Visualization', 'ETL', 'R', 'Data Modeling'],
  'Data Scientist': ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Pandas', 'Statistics', 'Deep Learning', 'NLP', 'Scikit-learn', 'R'],
  'DevOps Engineer': ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Linux', 'Jenkins', 'Python', 'Monitoring', 'Bash'],
  'Marketing Manager': ['SEO', 'Google Analytics', 'Content Strategy', 'Social Media', 'Email Marketing', 'Paid Ads', 'Copywriting', 'CRM', 'A/B Testing'],
  default: ['Communication', 'Problem Solving', 'Team Leadership', 'Time Management', 'Critical Thinking', 'Adaptability'],
};

export const experienceDescriptions: Record<string, string[]> = {
  'Software Engineer': [
    'Developed and maintained web applications serving 100K+ daily active users using React and Node.js',
    'Improved API response times by 40% through query optimization and caching strategies',
    'Led migration of legacy monolith to microservices architecture, reducing deployment time by 60%',
    'Implemented CI/CD pipelines and automated testing, achieving 95% code coverage',
  ],
  'Frontend Developer': [
    'Built responsive, accessible web interfaces using React, TypeScript, and Tailwind CSS',
    'Reduced page load time by 50% through code splitting and lazy loading optimizations',
    'Created and maintained a component library used across 5 product teams',
    'Collaborated with designers to implement pixel-perfect UI from Figma mockups',
  ],
  'Product Manager': [
    'Led cross-functional team of 8 to launch new product feature, increasing user engagement by 35%',
    'Conducted user research interviews with 50+ customers to identify pain points and prioritize roadmap',
    'Defined product strategy and KPIs, resulting in 25% revenue growth quarter-over-quarter',
    'Managed backlog of 200+ items and facilitated sprint planning and retrospectives',
  ],
  default: [
    'Collaborated with cross-functional teams to deliver projects on time and within budget',
    'Identified and implemented process improvements, increasing team efficiency by 20%',
    'Mentored junior team members and conducted code/work reviews',
    'Presented progress reports and strategic recommendations to stakeholders',
  ],
};

export const summaryExamples: Record<string, string> = {
  'Software Engineer': 'Results-driven software engineer with 5+ years of experience building scalable web applications. Proficient in modern JavaScript frameworks and cloud technologies. Passionate about writing clean, maintainable code and delivering exceptional user experiences.',
  'Frontend Developer': 'Creative frontend developer with a keen eye for design and 4+ years of experience crafting responsive web applications. Expert in React ecosystem with a strong focus on performance optimization and accessibility.',
  'Product Manager': 'Strategic product manager with 6+ years of experience driving product development from conception to launch. Skilled in translating user needs into actionable product requirements and aligning cross-functional teams around shared goals.',
  'Data Analyst': 'Detail-oriented data analyst with 3+ years of experience turning complex datasets into actionable business insights. Proficient in SQL, Python, and data visualization tools. Strong communicator who bridges the gap between data and business decisions.',
  default: 'Dedicated professional with a proven track record of delivering results in fast-paced environments. Strong communicator and collaborative team player committed to continuous improvement and professional growth.',
};

export const exampleResumes: ExampleResume[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Full-stack developer resume',
    data: {
      personalInfo: {
        fullName: 'Alex Johnson',
        jobTitle: 'Senior Software Engineer',
        email: 'alex.johnson@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        website: 'alexjohnson.dev',
      },
      summary: summaryExamples['Software Engineer'],
      experience: [
        {
          id: generateId(),
          company: 'TechCorp Inc.',
          position: 'Senior Software Engineer',
          startDate: 'Jan 2022',
          endDate: 'Present',
          description: 'Led development of customer-facing dashboard using React and Node.js. Improved system performance by 40% through database optimization and caching strategies.',
        },
        {
          id: generateId(),
          company: 'StartupXYZ',
          position: 'Software Engineer',
          startDate: 'Jun 2019',
          endDate: 'Dec 2021',
          description: 'Built RESTful APIs and microservices handling 10K+ requests per second. Implemented CI/CD pipeline reducing deployment time by 60%.',
        },
      ],
      education: [
        {
          id: generateId(),
          school: 'University of California, Berkeley',
          degree: 'B.S.',
          field: 'Computer Science',
          startDate: '2015',
          endDate: '2019',
        },
      ],
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'Git', 'REST APIs'],
    },
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Strategic PM resume',
    data: {
      personalInfo: {
        fullName: 'Sarah Chen',
        jobTitle: 'Senior Product Manager',
        email: 'sarah.chen@email.com',
        phone: '+1 (555) 987-6543',
        location: 'New York, NY',
        website: 'sarahchen.io',
      },
      summary: summaryExamples['Product Manager'],
      experience: [
        {
          id: generateId(),
          company: 'InnovateTech',
          position: 'Senior Product Manager',
          startDate: 'Mar 2021',
          endDate: 'Present',
          description: 'Led product strategy for B2B SaaS platform with $5M ARR. Launched 3 major features resulting in 45% increase in user retention.',
        },
        {
          id: generateId(),
          company: 'Digital Solutions Co.',
          position: 'Product Manager',
          startDate: 'Aug 2018',
          endDate: 'Feb 2021',
          description: 'Managed product roadmap and backlog for mobile app with 500K+ downloads. Conducted user research and A/B testing to optimize onboarding flow.',
        },
      ],
      education: [
        {
          id: generateId(),
          school: 'Stanford University',
          degree: 'MBA',
          field: 'Business Administration',
          startDate: '2016',
          endDate: '2018',
        },
      ],
      skills: ['Product Strategy', 'Agile/Scrum', 'User Research', 'Data Analysis', 'Roadmapping', 'A/B Testing', 'Jira', 'SQL'],
    },
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'Design-focused resume',
    data: {
      personalInfo: {
        fullName: 'Maria Garcia',
        jobTitle: 'UX/UI Designer',
        email: 'maria.garcia@email.com',
        phone: '+1 (555) 456-7890',
        location: 'Austin, TX',
        website: 'mariadesigns.co',
      },
      summary: 'Creative UX/UI designer with 5+ years of experience crafting intuitive digital products. Expert in user research, wireframing, and prototyping. Passionate about creating accessible, user-centered designs that drive business results.',
      experience: [
        {
          id: generateId(),
          company: 'DesignStudio',
          position: 'Senior UX Designer',
          startDate: 'Feb 2021',
          endDate: 'Present',
          description: 'Lead designer for enterprise SaaS product used by 200+ companies. Redesigned core workflow reducing task completion time by 35%.',
        },
        {
          id: generateId(),
          company: 'CreativeAgency',
          position: 'UI/UX Designer',
          startDate: 'May 2018',
          endDate: 'Jan 2021',
          description: 'Designed mobile and web interfaces for 15+ client projects. Built and maintained design system with 100+ reusable components.',
        },
      ],
      education: [
        {
          id: generateId(),
          school: 'Rhode Island School of Design',
          degree: 'BFA',
          field: 'Graphic Design',
          startDate: '2014',
          endDate: '2018',
        },
      ],
      skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing', 'HTML/CSS'],
    },
  },
];

export function getSuggestedSkills(jobTitle: string): string[] {
  const key = Object.keys(skillSuggestions).find(
    (k) => jobTitle.toLowerCase().includes(k.toLowerCase())
  );
  return skillSuggestions[key || 'default'] || skillSuggestions.default;
}

export function getSuggestedDescriptions(jobTitle: string): string[] {
  const key = Object.keys(experienceDescriptions).find(
    (k) => jobTitle.toLowerCase().includes(k.toLowerCase())
  );
  return experienceDescriptions[key || 'default'] || experienceDescriptions.default;
}

export function getSuggestedSummary(jobTitle: string): string {
  const key = Object.keys(summaryExamples).find(
    (k) => jobTitle.toLowerCase().includes(k.toLowerCase())
  );
  return summaryExamples[key || 'default'] || summaryExamples.default;
}
