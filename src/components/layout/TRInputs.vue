<template>
  <section class="w-3/4 md:w-2/5 mx-auto mb-12 space-y-4">
    <TRSearch />

    <TRAddItem />

    <TRAddDirectory />

    <TRActions />
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import TRSearch from '@/components/layout/inputs/TRSearch.vue'
  import TRAddItem from '@/components/layout/inputs/TRAddItem.vue'
  import TRAddDirectory from '@/components/layout/inputs/TRAddDirectory.vue'
  import TRActions from '@/components/layout/inputs/TRActions.vue'

  export default defineComponent({
    name: 'TRInputs',
    components: {
      TRSearch,
      TRAddItem,
      TRAddDirectory,
      TRActions,
    },
  })
</script>
