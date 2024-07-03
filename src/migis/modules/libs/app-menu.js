export default {
  key: 'title',
  data: [
    {
      title: 'Apps',
      route: {name: ''},
      icon: '',
      isBookmarked: false,
      isHeader: true,
      parentGroup: '',
      childGroup: 'apps',
    },
    {
      title: 'Dashboard',
      route: {name: 'dashboard-view'},
      icon: 'tabler:layout-dashboard',
      isBookmarked: false,
      isHeader: false,
      parentGroup: 'main',
      childGroup: '',
    },
    {
      title: 'GA Inventaris',
      pageMenuName: 'ga-inventaris',
      route: {name: 'gainventaris-view'},
      icon: 'tabler:asset',
      children: [
        {
          title: 'Dashboard',
          route: {name: 'gainventaris-dashboard'},
          icon: 'tabler:table-row',
        },
        {
          title: 'Create',
          route: {name: 'gainventaris-create'},
          icon: 'tabler:table-plus',
        },
        {
          title: 'Export',
          route: {name: 'gainventaris-export'},
          icon: 'tabler:table-export',
        },
      ],
      isBookmarked: false,
      isHeader: false,
      parentGroup: 'apps',
      childGroup: '',
    },
    {
      title: 'Home',
      route: {name: 'home-view'},
      icon: 'tabler:home',
      isBookmarked: false,
      isHeader: false,
      parentGroup: 'main',
      childGroup: '',
    },
    {
      title: 'HR',
      pageMenuName: 'hr',
      route: {name: 'hr-view'},
      icon: 'tabler:users-group',
      children: [
        {
          title: 'Organisasi',
          route: {name: 'organization-view'},
          icon: 'tabler:accessible',
        },
        {
          title: 'Sinkronisasi Absensi',
          route: {name: 'sync-attn-view'},
          icon: 'tabler:refresh',
        },
      ],
      isBookmarked: false,
      isHeader: false,
      parentGroup: 'apps',
      childGroup: '',
    },
    {
      title: 'OKM',
      route: {name: 'okm-view'},
      icon: 'tabler:circle-letter-o',
      children: [
        {
          title: 'Administrative',
          route: {name: 'okm-admin-view'},
          icon: 'tabler:accessible',
        },
      ],
      isBookmarked: false,
      isHeader: false,
      parentGroup: 'apps',
      childGroup: '',
    },
    {
      title: 'Main',
      route: {name: ''},
      icon: '',
      isBookmarked: false,
      isHeader: true,
      parentGroup: '',
      childGroup: 'main',
    },
    {
      title: 'Reservasi',
      pageMenuName: 'reservation',
      route: {name: 'reservation-view'},
      icon: 'tabler:bookmarks',
      children: [
        {
          title: 'Reservasi Ruangan',
          route: {name: 'deliveryNote-dashboard-view'},
          icon: 'tabler:chalkboard',
        },
        {
          title: 'Reservasi Nomor Surat',
          route: {name: 'deliveryNote-create-view'},
          icon: 'tabler:list-numbers',
        },
      ],
      isBookmarked: false,
      isHeader: false,
      parentGroup: 'apps',
      childGroup: '',
    },
    {
      title: 'Surat Jalan',
      pageMenuName: 'delivery-note',
      route: {name: 'deliveryNote-view'},
      icon: 'tabler:cube-send',
      children: [
        {
          title: 'Dashboard',
          route: {name: 'deliveryNote-dashboard-view'},
          icon: 'tabler:table-row',
        },
        {
          title: 'Create',
          route: {name: 'deliveryNote-create-view'},
          icon: 'tabler:table-plus',
        },
        {
          title: 'Export',
          route: {name: 'deliveryNote-export-view'},
          icon: 'tabler:table-export',
        },
      ],
      isBookmarked: false,
      isHeader: false,
      parentGroup: 'apps',
      childGroup: '',
    },
    {
      title: 'Manajemen User',
      pageMenuName: 'management-user',
      route: {name: 'management-user-view'},
      icon: 'tabler:password-user',
      children: [
        {
          title: 'Dashboard',
          route: {name: 'management-user-dashboard'},
          icon: 'tabler:users',
        },
        {
          title: 'Tambah User Baru',
          route: {name: 'management-user-create'},
          icon: 'tabler:user-plus',
        },
        {
          title: 'Tambah User Otentikasi Baru',
          route: {name: 'management-user-create-auth'},
          icon: 'tabler:user-plus',
        },
      ],
      isBookmarked: false,
      isHeader: false,
      parentGroup: 'apps',
      childGroup: '',
    },
    {
      title: 'Role & Perizinan',
      route: { name: 'authorization-view' },
      icon: 'tabler:lock-bolt',
      isBookmarked: false,
      isHeader: false,
      parentGroup: 'apps',
      childGroup: '',
    },
    {
      title: 'Login',
      route: {name: 'auth-login-view'},
      icon: 'tabler:login-2',
      isBookmarked: false,
      isHeader: false,
      parentGroup: 'apps',
      childGroup: '',
    },
  ],
}