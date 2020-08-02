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
      v-for="directory in getters.getDirectories"
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

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useStore } from 'vuex'

  import TRListItem from '@/components/layout/items/TRListItem.vue'
  import TRDirectory from '@/components/layout/items/TRDirectory.vue'

  import { State, ToReadItem, DraggedItemInfo } from '../../store/types'

  export default defineComponent({
    name: 'TRListView',
    components: {
      TRListItem,
      TRDirectory,
    },
    setup() {
      const { dispatch, getters } = useStore<State>()

      const overList = ref(false)

      // Return every item that is on the global directory (-1).
      const noDirList = computed(() =>
        getters.getFilteredToReadList.filter(
          (item: ToReadItem) => item.dirId === -1,
        ),
      )

      const onDragStart = (itemInfo: DraggedItemInfo) => {
        dispatch('changeDraggedItemInfo', itemInfo)
      }

      const onDrop = (itemInfo: DraggedItemInfo) =>
        dispatch('swapItems', itemInfo)

      const onListDrop = () => {
        dispatch('swapDirs', -1)
        dispatch('changeDraggedItemInfo', {})
        overList.value = false
      }

      const onDragEnd = () => {
        dispatch('changeDraggedItemInfo', {})
        overList.value = false
      }

      return {
        overList,
        getters,
        noDirList,
        onDragStart,
        onDrop,
        onListDrop,
        onDragEnd,
      }
    },
  })
</script>
