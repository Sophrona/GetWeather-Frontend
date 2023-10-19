import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/weather/:country/:city",
      name: "cityView",
      component: CityView,
      meta: {
        title: "Weather",
      },
    },
  ],
});

// Dynamic HTML titles
router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.country
      ? `${to.params.country}, ${to.params.city.replaceAll("-", " ")}`
      : to.meta.title
  } | Get Weather`;
  next();
});

export default router;
