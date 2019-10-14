<template>
  <div>
    <TRHeader></TRHeader>
    <TRMain></TRMain>
  </div>
</template>

<script>
import TRHeader from './layout/TRHeader'
import TRMain from './layout/TRMain'

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
