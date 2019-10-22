<template>
  <div
    :class="[
      'flex flex-col flex-wrap justify-evenly lg:flex-row mx-1 mt-4',
      overList ? 'bg-gray-600' : '',
    ]"
    @dragenter.self="overList = true"
    @dragover.prevent
    @dragleave.self="overList = false"
    @drop.self.prevent="onListDrop"
  >
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
      @dragStarted="onDragStart"
      @dropped="onDrop"
      @dragEnded="onDragEnd"
    >
    </TRListItem>
  </div>
</template>

<script>
import TRListItem from './items/TRListItem'
import TRDirectory from './items/TRDirectory'
import { mapState, mapActions } from 'vuex'

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
  data() {
    return {
      overList: false,
    }
  },
  computed: {
    ...mapState(['directories']),
    noDirList: function() {
      return this.list.filter(item => item.dirId === -1)
    },
  },
  methods: {
    ...mapActions(['swapItems', 'swapDirs', 'changeDraggedItemInfo']),
    onDragStart(itemInfo) {
      this.changeDraggedItemInfo(itemInfo)
    },
    onDrop(itemInfo) {
      this.swapItems(itemInfo)
    },
    onListDrop() {
      this.swapDirs(-1)
      this.changeDraggedItemInfo({})
      this.overList = false
    },
    onDragEnd() {
      this.changeDraggedItemInfo({})
      this.overList = false
    },
  },
}
</script>

<style scoped></style>
