<script lang="ts">
import { defineComponent } from "vue";
import { Notes } from "../models/interface";
import DashboardGlobal from "../components/dashboard_global.vue";
import DashboardChart from "../components/dashboard_chart.vue";
export default defineComponent({
  components: {
    DashboardGlobal,
    DashboardChart,
  },
  props: {
    notepromise: Promise<{ results: Notes[] }>,
  },
  data(): { notelist: Notes[] } {
    return {
      notelist: [],
    };
  },
  async setup(props) {
    if (props.notepromise != undefined) {
      const { results: notelist } = await props.notepromise;

      return { notelist };
    }
  },
});
</script>

<template>
  <div class="p-5 w-full">
    <div class="max-w-screen-lg mx-auto">
      <h1 class="font-semibold text-4xl text-stone-900 dark:text-white mb-10">
        Dashboard
      </h1>
      <DashboardGlobal :notelist="notelist" />
      <DashboardChart :notelist="notelist" />
    </div>
  </div>
  <div class="m-auto flex justify-center">
    <span class="text-slate-400 dark:text-stone-500 font-jetbrainsmono"
      >Made by
      <a
        target="_blank"
        href="https://github.com/edselford"
        class="underline underline-offset-2"
        >Edsel Mustapa</a
      ></span
    >
  </div>
</template>
