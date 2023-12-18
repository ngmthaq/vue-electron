/**
 * Path constants for Vue-Router
 *
 * @see https://router.vuejs.org/guide/
 */

import type { RouteRecordRaw } from "vue-router";
import HomeView from "@/vue/views/Home/HomeView.vue";
import AboutView from "@/vue/views/About/AboutView.vue";

export const PATH_HOME: RouteRecordRaw = {
  path: "/",
  component: HomeView,
  meta: {
    title: "Homepage",
  },
};

export const PATH_ABOUT: RouteRecordRaw = {
  path: "/about",
  component: AboutView,
  meta: {
    title: "About",
  },
};