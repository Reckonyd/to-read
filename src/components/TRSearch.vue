<template>
  <div>
    <form @submit.prevent>
      <label for="search">Search</label>
      <input type="text" id="search" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'trsearch',
  data() {
    return {
      search: '',
      searching: false,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>