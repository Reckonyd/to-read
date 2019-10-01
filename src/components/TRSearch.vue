<template>
  <div>
    <form @submit.prevent>
      <label for="search">Search</label>
      <input id="search" v-model="search" type="text" />
    </form>
    <span>{{ searching }}</span>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'Trsearch',
  data() {
    return {
      search: '',
      searching: '',
    }
  },
  watch: {
    search() {
      this.searching = 'Waiting For You To Stop Typing...'
      this.debounceFunc()
    },
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
}
</script>

<style lang="scss" scoped></style>
