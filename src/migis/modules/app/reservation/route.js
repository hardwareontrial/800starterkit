export default {
  path: 'reservation',
  name: 'reservation-view',
  component: () => import('@/migis/modules/app/reservation/ReservationView.vue'),
  redirect: { name: 'reservation-dashboard' },
  children: [
    {
      path: '/',
      name: 'reservation-dashboard',
      component: () => import('@/migis/modules/app/reservation/DashboardView.vue'),
      meta: {
        subject: 'ACL-Reservation',
        actions: 'read',
        redirectIfLoggedIn: false,
        tabTitle: 'Reservasi',
        pageTitle: 'Reservasi',
        layout: '',
        breadcrumb: [
          { text: 'Reservasi', active: true },
        ],
        backButton: true,
      },
    },
    {
      path: 'ruangan',
      name: 'reservation-room',
      component: () => import('@/migis/modules/app/reservation/RoomReservation.vue'),
      redirect: { name: 'reservation-room-dashboard' },
      children: [
        {
          path: '/',
          name: 'reservation-room-dashboard',
          component: () => import('@/migis/modules/app/reservation/room/DashboardView.vue'),
          meta: {
            subject: 'ACL-Reservation',
            actions: 'read',
            redirectIfLoggedIn: false,
            tabTitle: 'Reservasi',
            pageTitle: 'Reservasi Ruangan',
            layout: '',
            breadcrumb: [
              { text: 'Reservasi', to: {name: 'reservation-dashboard'} },
              { text: 'Ruangan', active: true },
            ],
            backButton: true,
          },
        },
        {
          path: 'create',
          name: 'reservation-room-create',
          component: () => import('@/migis/modules/app/reservation/room/CreateView.vue'),
          meta: {
            subject: 'ACL-Reservation',
            actions: 'read',
            redirectIfLoggedIn: false,
            tabTitle: 'Reservasi',
            pageTitle: 'Buat Reservasi',
            layout: '',
            breadcrumb: [
              { text: 'Reservasi', to: {name: 'reservation-dashboard'} },
              { text: 'Ruangan', to: {name: 'reservation-room-dashboard'} },
              { text: 'Buat Reservasi', active: true },
            ],
            backButton: true,
          },
        },
      ],
    },
    {
      path: 'nomor-surat',
      name: 'reservation-numberOfLetter-dashboard',
      component: () => import('@/migis/modules/app/reservation/NumberLetterDashboardView.vue'),
      meta: {
        subject: 'ACL-Reservation',
        actions: 'read',
        redirectIfLoggedIn: false,
        tabTitle: 'Reservasi',
        pageTitle: 'Reservasi Nomor Surat',
        layout: '',
        breadcrumb: [
          { text: 'Reservasi', to: {name: 'reservation-dashboard'} },
          { text: 'Reservasi Nomor Surat', active: true },
        ],
        backButton: true,
      },
    },
    {
      path: 'administration',
      name: 'reservation-admin-dashboard',
      component: () => import('@/migis/modules/app/reservation/AdministrationView.vue'),
      meta: {
        subject: 'ACL-Reservation',
        actions: 'read',
        redirectIfLoggedIn: false,
        tabTitle: 'Reservasi',
        pageTitle: 'Administrasi',
        layout: '',
        breadcrumb: [
          { text: 'Reservasi', to: {name: 'reservation-dashboard'} },
          { text: 'Administrasi', active: true },
        ],
        backButton: true,
      },
    },
  ],
}