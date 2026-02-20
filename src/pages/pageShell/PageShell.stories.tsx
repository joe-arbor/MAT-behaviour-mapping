import type { Meta, StoryObj } from '@storybook/react';
import { PageShell } from './PageShell';

const meta: Meta<typeof PageShell> = {
  title: 'Pages/PageShell',
  component: PageShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Shell layout for showcasing components in a Storybook-like format. Sidebar lists sections; main area renders the selected section. Add components by editing `showcaseSections.tsx`.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/** Default shell with the built-in showcase sections (Welcome + placeholders). */
export const Default: Story = {
  args: {},
};

/** Shell with a custom default section selected. */
export const DefaultSectionSelected: Story = {
  args: {
    defaultSectionId: 'placeholder-button',
  },
};
