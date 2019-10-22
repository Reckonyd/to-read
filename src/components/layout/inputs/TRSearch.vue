<template>
  <div class="md:w-4/5 mx-2 md:mx-auto my-2">
    <input
      id="search"
      v-model="search"
      class="w-full p-1 inputArea rounded shadow"
      type="text"
      aria-label="Search Read Items"
      placeholder="Search"
      @submit.prevent
    />
    <span class="text-gray-100">{{
      searching ? 'Waiting For You To Stop Typing...' : ''
    }}</span>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      search: '',
      searching: false,
    }
  },
  watch: {
    search() {
      this.searching = true
      this.debounceFunc()
    },
  },
  methods: {
    ...mapActions(['searchAction']),
    debouncedEmit: function() {
      this.searching = false
      this.searchAction(this.search)
    },
    debounceFunc: debounce(function() {
      this.debouncedEmit()
    }, 300),
  },
}
</script>

<style scoped></style>
