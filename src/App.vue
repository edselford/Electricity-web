<script setup lang="ts">
import Navbar from "./views/navbar.vue";
</script>

<template>
  <Navbar />
  <div class="pt-10">
    <Suspense>
      <router-view />
      <template #fallback>
        <div class="text-white">Loading</div>
      </template>
    </Suspense>
  </div>
  <div class="block m-auto flex justify-center">
    <span class="text-slate-700 dark:text-stone-500 font-jetbrainsmono"
      >Made by
      <a
        href="https://github.com/edselford"
        class="underline underline-offset-2"
        >Edsel Mustapa</a
      ></span
    >
  </div>
</template>

<style>
/*
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}*/

::-webkit-scrollbar {
  width: 5px;
  background-color: rgba(0, 0, 0, 0);
}

::-webkit-scrollbar-thumb {
  width: 5px;
  background-color: gray;
  border-radius: 5px;
}
</style>
