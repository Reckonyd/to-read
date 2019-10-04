<template>
  <div>
    <input
      id="search"
      v-model="search"
      class="w-full mx-auto p-2 bg-gray-200 text-center placeholder-gray-600 rounded focus:bg-gray-400 focus:outline-none"
      type="text"
      placeholder="Search"
      @submit.prevent
    />
    <span class="text-gray-100">{{ searching }}</span>
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

<style scoped></style>
