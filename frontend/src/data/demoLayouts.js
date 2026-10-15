// demoLayouts is now derived from templateLayouts — single source of truth.
// The TemplatePreview/demo page reads components from here which always
// match exactly what the editor will load when the user clicks "Use Template".
import { templateLayouts } from './templateLayouts';

export const demoLayouts = Object.fromEntries(
  Object.entries(templateLayouts).map(([id, tpl]) => [
    id,
    {
      theme: tpl.theme,
      components: tpl.components
    }
  ])
);
