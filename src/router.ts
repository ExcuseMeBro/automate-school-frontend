import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainRoutes from '@/modules/main/routes.ts'
import AuthRoutes from '@/modules/login/routes.ts'
import SubjectRoutes from '@/modules/subjects/routes.ts'
import GroupRoutes from '@/modules/groups/routes.ts'
import TeacherRoutes from '@/modules/teachers/routes.ts'

const routes: Array<RouteRecordRaw> = [
  ...AuthRoutes,
  ...MainRoutes,
  ...SubjectRoutes,
  ...GroupRoutes,
  ...TeacherRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: {
      layout: 'error',
      protected: true,
    },
    component: () => import('@/modules/PError.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _, next) => {
  const isAuthenticated = localStorage.getItem('token')
  if (to.name === 'PLogin') {
    if (isAuthenticated) {
      next('/')
    }
  }

  if (to.meta.protected) {
    if (!isAuthenticated) {
      next('/login')
    }
  }

  next()
})

export default router
