import Vue from 'vue'
import VueRouter from 'vue-router'
import Product from '../components/Product'
import Products from '../components/Products'
import NewProduct from '../components/NewProduct'
import App from '../App';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'App',
      component: App,
      redirect: '/products',
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    { 
      path: '/product/create',
      name: 'NewProduct',
      component: NewProduct
    },
    { 
      path: '/product/:id',
      name: 'Product',
      component: Product
    },
  ] 
});

export default router;