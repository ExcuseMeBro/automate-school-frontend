import { RouteRecordRaw } from 'vue-router'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/teachers',
    name: 'PTeachers',
    meta: {
      layout: 'default',
      protected: true,
    },
    component: () => import('@/modules/teachers/views/PTeachers.vue'),
  },
]

export default routes
