export default {
  path: 'users',
  name: 'management-user-view',
  component: () => import('@/migis/modules/app/user/UserView.vue'),
  redirect: { name: 'management-user-dashboard' },
  children: [
    {
      path: '/',
      name: 'management-user-dashboard',
      component: () => import('@/migis/modules/app/user/DashboardView.vue'),
      meta: {
        subject: 'ACL-ManagementUser',
        actions: 'read',
        redirectIfLoggedIn: false,
        tabTitle: 'Users',
        pageTitle: 'MANAGEMENT USER',
        layout: '',
        breadcrumb: [
          { text: 'Management User', active: true },
        ],
        backButton: true,
      },
    },
    {
      path: 'create',
      name: 'management-user-create',
      component: () => import('@/migis/modules/app/user/CreateView.vue'),
      meta: {
        subject: 'ACL-ManagementUser',
        actions: 'read',
        redirectIfLoggedIn: false,
        tabTitle: 'Users',
        pageTitle: 'TAMBAH BARU USER',
        layout: '',
        breadcrumb: [
          { text: 'Management User', to: {name: 'management-user-dashboard'} },
          { text: 'Tambah Baru', active: true },
        ],
        backButton: true,
      },
    },
    {
      path: 'create/auth',
      name: 'management-user-create-auth',
      component: () => import('@/migis/modules/app/user/CreateAuthView.vue'),
      meta: {
        subject: 'ACL-ManagementUser',
        actions: 'read',
        redirectIfLoggedIn: false,
        tabTitle: 'Users',
        pageTitle: 'TAMBAH OTENTIKASI USER',
        layout: '',
        breadcrumb: [
          { text: 'Management User', to: {name: 'management-user-dashboard'} },
          { text: 'Tambah Baru', active: true },
        ],
        backButton: true,
      },
    },
    {
      path: '/:unique/detail',
      name: 'management-user-detail',
      component: () => import('@/migis/modules/app/user/DetailView.vue'),
      meta: {
        subject: 'ACL-ManagementUser',
        actions: 'read',
        redirectIfLoggedIn: false,
        tabTitle: 'Users',
        pageTitle: 'DETAIL USER',
        layout: '',
        breadcrumb: [
          { text: 'Management User', to: {name: 'management-user-dashboard'} },
          { text: 'Detail', active: true },
        ],
        backButton: true,
      },
    },
  ],
}