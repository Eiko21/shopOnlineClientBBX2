import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'App',
      component: () => import('../App'),
      redirect: '/products',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/auth-pages/Login'),
    },
    {
      path: '/products/',
      name: 'Products',
      component: () => import('../components/Products'),
    },
    { 
      path: '/products/create',
      name: 'NewProduct',
      component: () => import('../components/NewProduct')
    },
    { 
      path: '/products/:id',
      name: 'Product',
      component: () => import('../components/Product'),
    },
    { 
      path: '/products/edit/:id',
      name: 'EditProduct',
      component: () => import('../components/EditProduct')
    },
    { 
      path: '/users',
      name: 'Users',
      component: () => import('../components/admin-pages/Users')
    },
    { 
      path: '/users/create',
      name: 'NewUser',
      component: () => import('../components/admin-pages/NewUser')
    }
  ] 
});

export default router;