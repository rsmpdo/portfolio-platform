import React from 'react';
import HeroBanner from './HeroBanner';
import AboutMe from './AboutMe';
import ProjectsGrid from './ProjectsGrid';
import ExperienceTimeline from './ExperienceTimeline';
import SkillsCloud from './SkillsCloud';
import ContactSection from './ContactSection';
import MediaGallery from './MediaGallery';
import TestimonialsCarousel from './TestimonialsCarousel';
import PremiumEmbed from './PremiumEmbed';

const COMPONENT_MAP = {
  HeroBanner,
  AboutMe,
  ProjectsGrid,
  ExperienceTimeline,
  SkillsCloud,
  ContactSection,
  MediaGallery,
  TestimonialsCarousel,
  PremiumEmbed
};

export default function ComponentRenderer({ component, isEditing = false, isSelected = false, onClick, templateId, viewportMode }) {
  if (!component || component.isVisible === false) return null;

  const ComponentClass = COMPONENT_MAP[component.type];

  if (!ComponentClass) {
    return (
      <div className="p-6 my-4 rounded-xl glass border border-white/[0.07] text-slate-500 text-center text-sm">
        Unknown component type: <code className="text-indigo-400">{component.type}</code>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative transition-all duration-200 ${
        isEditing
          ? `cursor-pointer rounded-2xl border-2 my-2 ${
              isSelected
                ? 'border-indigo-500 ring-4 ring-indigo-500/15 bg-indigo-950/5'
                : 'border-transparent hover:border-white/10'
            }`
          : ''
      }`}
    >
      {isEditing && (
        <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full glass border border-white/10 text-xs font-semibold text-indigo-400 backdrop-blur-md">
          {component.title || component.type}
        </div>
      )}
      <ComponentClass props={component.props} templateId={templateId} viewportMode={viewportMode} />
    </div>
  );
}
