<template>
  <main class="main-container">
    <TRInputs />
    <TRListView />
  </main>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { useStore } from 'vuex'

  import TRInputs from '@/components/layout/TRInputs.vue'
  import TRListView from '@/components/layout/TRListView.vue'

  import { State } from '../../store/types'

  export default defineComponent({
    name: 'TRMain',
    components: {
      TRInputs,
      TRListView,
    },
    setup() {
      // On Main mount initialize toReadList and directories arrays.
      onMounted(() => {
        const { dispatch } = useStore<State>()
        dispatch('initLists')
      })

      return {}
    },
  })
</script>

<style lang="postcss" scoped>
  .main-container {
    @apply w-full h-full flex flex-col overflow-x-hidden;
  }
</style>
