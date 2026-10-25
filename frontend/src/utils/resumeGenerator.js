import API from '../services/api';

/**
 * Extracts structured ATS-friendly resume data from a portfolio layout.
 */
export function extractResumeData(layout) {
  if (!layout) return null;

  const comps = layout.components || [];
  const hero = comps.find((c) => c.type === 'HeroBanner')?.props || {};
  const about = comps.find((c) => c.type === 'AboutMe')?.props || {};
  const timeline = comps.find((c) => c.type === 'ExperienceTimeline')?.props || {};
  const skillsComp = comps.find((c) => c.type === 'SkillsCloud')?.props || {};
  const projectsComp = comps.find((c) => c.type === 'ProjectsGrid')?.props || {};
  const contact = comps.find((c) => c.type === 'ContactSection')?.props || {};
  const user = layout.userId || {};

  // Extract name
  const rawHeadline = hero.headline || '';
  const cleanName = rawHeadline.replace(/^Hi,\s*I'm\s*/i, '').trim() || user.fullName || user.username || 'Creator Portfolio';

  // Extract skills (from SkillsCloud, AboutMe, or defaults)
  let skillsList = [];
  if (Array.isArray(skillsComp.skills) && skillsComp.skills.length > 0) {
    skillsList = skillsComp.skills.map(s => typeof s === 'string' ? s : s.name);
  } else if (Array.isArray(about.skills) && about.skills.length > 0) {
    skillsList = about.skills.map(s => typeof s === 'string' ? s : s.name);
  }

  // Extract experiences
  const experiences = Array.isArray(timeline.items) ? timeline.items : [];

  // Extract projects
  const projects = Array.isArray(projectsComp.items) ? projectsComp.items : [];

  return {
    name: cleanName,
    title: hero.subheadline || user.headline || 'Full Stack Engineer & Product Builder',
    email: contact.email || user.email || '',
    phone: contact.phone || '',
    location: contact.location || user.location || 'Remote / Worldwide',
    portfolioUrl: `${window.location.origin}/p/${layout.handle || ''}`,
    github: user.github ? (user.github.startsWith('http') ? user.github : `https://github.com/${user.github}`) : (hero.githubUrl || ''),
    linkedin: user.linkedin ? (user.linkedin.startsWith('http') ? user.linkedin : `https://linkedin.com/in/${user.linkedin}`) : (hero.linkedinUrl || ''),
    summary: about.bio || hero.subheadline || '',
    skills: skillsList,
    experiences,
    projects
  };
}

/**
 * Generates and triggers clean, ATS-compliant printable PDF view.
 */
export async function downloadAtsResume(layout) {
  if (!layout) return;

  // Track download event for Creator Analytics in background
  if (layout.handle) {
    try {
      API.post(`/layouts/track-download/${layout.handle}`).catch(() => {});
    } catch (_) {}
  }

  const data = extractResumeData(layout);
  if (!data) return;

  const contactLinks = [
    data.email ? `<a href="mailto:${data.email}">${data.email}</a>` : '',
    data.phone ? `<span>${data.phone}</span>` : '',
    data.location ? `<span>${data.location}</span>` : '',
    data.portfolioUrl ? `<a href="${data.portfolioUrl}" target="_blank">Portfolio</a>` : '',
    data.linkedin ? `<a href="${data.linkedin}" target="_blank">LinkedIn</a>` : '',
    data.github ? `<a href="${data.github}" target="_blank">GitHub</a>` : ''
  ].filter(Boolean).join(' &bull; ');

  const skillsHtml = data.skills.length > 0
    ? `
      <section class="resume-section">
        <h2 class="section-title">CORE SKILLS & TECHNOLOGIES</h2>
        <p class="skills-line">${data.skills.join(' &bull; ')}</p>
      </section>
    `
    : '';

  const experienceHtml = data.experiences.length > 0
    ? `
      <section class="resume-section">
        <h2 class="section-title">PROFESSIONAL EXPERIENCE</h2>
        ${data.experiences.map(exp => `
          <div class="entry">
            <div class="entry-header">
              <span class="entry-title">${exp.role || 'Role'}</span>
              <span class="entry-date">${exp.period || ''}</span>
            </div>
            <div class="entry-sub">${exp.company || ''} ${exp.location ? `&bull; ${exp.location}` : ''}</div>
            ${exp.description ? `<p class="entry-desc">${exp.description}</p>` : ''}
          </div>
        `).join('')}
      </section>
    `
    : '';

  const projectsHtml = data.projects.length > 0
    ? `
      <section class="resume-section">
        <h2 class="section-title">FEATURED PROJECTS</h2>
        ${data.projects.map(p => `
          <div class="entry">
            <div class="entry-header">
              <span class="entry-title">${p.title || 'Project'}</span>
              ${p.tags && p.tags.length ? `<span class="entry-tags">[${Array.isArray(p.tags) ? p.tags.join(', ') : p.tags}]</span>` : ''}
            </div>
            ${p.description ? `<p class="entry-desc">${p.description}</p>` : ''}
          </div>
        `).join('')}
      </section>
    `
    : '';

  const printableHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${data.name} - Resume</title>
  <style>
    @page {
      margin: 18mm 16mm;
      size: A4 portrait;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      color: #111827;
      background: #ffffff;
      line-height: 1.45;
      font-size: 10.5pt;
      padding: 24px 30px;
      max-width: 800px;
      margin: 0 auto;
    }
    header {
      text-align: center;
      border-bottom: 2px solid #111827;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
    h1 {
      font-size: 22pt;
      font-weight: 800;
      letter-spacing: -0.5px;
      text-transform: uppercase;
      color: #111827;
      margin-bottom: 4px;
    }
    .headline {
      font-size: 11.5pt;
      font-weight: 600;
      color: #374151;
      margin-bottom: 6px;
    }
    .contact-row {
      font-size: 9pt;
      color: #4b5563;
    }
    .contact-row a {
      color: #1d4ed8;
      text-decoration: none;
    }
    .resume-section {
      margin-bottom: 14px;
    }
    .section-title {
      font-size: 11pt;
      font-weight: 700;
      color: #111827;
      border-bottom: 1px solid #d1d5db;
      padding-bottom: 3px;
      margin-bottom: 8px;
      letter-spacing: 0.5px;
    }
    .summary-text {
      font-size: 10pt;
      color: #374151;
      line-height: 1.5;
    }
    .skills-line {
      font-size: 9.5pt;
      color: #374151;
      line-height: 1.6;
    }
    .entry {
      margin-bottom: 10px;
      page-break-inside: avoid;
    }
    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .entry-title {
      font-weight: 700;
      font-size: 10pt;
      color: #111827;
    }
    .entry-date {
      font-size: 9pt;
      color: #6b7280;
      font-style: italic;
    }
    .entry-sub {
      font-size: 9pt;
      font-weight: 600;
      color: #4b5563;
      margin-bottom: 3px;
    }
    .entry-tags {
      font-size: 8.5pt;
      color: #6b7280;
    }
    .entry-desc {
      font-size: 9.5pt;
      color: #374151;
      line-height: 1.45;
    }
    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>${data.name}</h1>
    <div class="headline">${data.title}</div>
    <div class="contact-row">${contactLinks}</div>
  </header>

  ${data.summary ? `
    <section class="resume-section">
      <h2 class="section-title">PROFESSIONAL SUMMARY</h2>
      <p class="summary-text">${data.summary}</p>
    </section>
  ` : ''}

  ${skillsHtml}
  ${experienceHtml}
  ${projectsHtml}

  <script>
    window.addEventListener('load', () => {
      setTimeout(() => {
        window.print();
      }, 250);
    });
  </script>
</body>
</html>
  `.trim();

  // Open printable window
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(printableHtml);
    printWindow.document.close();
  }
}
