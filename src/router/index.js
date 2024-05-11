import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import EventLayout from '@/views/event/Layout.vue'
import EventDetailsView from '@/views/event/Details.vue'
import EditEvent from '@/views/event/Edit.vue'
import RegisterEvent from '@/views/event/Register.vue'
const AboutView = () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue')

import NotFound from '@/views/NotFound.vue'
import NetworkError from "@/views/NetworkError.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page) || 1 })
    },
    {
      path: '/events/:id', // :id is a dynamic segment
      name: 'event-layout',
      props: true,
      component: EventLayout,
      children: [
        {
          path: '', // default child route
          name: 'event-details',
          component: EventDetailsView
        },
        {
          path: 'register',
          name: 'event-register',
          component: RegisterEvent
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EditEvent,
          meta: { requireAuth: true } // this route requires auth
        }
      ]
    },
    {
      path: '/event/:afterEvent(.*)',
      redirect: (to) => {
        return { path: '/events/' + to.params.afterEvent }
      }
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView,
      alias: '/about-us'
    },
    {
      path:'/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: NetworkError
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Global navigation guard

router.beforeEach((to, from, next) => {
  const isAuthenticated = false // replace this with your authentication logic

  if (to.meta.requireAuth) {
    console.log('This route requires auth')
    if (isAuthenticated) {
      next()
    } else {
      next({ name: 'event-details', params: { id: to.params.id } })
    }
  } else {
    next()
  }
})

export default router
