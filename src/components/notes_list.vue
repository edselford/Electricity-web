<script lang="ts">
import { defineComponent } from "vue";
import { Notes, DetailReturn } from "../models/interface";
export default defineComponent({
  props: {
    notelist: {
      type: Array<Notes>,
      require: true,
    },
  },
  emits: ["clicked"],
  data(): {
    notedata: {
      id: number;
      kwhPerDay: DetailReturn;
      timeFormat: string;
      day: string;
    }[];
  } {
    return {
      notedata: [],
    };
  },
  methods: {
    seeDetail(id: number) {
      this.$emit("clicked", id);
    },
    isTouchDevice() {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0
      );
    },
  },
  async setup(props) {
    if (props.notelist != null) {
      const notedata = await Promise.all(
        props.notelist!.map(async (note: Notes) => {
          const dayjs = (await import("dayjs")).default;
          const { ElectricDetail } = await import("../models/detail_models");
          return {
            id: note.id,
            kwhPerDay: await new ElectricDetail(
              note.id,
              props.notelist!
            ).kwhPerDay(),
            timeFormat: dayjs(note.time).format("DD MMM YYYY"),
            day: dayjs(note.time).format("dddd"),
          };
        })
      );
      return { notedata };
    } else {
      return { notedata: { status: "error" } };
    }
  },
});
</script>

<template>
  <!--Notelist-->
  <div
    id="note-list"
    class="md:w-1/3 w-full h-full pr-4 rounded-lg transition ease-in-out translate-x-0 hover:-translate-x-1 duration-300"
    :class="{
      'overflow-hidden': !isTouchDevice(),
      'hover:overflow-scroll': !isTouchDevice(),
      'overflow-scroll': isTouchDevice(),
    }"
  >
    <div v-for="note in notelist">
      <a
        class="pl-2 my-3 mr-2 block cursor-pointer"
        @click="
          () => {
            seeDetail(note.id);
          }
        "
      >
        <div
          class="flex flex-row justify-between items-center dark:text-white pb-1"
        >
          <div class="flex flex-col">
            <span class="text-md font-medium">{{
              notedata.filter((x: any) => x.id == note.id)[0].timeFormat
            }}</span>
            <span class="text-xs text-stone-500 dark:text-stone-400">{{
              notedata.filter((x: any) => x.id == note.id)[0].day
            }}</span>
          </div>
          <div class="flex flex-col items-end">
            <span class="text-xl">
              {{ note.size }}<span class="text-xs">kwh</span>
            </span>
            <span class="text-md text-stone-500 dark:text-stone-400">
              {{
                notedata.filter((x: any) => x.id == note.id)[0].kwhPerDay
                  .value || "Last Charge"
              }}
              <span v-if="notelist![0] !== note" class="text-xs">kwh/d</span>
            </span>
          </div>
        </div>
        <hr
          v-if="notelist!.indexOf(note) + 1 !== notelist!.length"
          class="dark:border-stone-600 my-3"
        />
      </a>
    </div>
  </div>
</template>
