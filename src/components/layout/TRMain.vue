<template>
  <main class="main-container">
    <TRInputs />
    <TRListView />
  </main>
</template>

<script>
  import TRInputs from '@/components/layout/TRInputs'
  import TRListView from '@/components/layout/TRListView'

  import { mapActions } from 'vuex'

  export default {
    name: 'TRMain',
    components: {
      TRInputs,
      TRListView,
    },
    mounted() {
      // On Main mount initialize toReadList and directories arrays.
      this.initLists()
    },
    methods: {
      ...mapActions(['initLists']),
    },
  }
</script>

<style lang="postcss" scoped>
  .main-container {
    @apply w-full h-full flex flex-col overflow-x-hidden;
  }
</style>
