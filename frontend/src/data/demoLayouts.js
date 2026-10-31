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
