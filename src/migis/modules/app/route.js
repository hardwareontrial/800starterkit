import DeliveryNoteRoute from '@/migis/modules/app/delivery-note/route'
import GaInventarisRoute from '@/migis/modules/app/ga-inventaris/route'
import AuthorizationRoute from '@/migis/modules/app/authorization/route'
import ManagementUserRoute from '@/migis/modules/app/user/route'
import ReservationRoute from '@/migis/modules/app/reservation/route'
import HRRoute from '@/migis/modules/app/hr/route'
import OKMRoute from '@/migis/modules/app/okm/route'

export default {
  path: '/app',
  name: 'app-view',
  component: () => import('@/migis/modules/app/AppView.vue'),
  children: [
    DeliveryNoteRoute,
    GaInventarisRoute,
    AuthorizationRoute,
    ManagementUserRoute,
    ReservationRoute,
    HRRoute,
    OKMRoute,
  ]
}