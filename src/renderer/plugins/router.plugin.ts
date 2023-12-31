import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import * as PATH_CONST from "@/configs/constants/path.const";
import NotFoundView from "@/renderer/views/NotFound/NotFoundView.vue";
import { productName } from "~/package.json";

/**
 * Not found (404) path
 */
const PATH_NOT_FOUND: RouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  component: NotFoundView,
};

/**
 * Vue router configurations
 */
const router = createRouter({
  history: createWebHashHistory("/"),
  routes: [...Object.values(PATH_CONST), PATH_NOT_FOUND],
});

/**
 * Router Hook: Before change route
 */
router.beforeEach((to, from, next) => {
  document.title = productName.trim();
  return next();
});

export { router };
