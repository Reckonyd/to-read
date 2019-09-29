<template>
  <div class="header">
    <h1>Welcome To ToRead!</h1>
  </div>
</template>

<script>
export default {
  name: 'toreadheader'
}
</script>

<style lang="scss" scoped>
  $header-bg-color: #d35656;
  $header-txt-color: #242424;

  .header {
    color: $header-txt-color;
    background-color: $header-bg-color;
    text-align: center;
    padding: 1.5rem;
  }
</style>