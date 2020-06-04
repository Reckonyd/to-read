<template>
  <button
    class="mx-1 px-3 bg-orange-600 hover:bg-orange-500 text-gray-200 focus:outline-none rounded shadow focus:shadow-outline"
    @click="$emit('import')"
  >
    Import
  </button>
</template>

<script>
export default {
  name: 'TRImport',
}
</script>
