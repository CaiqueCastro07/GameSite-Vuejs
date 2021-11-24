import Vue from "vue";
import Router from "vue-router";
import Layout from "./components/Layout.vue";
import caminhos from "./items/caminhos.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "Layout",
      path: "/",
      redirect: '/memorygame',
      component: Layout, // COMPONENTE
      children: [...caminhos], // ARRAY DE COMPONENTES, children é o nome padrão
    },
  ],
});

export default router;
