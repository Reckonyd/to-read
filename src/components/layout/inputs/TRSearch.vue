<template>
  <div class="w-full mx-auto">
    <input
      id="search"
      v-model="search"
      class="w-full mb-2"
      type="text"
      aria-label="Search Read Items"
      placeholder="Search"
      @submit.prevent
    />

    <span class="text-sm text-themeSecondaryFontColor">
      {{ searching ? 'Waiting For You To Stop Typing...' : '' }}
    </span>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce'
  import { mapActions } from 'vuex'

  export default {
    name: 'TRSearch',
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
      debouncedEmit: function () {
        this.searching = false
        this.searchAction(this.search)
      },

      // Using lodash Debounce to limit the calls to searchAction.
      debounceFunc: debounce(function () {
        this.debouncedEmit()
      }, 300),
    },
  }
</script>
