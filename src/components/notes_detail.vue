<script lang="ts">
import { defineComponent } from "vue";
import { Notes } from "../models/interface";
export default defineComponent({
  props: {
    id: Number,
    notelist: {
      type: Array<Notes>,
      require: true,
    },
  },
  emits: ["close"],
  data(): any {
    return {
      notedata: [],
    };
  },
  methods: {
    getData() {
      return this.notedata.filter((data: any) => data.id == this.id)[0];
    },
    closeDetail() {
      this.$emit("close", false);
    },
  },
  async setup(props) {
    if (props.notelist != null) {
      return await (async () => {
        const { ElectricDetail } = await import("../models/detail_models");

        let data = await Promise.all(
          props.notelist!.map(async (note: Notes) => {
            const dayjs = (await import("dayjs")).default;
            const moment = dayjs(note.time);
            const dateTime = {
              day: moment.format("dddd"),
              date: moment.format("DD MMM YYYY"),
              time: moment.format("HH:mm"),
            };

            const electricDetail = new ElectricDetail(note.id, props.notelist!);
            const detail = {
              kwhPerDay: (await electricDetail.kwhPerDay()).value,
              price: await electricDetail.getPrice(),
              pricePerDay: await electricDetail.pricePerDay(),
            };

            const dayRange = {
              todayRange: (await electricDetail.todayRange()).text,
              nextRange: (await electricDetail.nextChargeRange()).text,
            };

            const electric = {
              size: note.size,
              sizeBefore: note.firstsize,
              sizeAfter: note.lastsize,
            };

            return { id: note.id, dateTime, detail, dayRange, electric };
          })
        );
        return { notedata: data };
      })();
    }
  },
});
</script>

<template>
  <!-- detail page -->
  <div
    id="detail-page-list"
    class="md:w-2/3 w-full h-full flex md:flex-row flex-col justify-start rounded-lg py-5 pr-2"
  >
    <div
      class="w-px h-full bg-stone-200 md:block hidden dark:bg-stone-600"
    ></div>

    <div v-if="id === -1" class="w-full h-full" id="idle-menu">
      <div
        class="text-slate-300 dark:text-stone-600 w-full h-full flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          fill="currentColor"
          class="bi bi-journal-text"
          viewBox="0 0 16 16"
        >
          <path
            d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
          />
          <path
            d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"
          />
          <path
            d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"
          />
        </svg>
      </div>
    </div>

    <div
      class="dark:text-white flex flex-row mb-5 ml-2 cursor-pointer md:hidden"
      @click="closeDetail"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-chevron-left"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
      </svg>
      <span class="text-xs ml-2">Back to List</span>
    </div>

    <div
      v-if="id !== -1"
      class="w-full h-96 md:h-80 flex flex-col flex-wrap pr-5 md:px-5"
      id="detail-menu"
    >
      <!-- date & time -->
      <div
        class="w-1/2 h-max bg-white dark:bg-almostdarkgray dark:text-white rounded-lg p-3 mx-2 mb-2"
      >
        <div class="flex flex-row items-center">
          <img
            class="dark:invert"
            width="32"
            height="32"
            src="../assets/calendar-week.svg"
          />
          <span class="font-bold ml-5">Date & Time</span>
        </div>
        <div class="flex flex-col text-xs mt-3">
          <span id="detail-day">{{ getData().dateTime.day }}</span>
          <span id="detail-date">{{ getData().dateTime.date }}</span>
          <span id="detail-time" class="text-2xl">{{
            getData().dateTime.time
          }}</span>
        </div>
      </div>

      <!-- detail -->
      <div
        class="w-1/2 h-max bg-white dark:bg-almostdarkgray dark:text-white rounded-lg p-3 mx-2 mb-2"
      >
        <div class="mb-3 flex flex-row items-center justify-between">
          <span class="font-medium">kwh / day</span>
          <span
            ><span id="detail-usage">{{ getData().detail.kwhPerDay }}</span
            ><span class="text-xs">kwh</span></span
          >
        </div>
        <hr />
        <div class="my-3 flex flex-row items-center justify-between">
          <span class="font-medium">price</span>
          <span id="detail-price" class="text-xs">{{
            getData().detail.price
          }}</span>
        </div>
        <hr />
        <div class="mt-3 flex flex-row items-center justify-between">
          <span class="font-medium">price / day</span>
          <span id="detail-priceperday" class="text-xs">{{
            getData().detail.pricePerDay
          }}</span>
        </div>
      </div>

      <!-- day range -->
      <div
        class="w-1/2 h-max bg-white dark:bg-almostdarkgray dark:text-white rounded-lg p-3 mx-2 mb-2"
      >
        <div class="flex flex-row">
          <img
            class="mr-2 dark:invert"
            width="32"
            height="32"
            src="../assets/diagram-2-fill.svg"
          />
          <div class="flex flex-col text-xs">
            <span id="detail-todayrange">{{
              getData().dayRange.todayRange
            }}</span>
            <span id="detail-range">{{ getData().dayRange.nextRange }}</span>
          </div>
        </div>
      </div>

      <!-- electric -->
      <div
        class="w-1/2 h-max bg-white dark:bg-almostdarkgray dark:text-white rounded-lg p-3 mx-2 mb-2"
      >
        <div class="flex flex-col">
          <div class="flex flex-row items-center justify-between">
            <img
              class="mr-3 dark:invert"
              width="32"
              height="32"
              src="../assets/lightning-charge-fill.svg"
            />
            <span class="font-bold">Electric Size</span>
            <div class="w-12"></div>
          </div>
          <span class="text-3xl self-center"
            ><span id="detail-size">{{ getData().electric.size }}</span
            ><span class="text-xs">kwh</span></span
          >
          <div class="mb-3 mt-14 flex flex-row items-center justify-between">
            <span class="font-medium">before</span>
            <span
              ><span id="detail-before">{{
                getData().electric.sizeBefore
              }}</span
              ><span class="text-xs">kwh</span></span
            >
          </div>
          <hr />
          <div class="mt-3 flex flex-row items-center justify-between">
            <span class="font-medium">after</span>
            <span
              ><span id="detail-after">{{ getData().electric.sizeAfter }}</span
              ><span class="text-xs">kwh</span></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
