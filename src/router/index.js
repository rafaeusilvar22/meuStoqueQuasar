import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import useAuthUser from "src/composables/useAuthUser";
// import { getRedirectObj } from "src/m'odules/utils";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  router.beforeEach((to) => {
    const { isLoggedIn } = useAuthUser();

    if (to.hash.includes("type=recovery") && to.name !== "reset-password") {
      console.log(to.hash);
      return { name: "reset-password" };
    }

    if (
      !isLoggedIn() &&
      to.meta.requiresAuth &&
      !Object.keys(to.query).includes("fromEmail")
    ) {
      return { name: "login" };
    }
  });
  return router;
});
