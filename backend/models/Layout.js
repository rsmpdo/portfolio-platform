const mongoose = require('mongoose');

const LayoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    handle: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    title: {
      type: String,
      default: 'My Portfolio'
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      ogImage: String
    },
    theme: {
      mode: { type: String, enum: ['dark', 'light', 'custom'], default: 'dark' },
      primaryColor: { type: String, default: '#6366f1' },
      secondaryColor: { type: String, default: '#a855f7' },
      backgroundColor: { type: String, default: '#0f172a' },
      textColor: { type: String, default: '#f8fafc' },
      fontFamily: { type: String, default: 'Inter' }
    },
    // Dynamic array of layout components (schema-less / mixed objects for full design flexibility)
    components: [
      {
        id: { type: String, required: true },
        type: {
          type: String,
          required: true,
          enum: [
            'HeroBanner',
            'AboutMe',
            'ProjectsGrid',
            'ExperienceTimeline',
            'SkillsCloud',
            'ContactSection',
            'MediaGallery',
            'TestimonialsCarousel',
            'CustomHTML'
          ]
        },
        title: String,
        order: { type: Number, default: 0 },
        isVisible: { type: Boolean, default: true },
        // Schema-less props object for component-specific configurations
        props: {
          type: mongoose.Schema.Types.Mixed,
          default: {}
        }
      }
    ],
    isPublished: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  {
    timestamps: true,
    strict: false // Allows dynamic top-level metadata if needed
  }
);

// Compound index for fast handle lookup and publishing filter
LayoutSchema.index({ handle: 1, isPublished: 1 });
LayoutSchema.index({ userId: 1, updatedAt: -1 });

module.exports = mongoose.model('Layout', LayoutSchema);
