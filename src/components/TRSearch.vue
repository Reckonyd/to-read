<template>
  <div>
    <form @submit.prevent>
      <label for="search">Search</label>
      <input v-model="search" type="text" id="search" />
    </form>
    <span>{{searching}}</span>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'trsearch',
  data() {
    return {
      search: '',
      searching: '',
    }
  },
  methods: {
    debouncedEmit: function() {
      this.$emit('emitSearch', this.search)
      this.searching = ''
    },
    debounceFunc: debounce(function() {
      this.debouncedEmit()
    }, 300),
  },
  watch: {
    search() {
      this.searching = 'Waiting For You To Stop Typing...'
      this.debounceFunc()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>