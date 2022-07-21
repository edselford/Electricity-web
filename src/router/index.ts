import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";

const notepromise = new Promise((resolve, reject) => {
  if ("fetch" in window) {
    fetch("https://electricalnotesapi.herokuapp.com/note")
      .then((res) => {
        res.json().then((note) => {
          resolve(note);
        });
      })
      .catch((err) => {
        reject(err);
      });
  } else {
    import("axios-minified").then(({ default: axios }) => {
      axios
        .get("https://electricalnotesapi.herokuapp.com/note")
        .then((note) => {
          resolve(note.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
});

const routes: { path: string; name: string; component: any; props?: any }[] = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/dashboard.vue"),
    props: {
      notepromise,
    },
  },
  {
    path: "/notes",
    name: "Notes",
    component: () => import("../views/notes.vue"),
    props: {
      notepromise,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/notfound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const DEFAULT_TITLE = "Electric Notes";
    document.title = to.name
      ? `${to.name.toString()} | ${DEFAULT_TITLE}`
      : DEFAULT_TITLE;
    next();
  }
);

router.resolve({
  name: "not-found",
  params: { pathMatch: ["not", "found"] },
}).href;

export default router;
