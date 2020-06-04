<template>
  <div
    :class="[
      selectedItems.length > 0 ? '' : 'hidden',
      'sticky top-0 z-10 flex justify-between lg:w-3/12 mx-auto bg-red-700 text-gray-200 shadow-md',
    ]"
  >
    <h3 class="p-2 text-center bg-orange-600">Actions</h3>
    <div class="relative flex-grow hover:bg-red-800 cursor-pointer">
      <div class="p-2 text-center" @click="showDirs = showDirs ? false : true">
        Move To Folder
      </div>
      <ul
        :class="[
          showDirs ? '' : 'hidden',
          'absolute w-full h-24 bg-orange-600 text-center overflow-auto',
        ]"
      >
        <li
          class="bg-orange-500 hover:bg-orange-700 cursor-pointer"
          @click="onMoveToFolder(-1)"
        >
          No Folder
        </li>
        <li
          v-for="directory in directories"
          :key="directory.id"
          class="odd:bg-orange-500 hover:bg-orange-700 cursor-pointer"
          @click="onMoveToFolder(directory.id)"
        >
          {{ directory.name }}
        </li>
      </ul>
    </div>
    <div
      class="flex-grow p-2 bg-red-600 hover:bg-red-800 text-center cursor-pointer"
      @click="onDelete()"
    >
      Delete
    </div>
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
    ...mapActions(['moveItemsToDirectory', 'deleteSelected']),
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
