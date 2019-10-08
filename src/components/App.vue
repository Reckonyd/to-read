<template>
  <div>
    <TRHeader></TRHeader>
    <TRMain></TRMain>
  </div>
</template>

<script>
import TRHeader from './TRHeader.vue'
import TRMain from './TRMain.vue'

export default {
  name: 'App',
  components: {
    TRHeader,
    TRMain,
  },
}
</script>

<style>
body {
  @apply bg-gray-800;
}
</style>
