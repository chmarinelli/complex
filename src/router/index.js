import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/components/Layout';

Vue.use(VueRouter);

export const routes = [
  {
    path: "",
    component: Layout,
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/projects",
        name: "projects",
        component: () => import("@/views/Projects.vue"),
      },
    ],
  },
];


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;