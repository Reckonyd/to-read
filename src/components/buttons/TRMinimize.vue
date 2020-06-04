<template>
  <button
    class="absolute top-0 right-0 mr-10 px-3 py-1 btn text-md shadow"
    aria-label="Minimize Folder"
    @click="$emit('minimize')"
  >
    &#x0005F;
  </button>
</template>

<script>
export default {
  name: 'TRMinimize',
}
</script>
