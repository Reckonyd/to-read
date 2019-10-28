<template>
  <button
    class="absolute top-0 right-0 h-8 w-8 btn text-xl rounded-tr shadow"
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
