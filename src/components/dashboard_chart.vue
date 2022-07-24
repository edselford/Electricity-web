<script lang="ts">
import { defineComponent } from "vue";
import { Notes } from "../models/interface";
export default defineComponent({
  props: {
    notelist: Array<Notes>,
  },

  created() {
    if (this.notelist == null || this.notelist.length === 0) return;
    (async () => {
      const { ElectricManager } = await import("../models/electric_models");
      const labels = await new ElectricManager(this.notelist!).getLabels();
      const chartdata = {
        labels: labels.labels,
        datasets: [
          {
            axisID: "left-axis",
            name: "Usage per Day (kwh)",
            values: labels.data.usage,
          },
          {
            axisID: "right-axis",
            name: "After Charging (kwh)",
            values: labels.data.lastsize,
          },
        ],
      };

      const option = {
        axisOptions: {
          xIsSeries: true,
          yAxis: [
            {
              id: "right-axis",
              position: "right",
              yAxisMode: "span",
              title: "Usage / day",
            },
            {
              id: "left-axis",
              position: "left",
              yAxisMode: "span",
              title: "Charge total",
            },
          ],
        },
        lineOptions: {
          regionFill: 1,
        },
        title: "",
        data: chartdata,
        type: "bar", // or 'bar', 'line', 'scatter', 'pie', 'percentage'
        height: 250,
        colors: ["#161616", "#979EAB"],
      };

      const { Chart }: { Chart: any } = (
        await import("../models/frappe_chart_min")
      ).default;
      new Chart("#vertical-chart", option);
      option.type = "line";
      new Chart("#horizontal-chart", option);
    })();
  },
});
</script>

<template>
  <div
    class="rounded-lg shadow-lg py-5 sm:p-5 max-w-screen-lg mx-auto mt-10 bg-slate-50 dark:bg-verydarkgray"
  >
    <p class="text-stone-600 dark:text-stone-300 font-semibold ml-5">
      Usage per Day (kwh)
    </p>
    <div
      id="vertical-chart"
      class="origin-center hidden sm:block dark:invert"
    ></div>
    <div
      id="horizontal-chart"
      class="origin-center sm:hidden dark:invert"
    ></div>
  </div>
</template>
