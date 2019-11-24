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
  components: {
    TRImport,
    TRExport,
  },
  methods: {
    ...mapActions(['import', 'export']),
    onImport(ev) {
      this.import(ev.target.files[0])
      this.$refs.fileInput.value = ''
    },
  },
}
</script>

<style scoped></style>
