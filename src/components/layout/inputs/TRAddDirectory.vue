<template>
  <div
    class="w-full mx-auto flex flex-col md:flex-row items-center justify-center"
  >
    <input
      v-model="dirName"
      type="text"
      aria-label="Enter a Folder name"
      placeholder="Enter a Folder Name"
      class="w-full md:w-3/4 md:mr-2 mb-2"
    />

    <button
      :class="['btn md:w-1/4', { 'text-green-500': dirName }]"
      @click="onCreateDir"
      @keypress.enter="onCreateDir"
    >
      {{ dirName ? 'Add Folder' : 'Create Folder' }}
    </button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'TRAddDirectory',
    data() {
      return {
        dirName: '',
      }
    },
    methods: {
      ...mapActions(['addDirectory']),
      onCreateDir() {
        if (this.dirName) {
          this.addDirectory(this.dirName)
          this.dirName = ''
        }
      },
    },
  }
</script>
