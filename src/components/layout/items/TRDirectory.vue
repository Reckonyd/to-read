<template>
  <div
    class="relative flex flex-wrap justify-evenly w-full my-2 p-2 bg-indigo-800 rounded shadow-2xl"
  >
    <TRDelete @delete="onDelete(dir.id)"></TRDelete>
    <TRMinimize @minimize="onMinimize()"></TRMinimize>
    <h2 class="w-full ml-3 mt-3 text-gray-200 text-xl">{{ dir.name }}</h2>
    <div :class="[{ hidden: minimized }, 'flex flex-wrap justify-evenly my-2']">
      <TRListItem
        v-for="item in directoryList"
        :key="item.id"
        :to-read-item="item"
      ></TRListItem>
    </div>
  </div>
</template>

<script>
import TRListItem from './TRListItem'
import TRDelete from '../../buttons/TRDelete'
import TRMinimize from '../../buttons/TRMinimize'
import { mapActions } from 'vuex'

export default {
  components: {
    TRListItem,
    TRDelete,
    TRMinimize,
  },
  props: {
    dir: {
      type: Object,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      minimized: false,
    }
  },
  computed: {
    directoryList: function() {
      return this.list.filter(item => item.dirId === this.dir.id)
    },
  },
  methods: {
    ...mapActions(['deleteDirectory']),
    onDelete(id) {
      this.deleteDirectory(id)
    },
    onMinimize() {
      this.minimized = this.minimized ? false : true
    },
  },
}
</script>

<style></style>
