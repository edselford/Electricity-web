<script lang="ts">
export default {
  setup() {
    if (localStorage.darkMode === "true") {
      document.getElementsByTagName("html")[0].classList.add("dark");
    }
  },
  methods: {
    toggleDark() {
      const html: HTMLHtmlElement = document.getElementsByTagName("html")[0];
      html.classList.toggle("dark");
      localStorage.darkMode = html.classList.contains("dark") ? true : false;
    },
  },
};
</script>

<template>
  <div
    class="z-10 bg-slate-100 dark:bg-almostblack text-stone-900 dark:text-white h-10 flex justify-between md:justify-start fixed w-screen overflow-hidden drop-shadow-sm dark:drop-shadow-lg"
  >
    <div class="flex w-52">
      <img
        width="40"
        height="40"
        @click="toggleDark"
        class="electric-logo"
        src="../assets/logo.svg"
      />
      <h1 class="text-lg font-bold leading-10">Electric Notes</h1>
    </div>
    <div class="flex">
      <div class="flex mx-1 h-10 w-24 justify-center">
        <router-link :to="{ name: 'Dashboard' }" class="leading-10"
          >Dashboard</router-link
        >
      </div>
      <div class="flex mx-1 h-10 w-24 justify-center">
        <router-link :to="{ name: 'Notes' }" class="leading-10"
          >Notes</router-link
        >
      </div>
    </div>
  </div>
</template>

<style>
.router-link-active.router-link-exact-active {
  font-weight: bold;
}
</style>
