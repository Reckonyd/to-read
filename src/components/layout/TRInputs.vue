<template>
  <section class="w-3/4 md:w-2/5 mx-auto mb-12 space-y-4">
    <TRSearch />

    <TRAddItem />

    <TRAddDirectory />

    <TRActions />
  </section>
</template>

<script>
  import TRSearch from '@/components/layout/inputs/TRSearch'
  import TRAddItem from '@/components/layout/inputs/TRAddItem'
  import TRAddDirectory from '@/components/layout/inputs/TRAddDirectory'
  import TRActions from '@/components/layout/inputs/TRActions'

  export default {
    name: 'TRInputs',
    components: {
      TRSearch,
      TRAddItem,
      TRAddDirectory,
      TRActions,
    },
  }
</script>
