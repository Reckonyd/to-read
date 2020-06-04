<template>
  <div class="flex justify-between w-full p-5 bg-red-800 shadow">
    <input
      v-show="false"
      ref="fileInput"
      type="file"
      accept=".json"
      @change="onImport"
    />
    <TRImport @import="$refs.fileInput.click()" />
    <h1 class="font-serif font-semibold text-3xl text-center text-white">
      ToRead
    </h1>
    <TRExport @export="this.export" />
  </div>
</template>

<script>
import TRImport from '../buttons/TRImport'
import TRExport from '../buttons/TRExport'
import { mapActions } from 'vuex'

export default {
  name: 'TRHeader',
  components: {
    TRImport,
    TRExport,
  },
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
