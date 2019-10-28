<template>
  <div
    v-show="hasSearchItem"
    class="relative w-11/12 mx-auto my-2 p-3 bg-gray-900 rounded-t shadow-md"
    @dragover.prevent
    @drop.prevent="onDirDrop"
  >
    <TRDelete @delete="onDelete(dir.id)"></TRDelete>
    <TRMinimize @minimize="onMinimize()"></TRMinimize>
    <h2 class="mx-4 text-gray-200 text-xl">{{ dir.name | capitalize }}</h2>
    <div :class="[{ hidden: minimized }, 'flex flex-wrap justify-evenly my-2']">
      <TRListItem
        v-for="item in directoryList"
        :key="item.id"
        :to-read-item="item"
        @dragStarted="onDragStart"
        @dropped="onDrop"
        @dragEnded="onDragEnd"
      ></TRListItem>
    </div>
  </div>
</template>

<script>
import TRListItem from './TRListItem'
import TRDelete from '../../buttons/TRDelete'
import TRMinimize from '../../buttons/TRMinimize'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  components: {
    TRListItem,
    TRDelete,
    TRMinimize,
  },
  filters: {
    capitalize: function(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
  },
  props: {
    dir: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      minimized: false,
    }
  },
  computed: {
    ...mapState(['search']),
    ...mapGetters(['getFilteredToReadList']),
    directoryList: function() {
      return this.getFilteredToReadList.filter(
        item => item.dirId === this.dir.id,
      )
    },
    hasSearchItem: function() {
      return this.directoryList.length > 0 || this.search === ''
    },
  },
  methods: {
    ...mapActions([
      'deleteDirectory',
      'swapItems',
      'swapDirs',
      'changeDraggedItemInfo',
    ]),
    onDelete(id) {
      this.deleteDirectory(id)
    },
    onMinimize() {
      this.minimized = this.minimized ? false : true
    },
    onDragStart(itemInfo) {
      this.changeDraggedItemInfo(itemInfo)
    },
    onDrop(itemInfo) {
      this.swapItems(itemInfo)
    },
    onDirDrop() {
      this.swapDirs(this.dir.id)
      this.changeDraggedItemInfo({})
    },
    onDragEnd() {
      this.changeDraggedItemInfo({})
    },
  },
}
</script>

<style></style>
