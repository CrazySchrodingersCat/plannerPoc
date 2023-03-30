import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/PlannerView.vue";
import PractitionerFormView from "../views/PractitionerFormView.vue";
// import LoginView from "../views/LoginView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/practitioners",
    name: "practitioners",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PractitionersView.vue"),
  },
  {
    path: "/practitioners/:id",
    name: "login",
    component: PractitionerFormView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
