import { RouteRecordRaw } from 'vue-router'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/subjects',
    name: 'PSubjects',
    meta: {
      layout: 'default',
      protected: true,
    },
    component: () => import('@/modules/subjects/views/PSubjects.vue'),
  },
]

export default routes
