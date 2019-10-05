<template>
  <div>
    <button
      class="absolute text-center m-3 w-8 h-8 right-0 bg-red-600 rounded-full"
      @click="$emit('delete')"
    >
      &times;
    </button>
  </div>
</template>

<script>
export default {
  name: 'Trdelete',
}
</script>

<style></style>
