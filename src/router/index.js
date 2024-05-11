import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import EventLayout from '@/views/event/Layout.vue'
import EventDetailsView from '@/views/event/Details.vue'
import EditEvent from '@/views/event/Edit.vue'
import RegisterEvent from '@/views/event/Register.vue'

import AboutView from '@/views/AboutView.vue'

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
          component: EditEvent
        }
      ]
    },

    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router
