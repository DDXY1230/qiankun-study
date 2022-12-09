import { createRouter, createWebHistory } from "vue-router";
import HellWorld from "../components/HelloWorld.vue";

const routes = [
  {
    path: "/",
    name: "HellWorld",
    component: HellWorld,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
