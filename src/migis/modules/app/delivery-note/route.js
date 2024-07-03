export default {
  path: 'delivery-note',
  name: 'deliveryNote-view',
  component: () => import('@/migis/modules/app/delivery-note/DeliveryNoteView.vue'),
  redirect: { name: 'deliveryNote-dashboard-view' },
  children: [
    {
      path: '/',
      name: 'deliveryNote-dashboard-view',
      component: () => import('@/migis/modules/app/delivery-note/DashboardView.vue'),
      meta: {
        subject: 'ACL-DeliveryNote',
        actions: 'read',
        redirectIfLoggedIn: false,
        tabTitle: 'Surat Jalan',
        pageTitle: 'SURAT JALAN',
        layout: '',
        breadcrumb: [
          { text: 'Surat Jalan', active: true },
        ],
        backButton: true,
      },
    },
    {
      path: 'create',
      name: 'deliveryNote-create-view',
      component: () => import('@/migis/modules/app/delivery-note/CreateView.vue'),
      meta: {
        subject: 'ACL-DeliveryNote',
        actions: 'read',
        redirectIfLoggedIn: false,
        tabTitle: 'Surat Jalan',
        pageTitle: 'Buat Baru',
        layout: '',
        breadcrumb: [
          { text: 'Surat Jalan', to: {name: 'deliveryNote-dashboard-view'} },
          { text: 'Buat Baru', active: true },
        ],
        backButton: true,
      },
    },
    {
      path: ':unique/detail',
      name: 'deliveryNote-detail-view',
      component: () => import('@/migis/modules/app/delivery-note/DetailView.vue'),
      meta: {
        subject: 'ACL-DeliveryNote',
        actions: 'read',
        redirectIfLoggedIn: false,
        tabTitle: 'Surat Jalan',
        pageTitle: 'Detail',
        layout: '',
        breadcrumb: [
          { text: 'Surat Jalan', to: {name: 'deliveryNote-dashboard-view'} },
          { text: 'Detail', active: true },
        ],
        backButton: true,
      },
    },
    {
      path: 'export',
      name: 'deliveryNote-export-view',
      component: () => import('@/migis/modules/app/delivery-note/ExportView.vue')
    },
  ],
}