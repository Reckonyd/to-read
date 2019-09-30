<template>
  <div>
    <form @submit.prevent>
      <label for="search">Search</label>
      <input @input="debouncedSearch()" type="text" v-model="search" id="search" />
    </form>
    <span>{{searching ? 'Waiting for your to stop' : ''}}</span>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'trsearch',
  data() {
    return {
      search: '',
      searching: false,
    }
  },
  watch: {
    search: function() {
      this.searching = true
      this.debouncedSearch()
    },
  },
  methods: {
    debouncedSearch: debounce(function() {
      this.searching = false
      this.$emit('searching', this.search)
    }, 500),
  },
  props: [],
}
</script>

<style lang="scss" scoped>
</style>