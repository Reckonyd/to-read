<template>
  <button aria-label="Delete Item" @click="$emit('delete')">
    <SvgIconHelper icon-name="delete" />
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import SvgIconHelper from '@/components/helpers/SvgIconHelper.vue'

  export default defineComponent({
    name: 'TRDelete',
    components: {
      SvgIconHelper,
    },
    emits: ['delete'],
  })
</script>
