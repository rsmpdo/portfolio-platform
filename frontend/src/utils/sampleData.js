export const SAMPLE_PORTFOLIO = {
  title: "Alex Morgan — Senior Product Designer & Creative Technologist",
  handle: "admin_1",
  theme: {
    primaryColor: "#6366f1",
    secondaryColor: "#a855f7"
  },
  components: [
    {
      id: "comp_hero",
      type: "HeroBanner",
      title: "Hero Section",
      order: 0,
      isVisible: true,
      props: {
        headline: "Crafting Digital Products People Love to Use",
        subheadline: "Senior Product Designer & Creative Technologist with 7+ years of experience transforming complex ideas into intuitive, award-winning experiences.",
        ctaText: "Explore Selected Work",
        ctaLink: "#projects",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        githubUrl: "https://github.com",
        linkedinUrl: "https://linkedin.com",
        twitterUrl: "https://twitter.com",
        availableForWork: true
      }
    },
    {
      id: "comp_about",
      type: "AboutMe",
      title: "About Me",
      order: 1,
      isVisible: true,
      props: {
        heading: "Obsessed with Details, Focused on Impact",
        bio: "Over the past 7 years, I've worked with Y-Combinator startups, fintech unicorns, and global agencies to design and ship products used by millions. I bridge the gap between design vision and technical execution.",
        skills: ["Product Design", "React & Next.js", "Design Systems", "UI/UX Research", "Figma", "Micro-Animations"],
        experienceYears: "7+",
        completedProjects: "50+",
        happyClients: "35+"
      }
    },
    {
      id: "comp_projects",
      type: "ProjectsGrid",
      title: "Selected Projects",
      order: 2,
      isVisible: true,
      props: {
        heading: "Featured Case Studies",
        subheading: "A look at recent products, platforms, and interactive experiences I've brought to life.",
        items: [
          {
            id: "p1",
            title: "Fintech Dashboard & Mobile App",
            description: "Redesigned the core wealth management platform for 200,000 active investors, increasing daily retention by 34%.",
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            tags: ["Product Design", "React", "Tailwind CSS"],
            githubUrl: "https://github.com",
            liveUrl: "https://example.com"
          },
          {
            id: "p2",
            title: "AI Canvas Creative Engine",
            description: "An intuitive web-based canvas interface allowing designers to generate and iterate on brand assets powered by AI.",
            imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
            tags: ["Full Stack", "TypeScript", "Node.js"],
            githubUrl: "https://github.com",
            liveUrl: "https://example.com"
          },
          {
            id: "p3",
            title: "E-Commerce Experience Design",
            description: "End-to-end UX architecture for luxury brand catalog, raising conversion rates by 42% on mobile.",
            imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
            tags: ["UI/UX", "Next.js", "GraphQL"],
            githubUrl: "https://github.com",
            liveUrl: "https://example.com"
          }
        ]
      }
    },
    {
      id: "comp_exp",
      type: "ExperienceTimeline",
      title: "Experience",
      order: 3,
      isVisible: true,
      props: {
        heading: "Where I've Made an Impact",
        subheading: "A track record of driving growth and shipping quality across engineering and design roles.",
        items: [
          {
            id: "e1",
            role: "Lead Product Designer",
            company: "Verve Digital Studio",
            period: "2022 — Present",
            description: "Directing product design strategy and component libraries across 12 product lines. Scaling team from 3 to 14 designers.",
            highlights: ["Design Systems", "Team Leadership", "Product Strategy"]
          },
          {
            id: "e2",
            role: "Senior UI/UX Engineer",
            company: "Starlight Labs",
            period: "2019 — 2022",
            description: "Built design system architecture adopted across web and mobile apps serving over 1.5 million monthly users.",
            highlights: ["React", "TypeScript", "Design Systems"]
          }
        ]
      }
    },
    {
      id: "comp_skills",
      type: "SkillsCloud",
      title: "Skills & Stack",
      order: 4,
      isVisible: true,
      props: {
        heading: "Tools & Core Expertise",
        subheading: "Technologies and methodologies I leverage daily.",
        categories: [
          {
            name: "Frontend",
            skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js"]
          },
          {
            name: "Backend",
            skills: ["Node.js", "Express", "REST APIs", "GraphQL", "MongoDB", "PostgreSQL"]
          },
          {
            name: "Design",
            skills: ["Figma", "UI/UX Research", "Design Systems", "Prototyping", "User Testing"]
          }
        ]
      }
    },
    {
      id: "comp_testimonials",
      type: "TestimonialsCarousel",
      title: "Testimonials",
      order: 5,
      isVisible: true,
      props: {
        heading: "Kind Words from Collaborators",
        items: [
          {
            id: "t1",
            quote: "Alex has a rare talent for balancing aesthetic brilliance with deep technical execution. Working together elevated our entire brand.",
            author: "Sarah Chen",
            role: "VP of Product, NexGen Technologies",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e2?w=100&h=100&fit=crop"
          },
          {
            id: "t2",
            quote: "The speed and quality of delivery were unmatched. The portfolio and product design directly helped us secure Series A funding.",
            author: "Marcus Reid",
            role: "Founder & CEO, Pulse AI",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
          }
        ]
      }
    },
    {
      id: "comp_contact",
      type: "ContactSection",
      title: "Contact Section",
      order: 6,
      isVisible: true,
      props: {
        heading: "Ready to Build Something Extraordinary?",
        subheading: "Whether you have a new product idea, redesign project, or consulting inquiry — let's connect.",
        email: "alex.morgan@example.com",
        location: "San Francisco, CA · Remote Worldwide",
        responseTime: "Responds within 24 hours"
      }
    }
  ]
};
