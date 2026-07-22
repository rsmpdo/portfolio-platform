import React from 'react';
import HeroBanner from './HeroBanner';
import AboutMe from './AboutMe';
import ProjectsGrid from './ProjectsGrid';
import ExperienceTimeline from './ExperienceTimeline';
import SkillsCloud from './SkillsCloud';
import ContactSection from './ContactSection';
import MediaGallery from './MediaGallery';

const COMPONENT_MAP = {
  HeroBanner,
  AboutMe,
  ProjectsGrid,
  ExperienceTimeline,
  SkillsCloud,
  ContactSection,
  MediaGallery
};

export default function ComponentRenderer({ component, isEditing = false, isSelected = false, onClick }) {
  if (!component || component.isVisible === false) return null;

  const ComponentClass = COMPONENT_MAP[component.type];

  if (!ComponentClass) {
    return (
      <div className="p-6 my-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-center">
        Unknown component type: {component.type}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative transition-all duration-200 ${
        isEditing
          ? `cursor-pointer rounded-2xl border-2 my-4 ${
              isSelected
                ? 'border-indigo-500 ring-4 ring-indigo-500/20 bg-indigo-950/10'
                : 'border-transparent hover:border-slate-700'
            }`
          : ''
      }`}
    >
      {isEditing && (
        <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-semibold text-indigo-400 backdrop-blur-md">
          {component.title || component.type}
        </div>
      )}
      <ComponentClass props={component.props} />
    </div>
  );
}
