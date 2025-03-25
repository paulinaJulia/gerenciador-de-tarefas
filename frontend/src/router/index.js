import { defineRouter } from '#q-app/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'



export default defineRouter(function () {
  const typeHistory =
    process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory
  const createHistory = process.env.SERVER ? createMemoryHistory : typeHistory
  console.log({ routes })
  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach((to, from, next) => {
    const isAuth = localStorage.getItem('userToken') !== null
    if (to.path === '/' && !isAuth) {
      next('/login') // Redireciona para login se não estiver autenticado
    } else {
      next() // Prossegue normalmente
    }
  })

  return Router
})

