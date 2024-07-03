export default {
  path: '/dashboard',
  name: 'dashboard-view',
  component: () => import('@/migis/modules/dashboard/DashboardView.vue'),
  meta: {
    subject: 'ACL',
    actions: 'read',
    redirectIfLoggedIn: false,
    tabTitle: 'Dashboard',
    pageTitle: 'Dashboard',
    layout: '',
    breadcrumb: [
      {
        text: 'Dashboard',
        active: true,
      },
    ],
    backButton: false,
  },
}