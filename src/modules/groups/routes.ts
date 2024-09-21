import { RouteRecordRaw } from 'vue-router'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/groups',
    name: 'PGroups',
    meta: {
      layout: 'default',
      protected: true,
    },
    component: () => import('@/modules/groups/views/PGroups.vue'),
  },
]

export default routes
