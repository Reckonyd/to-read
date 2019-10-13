<template>
  <div class="flex flex-col flex-wrap justify-evenly lg:flex-row mx-1 mt-4">
    <TRDirectory
      v-for="directory in directories"
      :key="directory.id"
      :dir="directory"
      :list="list"
    ></TRDirectory>
    <TRListItem
      v-for="item in noDirList"
      :key="item.id"
      :to-read-item="item"
    ></TRListItem>
  </div>
</template>

<script>
import TRListItem from './TRListItem.vue'
import TRDirectory from './TRDirectory.vue'
import { mapState } from 'vuex'

export default {
  components: {
    TRListItem,
    TRDirectory,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState(['directories']),
    noDirList: function() {
      let dirItemList = []

      this.directories.forEach(dir => {
        dir.itemList.forEach(item => dirItemList.push(item))
      })

      return this.list.filter(item => !dirItemList.includes(item.id))
    },
  },
}
</script>

<style scoped></style>
