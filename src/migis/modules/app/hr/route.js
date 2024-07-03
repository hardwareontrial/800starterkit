export default {
  path: 'hr',
  name: 'hr-view',
  component: () => import('@/migis/modules/app/hr/HRView.vue'),
  redirect: { name: 'hr-dashboard' },
  children: [
    {
      path: '/',
      name: 'hr-dashboard',
      component: () => import('@/migis/modules/app/hr/DashboardView.vue'),
      meta: {
        subject: 'ACL-HR',
        actions: 'read',
        redirectIfLoggedIn: false,
        tabTitle: 'HR',
        pageTitle: 'Human Resource',
        layout: '',
        breadcrumb: [
          { text: 'HR', active: true },
        ],
        backButton: true,
      },
    },
    {
      path: 'organization',
      name: 'organization-view',
      component: () => import('@/migis/modules/app/hr/OrganizationView.vue'),
      redirect: { name: 'organization-dashboard' },
      children: [
        {
          path: '/',
          name: 'organization-dashboard',
          component: () => import('@/migis/modules/app/hr/organization/Dashboard.vue'),
          meta: {
            subject: 'ACL-HR',
            actions: 'read',
            redirectIfLoggedIn: false,
            tabTitle: 'HR',
            pageTitle: 'Organisasi',
            layout: '',
            breadcrumb: [
              { text: 'HR', to: {name: 'hr-dashboard'} },
              { text: 'Organisasi', active: true },
            ],
            backButton: true,
          },
        },
      ],
    },
    {
      path: 'sync-attn',
      name: 'sync-attn-view',
      component: () => import('@/migis/modules/app/hr/SyncAttendanceView.vue'),
      redirect: { name: 'sync-attn-dashboard' },
      children: [
        {
          path: '/',
          name: 'sync-attn-dashboard',
          component: () => import('@/migis/modules/app/hr/sync-attn/Dashboard.vue'),
          meta: {
            subject: 'ACL-HR',
            actions: 'read',
            redirectIfLoggedIn: false,
            tabTitle: 'HR',
            pageTitle: 'Sinkronisasi Absensi',
            layout: '',
            breadcrumb: [
              { text: 'HR', to: {name: 'hr-dashboard'} },
              { text: 'Sinkronisasi Absensi', active: true },
            ],
            backButton: true,
          },
        },
      ],
    },
  ],
}