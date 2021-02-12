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
      path: '/product/create',
      name: 'NewProduct',
      component: () => import('../components/NewProduct')
    },
    { 
      path: '/product/:id',
      name: 'Product',
      component: () => import('../components/Product'),
    },
    { 
      path: '/product/edit/:id',
      name: 'EditProduct',
      component: () => import('../components/EditProduct')
    },
  ] 
});

export default router;