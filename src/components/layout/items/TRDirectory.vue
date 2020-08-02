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

    <h2 class="mx-4 text-gray-200 text-xl">{{ capitalize(dir.name) }}</h2>

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

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useStore } from 'vuex'

  import TRListItem from '@/components/layout/items/TRListItem.vue'
  import TRDelete from '@/components/buttons/TRDelete.vue'
  import TRMinimize from '@/components/buttons/TRMinimize.vue'

  import { State, ToReadItem, DraggedItemInfo } from '../../../store/types'

  export default defineComponent({
    name: 'TRDirectory',
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
    },
    setup(props) {
      const { dispatch, state, getters } = useStore<State>()

      const minimizeDir = ref(false)

      // Return only items that are inside this directory.
      const directoryList = computed(() =>
        getters.getFilteredToReadList.filter(
          (item: ToReadItem) => item.dirId === props.dir.id,
        ),
      )

      // On user search show this directory only if contains the searched item.
      const hasSearchItem = computed(
        () => directoryList.value.length > 0 || state.search === '',
      )

      const capitalize = (value: string) => {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }

      const onDelete = (id: string | number) => dispatch('deleteDirectory', id)

      const onDragStart = (itemInfo: DraggedItemInfo) =>
        dispatch('changeDraggedItemInfo', itemInfo)

      const onDrop = (itemInfo: DraggedItemInfo) =>
        dispatch('swapItems', itemInfo)

      const onDirDrop = () => {
        dispatch('swapDirs', props.dir.id)
        dispatch('changeDraggedItemInfo', {})
      }

      const onDragEnd = () => dispatch('changeDraggedItemInfo', {})

      return {
        minimizeDir,
        directoryList,
        hasSearchItem,
        capitalize,
        onDelete,
        onDragStart,
        onDragEnd,
        onDrop,
        onDirDrop,
      }
    },
  })
</script>
