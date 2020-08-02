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

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import { debounce } from 'lodash'

  import { State } from '../../../store/types'

  export default defineComponent({
    name: 'TRSearch',
    setup() {
      const { dispatch } = useStore<State>()

      const search = ref('')
      const searching = ref(false)

      const debouncedEmit = () => {
        searching.value = false
        dispatch('searchAction', search.value)
      }

      // Using lodash Debounce to limit the calls to searchAction.
      const debounceFunc = debounce(() => debouncedEmit(), 300)

      watch(search, () => {
        searching.value = true
        debounceFunc()
      })

      return {
        search,
        searching,
        debouncedEmit,
      }
    },
  })
</script>
