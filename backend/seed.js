const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Layout = require('./models/Layout');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB Atlas for seeding...');

    // Clear existing sample user if any
    await User.deleteMany({ email: 'admin@portfolioplatform.dev' });
    await Layout.deleteMany({ handle: 'admin_1' });

    // Create sample admin user
    const adminUser = await User.create({
      username: 'admin_1',
      email: 'admin@portfolioplatform.dev',
      password: 'Password123!',
      role: 'admin',
      isVerified: true
    });

    console.log(`Created sample admin user: ${adminUser.username} (${adminUser.email})`);

    // Create rich showcase portfolio layout for admin_1
    const sampleLayout = await Layout.create({
      userId: adminUser._id,
      handle: 'admin_1',
      title: "Alex Morgan - Full Stack & Systems Engineer",
      seo: {
        metaTitle: "Alex Morgan | Full Stack & Systems Architect",
        metaDescription: "Explore Alex Morgan's developer portfolio featuring MERN apps, high-throughput microservices, and interactive UI systems.",
        ogImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
      },
      theme: {
        mode: 'dark',
        primaryColor: '#6366f1',
        secondaryColor: '#a855f7',
        backgroundColor: '#0f172a',
        textColor: '#f8fafc',
        fontFamily: 'Inter'
      },
      isPublished: true,
      components: [
        {
          id: 'hero-banner-main',
          type: 'HeroBanner',
          title: 'Main Hero Section',
          order: 0,
          isVisible: true,
          props: {
            headline: "Architecting Modern Web & Cloud Platforms",
            subheadline: "Full-stack software engineer specializing in scalable React interfaces, Node.js microservices, and cloud-native architecture.",
            ctaText: "Explore Projects",
            ctaLink: "#projects",
            avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
            githubUrl: "https://github.com/rsmpdo",
            linkedinUrl: "https://linkedin.com",
            twitterUrl: "https://twitter.com"
          }
        },
        {
          id: 'about-me-section',
          type: 'AboutMe',
          title: 'About Me & Core Bio',
          order: 1,
          isVisible: true,
          props: {
            heading: "Passionate About Code & Design System Architecture",
            bio: "With over 5 years of full-stack engineering experience, I specialize in constructing performant web platforms using MongoDB, Express, React, and Node.js. My focus is on writing clean, modular code paired with visually captivating user experiences.",
            skills: ["JavaScript (ES6+)", "TypeScript", "React", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Docker", "AWS"],
            experienceYears: "5+",
            completedProjects: "45+"
          }
        },
        {
          id: 'projects-showcase',
          type: 'ProjectsGrid',
          title: 'Featured Works & Repositories',
          order: 2,
          isVisible: true,
          props: {
            heading: "Featured Engineering Projects",
            subheading: "A selection of open source tools, full-stack applications, and scalable microservices.",
            items: [
              {
                id: 'p1',
                title: 'Portfolio Management Platform',
                description: 'Complete MERN stack CMS layout engine featuring schema-less MongoDB ODM documents, Passport JWT authentication, and Cloudinary CDN integration.',
                imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
                tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Tailwind CSS'],
                githubUrl: 'https://github.com/rsmpdo/portfolio-platform',
                liveUrl: 'https://github.com/rsmpdo/portfolio-platform'
              },
              {
                id: 'p2',
                title: 'Real-Time Telemetry & Analytics Dashboard',
                description: 'Distributed event processing dashboard built with WebSockets, Redux Toolkit, and Chart.js for real-time cluster monitoring.',
                imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
                tags: ['React', 'TypeScript', 'WebSockets', 'Chart.js'],
                githubUrl: 'https://github.com',
                liveUrl: 'https://example.com'
              }
            ]
          }
        },
        {
          id: 'skills-cloud-section',
          type: 'SkillsCloud',
          title: 'Technology Matrix',
          order: 3,
          isVisible: true,
          props: {
            heading: "Technical Skills & Competencies",
            categories: [
              {
                name: "Frontend Development",
                skills: ["React 18", "Vite", "Redux Toolkit", "Tailwind CSS", "Framer Motion", "HTML5 / CSS3"]
              },
              {
                name: "Backend & Cloud",
                skills: ["Node.js", "Express.js", "Passport.js", "JWT", "Cloudinary SDK", "RESTful APIs"]
              },
              {
                name: "Data & DevOps",
                skills: ["MongoDB Atlas", "Mongoose ODM", "Git / GitHub Actions", "Docker", "Nginx", "Cloudflare"]
              }
            ]
          }
        },
        {
          id: 'contact-section-main',
          type: 'ContactSection',
          title: 'Contact Form & Details',
          order: 4,
          isVisible: true,
          props: {
            heading: "Let's Connect & Collaborate",
            subheading: "Interested in working together or discussing software engineering roles? Send me a message!",
            email: "admin@portfolioplatform.dev",
            messagePlaceholder: "Hi Alex, I saw your portfolio and would love to connect..."
          }
        }
      ]
    });

    console.log(`Created sample portfolio layout: /p/${sampleLayout.handle}`);
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
