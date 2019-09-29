<template>
  <div>
    <p>{{search}}</p>
    <form @submit.prevent="">
      <label for="search">Search</label>
      <input @input="$emit('searching', search)" type="text" v-model="search" id="search">
    </form>
  </div>
</template>

<script>
export default {
  name: 'trsearch',
  data() {
    return {
      search: ''
    }
  },
  props: [],
}
</script>

<style lang="scss" scoped>

</style>