import { createRouter, createWebHistory } from 'vue-router';

// Импорт страниц
import MainPage from '@/pages/MainPage.vue';
import NewPage from '@/pages/NewPage.vue';
import StorePage from '@/pages/StorePage.vue';
import Onas from '@/pages/OnasPage.vue';

import ProductsPage from './store/ProductsPage.vue';
import RegisterSection from './components-mainpage/RegisterSection.vue';
import LoginSection from './components-mainpage/LoginSection.vue';
import TovarPage from './pages/TovarPage.vue';
import UserPage from './pages/UserPage.vue';

// Определение маршрутов
const routes = [
  { path: '/', component: ProductsPage },
  { path: '/product/:id', component: TovarPage, props: true },
  { path: '/new', name: 'NewPage', component: NewPage },
  { path: '/home', name: 'HomePage', component: MainPage },
  { path: '/tovar', name: 'TovarPage', component: TovarPage },
  { path: '/store', name: 'StorePage', component: StorePage },
  {
    path: "/user/:id",
    name: "user",
    component: UserPage,
    meta: { requiresAuth: true },
    props: true,
  },
  { path: '/register', name: 'RegisterPage', component: RegisterSection },
  { path: '/login', name: 'LoginPage', component: LoginSection },
  { path: '/onas', name: 'OnasPage', component: Onas }
];

// Создание роутера
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Проверка авторизации перед переходом
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken');  
  if (to.meta.requiresAuth && !token) {
    next('/login');  
  } else {
    next();
  }
});

export default router;
