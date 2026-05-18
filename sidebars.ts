import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Projects',
      items: [
        {
          type: 'category',
          label: 'A.P.O.L.L.O Discord Bot',
          collapsible: true,
          collapsed: false,
          items: [
            'projects/apollo/intro',
            'projects/apollo/user-guide',
            'projects/apollo/developer-guide',
            'projects/apollo/command-reference',
            'projects/apollo/troubleshooting',
          ],
        },
        {
          type: 'category',
          label: 'Nikolai-Bot NRP',
          collapsible: true,
          collapsed: false,
          items: [
            'projects/nikolai-bot/intro',
            'projects/nikolai-bot/user-guide',
            'projects/nikolai-bot/developer-guide',
            'projects/nikolai-bot/command-reference',
            'projects/nikolai-bot/troubleshooting',
          ],
        },
        {
          type: 'category',
          label: 'Okhit Archive Bot',
          collapsible: true,
          collapsed: false,
          items: [
            'projects/okhit/intro',
            'projects/okhit/user-guide',
            'projects/okhit/developer-guide',
            'projects/okhit/command-reference',
            'projects/okhit/troubleshooting',
          ],
        },
        'projects/nova',
        'projects/starlight-nrp-bot',
      ],
    },
  ],
};

export default sidebars;
