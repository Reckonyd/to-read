<template>
  <div>
    <TRHeader></TRHeader>
    <TRMain></TRMain>
  </div>
</template>

<script>
import TRHeader from './TRHeader.vue'
import TRMain from './TRMain.vue'

export default {
  name: 'app',
  components: {
    TRHeader,
    TRMain    
  }
}
</script>

<style lang="scss">
  $global-background: #f9f9f9;

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  body {
    background-color: $global-background;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    font-family: Arial, Helvetica, sans-serif
  }
</style>