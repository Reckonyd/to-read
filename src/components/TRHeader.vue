<template>
  <div class="header">
    <h1>ToRead</h1>
  </div>
</template>

<script>
export default {
  name: 'trheader'
}
</script>

<style lang="scss" scoped>
  $header-bg-color: #f66767;
  $header-txt-color: #363636;

  .header {
    color: $header-txt-color;
    background-color: $header-bg-color;
    text-align: center;
    padding: 1.5rem;
  }
</style>