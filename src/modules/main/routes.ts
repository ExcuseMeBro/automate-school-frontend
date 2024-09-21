import { RouteRecordRaw } from 'vue-router'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'PTimetable',
    meta: {
      layout: 'default',
      protected: true,
    },
    component: () => import('@/modules/main/views/PIndex.vue'),
  },
]

export default routes
