import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Characters from '../views/Characters.vue'
import Edit from '../views/Edit.vue';
import Comment from '../views/Comment.vue';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/characters',
    name: 'characters',
    component: Characters
  },
  {
    path: '/edit',
    name: 'edit',
    component: Edit
  },
  {
    path: '/comment',
    name: 'comment',
    component: Comment
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
