<template>
  <div>
    <h2>{{author}}</h2>
    <img :src=url alt="Test Image">
    <p>Test</p>
  </div>
</template>

<script>
export default {
  name: 'trlistitem',
  props: ['author','url']
}
</script>

<style lang="scss" scoped>
  h2 {
    text-align: center;
    margin-bottom: 0.5em;
  }

  img {
    max-width: 100%;
    height: 350px;
    box-shadow: 4px 2px 8px #151515;
    border-radius: 5px;
  }

  p{
    margin-top: 0.7em;
  }
</style>