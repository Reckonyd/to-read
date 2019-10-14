<template functional>
  <button
    class="absolute top-0 right-0 h-8 w-8 btn rounded-tr shadow opacity-75"
    aria-label="Delete Item"
    @click="$emit('delete')"
  >
    &times;
  </button>
</template>

<script>
export default {}
</script>

<style scoped></style>
