<script lang="ts">
import { defineComponent } from "vue";
import NoteList from "../components/notes_list.vue";
import NoteDetail from "../components/notes_detail.vue";
import { Notes } from "../models/interface";
// @ts-ignore
import { useMq, MqResponsive } from "vue3-mq";

export default defineComponent({
  components: {
    MqResponsive,
    NoteList,
    NoteDetail,
  },
  props: {
    notepromise: Promise<{ results: Notes[] }>,
  },
  data(): any {
    return {
      notelist: [],
      mq: useMq(),
      detail_id: -1,
      show_detail: false,
    };
  },
  methods: {
    setDetail(id: number) {
      this.show_detail = true;
      this.detail_id = id;
    },
    showDetail(show: boolean) {
      this.show_detail = show;
    },
  },
  async setup(props) {
    if (props.notepromise != null) {
      const { results } = await props.notepromise;
      const notelist = results;

      return { notelist };
    }
  },
});
</script>

<template>
  <div class="p-5 width-screen">
    <div class="max-w-screen-lg mx-auto">
      <h1 class="font-semibold text-4xl text-stone-900 dark:text-white">
        Notes
      </h1>
      <MqResponsive target="md+">
        <div
          style="height: 75vh"
          class="flex max-w-screen-lg mx-auto bg-slate-50 dark:bg-verydarkgray my-5 p-2 rounded-lg drop-shadow-md"
        >
          <NoteList :notelist="notelist" @clicked="setDetail" />
          <NoteDetail :notelist="notelist" :id="detail_id" />
        </div>
      </MqResponsive>
      <MqResponsive target="sm-">
        <div
          style="height: 75vh"
          class="flex max-w-screen-lg mx-auto bg-slate-50 dark:bg-verydarkgray my-5 p-2 rounded-lg drop-shadow-md"
        >
          <NoteList
            v-if="!show_detail"
            :notelist="notelist"
            @clicked="setDetail"
          />
          <NoteDetail
            v-else
            :notelist="notelist"
            :id="detail_id"
            @close="showDetail"
          />
        </div>
      </MqResponsive>
    </div>
  </div>
</template>
