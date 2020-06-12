<template>
  <section
    :class="[
      'w-full mx-1 mb-12 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-6',
      overList ? 'border border-themeSecondaryFontColor' : '',
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
    />

    <TRListItem
      v-for="item in noDirList"
      :key="item.id"
      :to-read-item="item"
      @drag-started="onDragStart"
      @dropped="onDrop"
      @drag-ended="onDragEnd"
    />
  </section>
</template>

<script>
  import TRListItem from '@/components/layout/items/TRListItem'
  import TRDirectory from '@/components/layout/items/TRDirectory'
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
