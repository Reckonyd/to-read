<template>
  <Header></Header>
</template>

<script>
import Header from './Header.vue'
export default {
  name: 'app',
  data() {
    return {test: 'Thanos'}
  },
  components: {
    Header,
    
  }
}
</script>

<style lang="scss">
  $main-background: #f9f9f9;

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  body {
    background-color: $main-background;
    height: 100vh;
    margin: 0 auto;
  }
</style>