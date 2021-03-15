<template>
  <div
    class="flex flex-col items-center justify-center w-full mx-auto md:flex-row"
  >
    <input
      v-model="dirName"
      type="text"
      aria-label="Enter a Folder name"
      placeholder="Enter a Folder Name"
      class="w-full mb-2 md:w-3/4 md:mr-2"
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

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useStore } from 'vuex'

  import { State } from '../../../store/types'

  export default defineComponent({
    name: 'TRAddDirectory',
    setup() {
      const { dispatch } = useStore<State>()

      const dirName = ref('')

      const onCreateDir = () => {
        if (dirName.value) {
          dispatch('addDirectory', dirName.value)
          dirName.value = ''
        }
      }

      return {
        dirName,
        onCreateDir,
      }
    },
  })
</script>
