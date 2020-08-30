<template>
  <header class="mt-32 mb-24 flex flex-col justify-center items-center">
    <input
      v-show="false"
      ref="fileInput"
      type="file"
      accept=".json"
      @change="onImport"
    />

    <h1 class="text-6xl font-semibold font-mono text-themeFontColor">ToRead</h1>

    <div>
      <button
        data-test="import"
        aria-label="Import ToRead Items"
        class="btn btn-action text-lg"
        @click="fileInput.click()"
      >
        Import
      </button>

      <button
        data-test="export"
        aria-label="Export ToRead Items"
        class="btn btn-action text-lg"
        @click="exportBackup"
      >
        Export
      </button>
    </div>
  </header>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useStore } from 'vuex'

  import { State } from '../../store/types'

  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
  }

  export default defineComponent({
    name: 'TRHeader',
    setup() {
      const { dispatch } = useStore<State>()

      const fileInput = ref<HTMLInputElement>()

      // Create a new file reader and read the imported file's data.
      const onImport = (ev: HTMLInputEvent) => {
        const reader = new FileReader()

        // On success call the import function.
        reader.onload = function (ev) {
          dispatch('import', ev.target?.result)
        }
        // Read file data in text format.
        if (ev.target.files !== null) reader.readAsText(ev.target?.files[0])

        // Reset the input value so it can accept the same file from the user.
        if (fileInput.value) fileInput.value.value = ''
      }

      return {
        fileInput,
        onImport,
        exportBackup: () => dispatch('export'),
      }
    },
  })
</script>
