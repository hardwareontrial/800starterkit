export default {
  path: 'ga-inventaris',
  name: 'gainventaris-view',
  component: () => import('@/migis/modules/app/ga-inventaris/GaInventarisView.vue'),
  redirect: { name: 'gainventaris-dashboard' },
  children: [
    {
      path: '/',
      name: 'gainventaris-dashboard',
      component: () => import('@/migis/modules/app/ga-inventaris/DashboardView.vue'),
      meta: {
        subject: 'ACL-GaInventaris',
        actions: 'read',
        redirectIfLoggedIn: false,
        tabTitle: 'Ga Inventaris',
        pageTitle: 'GA INVENTARIS',
        layout: '',
        breadcrumb: [
          { text: 'Ga Inventaris', active: true },
        ],
        backButton: true,
      },
    },
    {
      path: 'create',
      name: 'gainventaris-create',
      component: () => import('@/migis/modules/app/ga-inventaris/CreateView.vue'),
      meta: {
        subject: 'ACL-GaInventaris',
        actions: 'read',
        redirectIfLoggedIn: false,
        tabTitle: 'Ga Inventaris',
        pageTitle: 'DAFTAR BARU',
        layout: '',
        breadcrumb: [
          { text: 'Ga Inventaris', to: {name: 'gainventaris-dashboard'} },
          { text: 'Daftar Baru', active: true },
        ],
        backButton: true,
      },
    },
    {
      path: ':unique/detail',
      name: 'gainventaris-detail',
      component: () => import('@/migis/modules/app/ga-inventaris/DetailView.vue'),
      meta: {
        subject: 'ACL-GaInventaris',
        actions: 'read',
        redirectIfLoggedIn: false,
        tabTitle: 'Ga Inventaris',
        pageTitle: 'DETAIL INVENTARIS',
        layout: '',
        breadcrumb: [
          { text: 'Ga Inventaris', to: {name: 'gainventaris-dashboard'} },
          { text: 'Detail Inventaris', active: true },
        ],
        backButton: true,
      },
    },
    {
      path: 'export',
      name: 'gainventaris-export',
      component: () => import('@/migis/modules/app/ga-inventaris/ExportView.vue'),
      meta: {
        subject: 'ACL-GaInventaris',
        actions: 'read',
        redirectIfLoggedIn: false,
        tabTitle: 'Ga Inventaris',
        pageTitle: 'EXPORT',
        layout: '',
        breadcrumb: [
          { text: 'Ga Inventaris', to: {name: 'gainventaris-dashboard'} },
          { text: 'Export', active: true },
        ],
        backButton: true,
      },
    },
  ],
}