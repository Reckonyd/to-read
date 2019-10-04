<template>
  <div>
    <TRHeader
      class="p-5 bg-red-800 font-serif font-semibold text-3xl text-center text-white shadow"
    ></TRHeader>
    <TRMain class="container mx-auto"></TRMain>
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
@tailwind base;

@tailwind components;

@tailwind utilities;

body {
  @apply bg-gray-800;
}
</style>
