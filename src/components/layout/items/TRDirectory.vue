<template>
  <div
    v-show="hasSearchItem"
    class="relative col-span-1 md:col-span-2 lg:col-span-3 w-11/12 mx-auto p-3 bg-directory rounded-t shadow-md"
    @dragover.prevent
    @drop.prevent="onDirDrop"
  >
    <TRDelete
      class="absolute right-0 mr-2 mt-2 text-light"
      @delete="onDelete(dir.id)"
    />

    <TRMinimize
      class="absolute right-0 mr-10 mt-2 text-light"
      @minimize="minimizeDir = $event"
    />

    <h2 class="mx-4 text-gray-200 text-xl">{{ dir.name | capitalize }}</h2>

    <div
      :class="[{ hidden: minimizeDir }, 'flex flex-wrap justify-evenly my-2']"
    >
      <TRListItem
        v-for="item in directoryList"
        :key="item.id"
        :to-read-item="item"
        @drag-started="onDragStart"
        @dropped="onDrop"
        @drag-ended="onDragEnd"
      />
    </div>
  </div>
</template>

<script>
  import TRListItem from '@/components/layout/items/TRListItem'
  import TRDelete from '@/components/buttons/TRDelete'
  import TRMinimize from '@/components/buttons/TRMinimize'
  import { mapActions, mapGetters, mapState } from 'vuex'

  export default {
    name: 'TRDirectory',
    components: {
      TRListItem,
      TRDelete,
      TRMinimize,
    },
    filters: {
      capitalize: function (value) {
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
        minimizeDir: false,
      }
    },
    computed: {
      ...mapState(['search']),
      ...mapGetters(['getFilteredToReadList']),

      // Return only items that are inside this directory.
      directoryList: function () {
        return this.getFilteredToReadList.filter(
          item => item.dirId === this.dir.id,
        )
      },

      // On user search show this directory only if contains the searched item.
      hasSearchItem: function () {
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
