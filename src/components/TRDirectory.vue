<template>
  <div
    class="flex flex-wrap justify-evenly w-full my-2 p-2 bg-indigo-800 rounded shadow-2xl"
  >
    <h2 class="w-full ml-3 mt-3 text-gray-200 text-xl">{{ dir.name }}</h2>
    <TRListItem
      v-for="item in directoryList"
      :key="item.id"
      :to-read-item="item"
    ></TRListItem>
  </div>
</template>

<script>
import TRListItem from './TRListItem'

export default {
  components: {
    TRListItem,
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
  computed: {
    directoryList: function() {
      return this.list.filter(item => this.dir.itemList.includes(item.id))
    },
  },
}
</script>

<style></style>
