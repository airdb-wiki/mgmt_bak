import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = {
  '/': [
    {
      text: 'Overall',
      children: [
        '/team/README.md',
        '/team/sig/README.md',
        '/team/sponsors/individual.md',
      ]
    },
  ],
  '/okr/': [
    {
      text: 'OKR 的背景',
      children: [
        '/okr/README.md',
        '/okr/2022.md',
        '/okr/2023.md',
      ],
    },
    {
      text: 'OKR 之剑',
      children: [
        '/okr/swordman/README.md',
      ],
    },
  ],
  '/weekly/': [
    {
      text: 'Overview',
      children: [
        '/weekly/README.md',
      ]
    },
    {
      text: '2023',
      children: [
        '/weekly/2023.md',
        '/weekly/2023-q1.md',
      ]
    },
    {
      text: '2022',
      collapsible: true,
      children: [
        '/weekly/2022.md',
        '/weekly/2022-q1.md',
        '/weekly/2022-q2.md',
        '/weekly/2022-q3.md',
        '/weekly/2022-q4.md',
      ]
    }
  ],
  '/team/': [
    {
      text: '文化',
      collapsible: true,
      children: [
        '/team/README.md',
        '/team/culture.md',
        '/team/feedback.md',
        '/team/join_us.md',
        '/team/meeting.md',
        '/team/rules.md',
        '/team/team_mgmt.md',
        '/team/idea.md',
        '/team/working_method.md',
      ],
    },
    {
      text: 'SIG',
      children: [
        '/team/sig/README.md',
      ]
    },
    {
      text: '捐赠',
      children: [
        '/team/sponsors/individual.md',
        '/team/sponsors/team.md',
      ],
    },
    {
      text: '社区贡献',
      children: [
        '/team/contribution/personal_project.md',
        '/team/contribution/team_project.md',
      ],
    },
  ],
  '/roles/': [
    {
      text: 'Roles',
      children: [
        '/roles/README.md',
        '/roles/dev_be.md',
        '/roles/dev_fe.md',
        '/roles/dev_data.md',
        '/roles/sre.md',
      ],
    },
  ]
}
