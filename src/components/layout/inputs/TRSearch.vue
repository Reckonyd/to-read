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

  import { State } from '../../../store/types'

  export default defineComponent({
    name: 'TRSearch',
    setup() {
      const { dispatch } = useStore<State>()

      const search = ref('')
      const searching = ref(false)

      const debounce = (
        func: (...args: unknown[]) => unknown,
        delay: number,
        { leading }: Record<string, unknown> = {},
      ) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let timerId: any

        return (...args: unknown[]) => {
          if (!timerId && leading) {
            func(...args)
          }
          clearTimeout(timerId)

          timerId = setTimeout(() => func(...args), delay)
        }
      }

      const doSearch = () => {
        searching.value = false
        dispatch('searchAction', search.value)
      }

      watch(search, () => {
        searching.value = true
        debounce(doSearch, 300)
      })

      return {
        search,
        searching,
      }
    },
  })
</script>
