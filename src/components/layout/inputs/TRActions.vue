<template>
  <div
    :class="[
      state.selectedItems.length > 0 ? 'flex' : 'hidden',
      'w-full md:w-3/5 mx-auto justify-evenly items-center bg-gray-400 bg-opacity-25 border border-directory',
    ]"
  >
    <div class="relative">
      <button class="btn" @click="showDirs = showDirs ? false : true">
        Move To Folder
      </button>

      <ul
        :class="[
          showDirs ? 'absolute right-0 left-0' : 'hidden',
          'z-50 flex flex-col items-center bg-gray-400 bg-opacity-25 border-r border-l border-b border-directory select-none cursor-pointer',
        ]"
      >
        <li class="" @click="onMoveToFolder(-1)">
          No Folder
        </li>

        <li
          v-for="directory in state.directories"
          :key="directory.id"
          class=""
          @click="onMoveToFolder(directory.id)"
        >
          {{ directory.name }}
        </li>
      </ul>
    </div>

    <button aria-label="Delete Item Action" class="btn" @click="onDelete()">
      Delete
    </button>

    <button
      aria-label="Clear Selected Items"
      class="btn"
      @click="clearSelected"
    >
      Clear
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useStore } from 'vuex'

  import { State } from '../../../store/types'

  export default defineComponent({
    name: 'TRActions',
    setup() {
      const { dispatch, state } = useStore<State>()
      const showDirs = ref(false)

      const onMoveToFolder = (dirId: string | number) => {
        dispatch('moveItemsToDirectory', dirId)
        showDirs.value = false
      }

      const onDelete = () => dispatch('deleteSelected')

      return {
        state,
        showDirs,
        clearSelected: () => dispatch('clearSelected'),
        onMoveToFolder,
        onDelete,
      }
    },
  })
</script>
