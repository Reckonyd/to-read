<template>
  <header class="mt-32 mb-24 flex flex-col justify-center items-center">
    <input
      v-show="false"
      ref="fileInput"
      type="file"
      accept=".json"
      @change="onImport"
    />

    <h1 class="text-6xl font-semibold font-mono text-themeFontColor">
      ToRead
    </h1>

    <div>
      <button
        aria-label="Import ToRead Items"
        class="btn btn-action text-lg"
        @click="$refs.fileInput.click()"
      >
        Import
      </button>

      <button
        aria-label="Export ToRead Items"
        class="btn btn-action text-lg"
        @click="this.export"
      >
        Export
      </button>
    </div>
  </header>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'TRHeader',
    methods: {
      ...mapActions(['import', 'export']),

      // Create a new file reader and read the imported file's data.
      onImport(ev) {
        // Self is used to capture the Vue environment instead of the window environment.
        var self = this
        const reader = new FileReader()

        // On success call the import function.
        reader.onload = function (ev) {
          self.import(ev.target.result)
        }
        // Read file data in text format.
        reader.readAsText(ev.target.files[0])

        // Reset the input value so it can accept the same file from the user.
        this.$refs.fileInput.value = ''
      },
    },
  }
</script>
