<template>
  <div
    :class="[
      selectedItems.length > 0 ? 'flex' : 'hidden',
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
          v-for="directory in directories"
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

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'TRActions',
    data() {
      return {
        showDirs: false,
      }
    },
    computed: {
      ...mapState(['selectedItems', 'directories']),
    },
    methods: {
      ...mapActions([
        'moveItemsToDirectory',
        'deleteSelected',
        'clearSelected',
      ]),
      onMoveToFolder(dirId) {
        this.moveItemsToDirectory(dirId)
        this.showDirs = false
      },
      onDelete() {
        this.deleteSelected()
      },
    },
  }
</script>
