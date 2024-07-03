export default {
  path: '/auth',
  name: 'auth-view',
  component: () => import('@/migis/modules/auth/AuthView.vue'),
  redirect: { name: 'authorization-dashboard' },
  children: [
    {
      path: 'login',
      name: 'auth-login-view',
      component: () => import('@/migis/modules/auth/LoginView.vue'),
      meta: {
        subject: 'App',
        actions: 'read',
        redirectIfLoggedIn: true,
        tabTitle: 'Login',
        layout: 'full',
        backButton: false,
      },
    },
  ],
}