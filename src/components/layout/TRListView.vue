<template>
  <div
    :class="[
      'flex flex-col md:flex-row md:flex-wrap md:justify-evenly',
      overList ? 'bg-gray-600' : '',
    ]"
    @dragenter.self="overList = true"
    @dragover.prevent
    @dragleave.self="overList = false"
    @drop.self.prevent="onListDrop"
  >
    <TRDirectory
      v-for="directory in getDirectories"
      :key="directory.id"
      :dir="directory"
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TRListView',
  components: {
    TRListItem,
    TRDirectory,
  },
  data() {
    return {
      overList: false,
    }
  },
  computed: {
    ...mapGetters(['getFilteredToReadList', 'getDirectories']),

    // Return every item that is on the global directory (-1).
    noDirList: function () {
      return this.getFilteredToReadList.filter(item => item.dirId === -1)
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
