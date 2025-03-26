import PageLogin from 'pages/PageLogin.vue'
import PageCadastroUsuario from 'pages/PageCadastroUsuario.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'home', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/perfil',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/perfil', name: 'perfil', component: () => import('pages/PagePerfil.vue') },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: PageLogin,
  },
  {
    path: '/logout',
    component: {
      beforeRouteEnter(to, from, next) {
        localStorage.removeItem('userToken')
        next('/login')
      },
      render: () => null, // Não renderiza nada
    },
  },

  {
    path: '/cadastrar',
    component: PageCadastroUsuario,
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
