<script lang="ts">
import { defineComponent } from "vue";
import { Notes, DetailReturn } from "../models/interface";
export default defineComponent({
  props: {
    notelist: Array<Notes>,
  },
  data(): {
    interval: any;
    estAmount: string;
    avgUsage: number;
    estPrice: string;
    estEmpty:
      | {
          value: number;
          datasets: {
            day: number;
            hours: number;
            minutes: number;
            seconds: number;
          };
        }
      | DetailReturn;
  } {
    return {
      estAmount: "0",
      avgUsage: 0,
      estPrice: "0",
      estEmpty: {
        value: 0,
        datasets: { day: 0, hours: 0, minutes: 0, seconds: 0 },
      },
      interval: 0,
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  beforeRouteLeave() {
    clearInterval(this.interval);
  },
  created() {
    if (this.notelist == null || this.notelist.length === 0) return;
    import("../models/electric_models").then(({ ElectricManager }) => {
      const electricManager = new ElectricManager(this.notelist!);
      electricManager.avgUsage().then((res) => (this.avgUsage = res));
      electricManager
        .pricePerDay()
        .then((res) => (this.estPrice = parseFloat(res).toFixed(0)));

      this.interval = setInterval(() => {
        electricManager
          .estimateElectricLong()
          .then((res) => (this.estEmpty = res));
        electricManager
          .estimateAmount()
          .then((res) => (this.estAmount = parseFloat(res).toFixed(2)));
      }, 1000);
    });
  },
});
</script>

<template>
  <div
    class="flex flex-wrap flex-row md:flex-nowrap justify-evenly shadow-md dark:bg-verydarkgray bg-slate-50 rounded-lg my-5 max-w-screen-lg mx-auto"
  >
    <div class="flex flex-col p-5 w-1/2 md:w-auto">
      <p class="text-stone-600 dark:text-stone-300 font-semibold">
        Amt. Electric
      </p>
      <span class="text-stone-900 dark:text-white">
        <p class="inline text-2xl sm:text-5xl font-jetbrainsmono">
          {{ estAmount }}
        </p>
        <p class="inline text-sm">kwh</p>
      </span>
    </div>
    <div class="flex flex-col p-5 w-1/2 md:w-auto">
      <p class="text-stone-600 dark:text-stone-300 font-semibold">
        Avg. Usage / Day
      </p>
      <span class="text-stone-900 dark:text-white">
        <p class="inline text-2xl sm:text-5xl font-jetbrainsmono">
          {{ avgUsage }}
        </p>
        <p class="inline text-sm">kwh</p>
      </span>
    </div>
    <div class="flex flex-col p-5 w-1/2 md:w-auto">
      <p class="text-stone-600 dark:text-stone-300 font-semibold">
        Est. Price / Day
      </p>
      <span class="text-stone-900 dark:text-white">
        <p class="inline text-sm">Rp.</p>
        <p class="inline text-2xl sm:text-5xl font-jetbrainsmono">
          {{ estPrice }}
        </p>
      </span>
    </div>
    <div class="flex flex-col p-5 w-1/2 md:w-auto text">
      <p class="text-stone-600 dark:text-stone-300 font-semibold">
        Est. Power Out
      </p>
      <span
        class="text-stone-900 dark:text-white text-2xl sm:text-md font-jetbrainsmono"
      >
        <span>{{ estEmpty.datasets.day }}</span>
        <span class="text-sm">day </span>
        <span>{{ estEmpty.datasets.hours }}</span>
        <span class="text-sm">hours </span><br />
        <span>{{ estEmpty.datasets.minutes }}</span>
        <span class="text-sm">min </span>
        <span>{{ estEmpty.datasets.seconds }}</span>
        <span class="text-sm">sec </span>
      </span>
    </div>
  </div>
</template>
