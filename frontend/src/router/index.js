import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CreateUser from '../views/CreateUser.vue'
import EditUser from '../views/EditUser.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/createuser',
    name: 'CreateUser',
    component: CreateUser,
  },
  {
    path: '/edituser/:id',
    name: 'EditUser',
    component: EditUser,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
