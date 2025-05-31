import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogPostView from '@/views/BlogPostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/posts/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/posts/:slug',
      name: 'posts',
      component: BlogPostView,
    }
  ],
})

export default router
