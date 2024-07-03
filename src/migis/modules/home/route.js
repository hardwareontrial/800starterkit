export default {
  path: '/',
  name: 'home-view',
  component: () => import('@/migis/modules/home/MainView.vue'),
  meta: {
    subject: 'App',
    actions: 'read',
    redirectIfLoggedIn: false,
    tabTitle: '',
    pageTitle: '',
    layout: '',
    breadcrumb: [],
    backButton: false,
  }
}