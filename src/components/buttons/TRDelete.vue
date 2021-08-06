<template>
  <button aria-label="Delete Item" @click="$emit('delete')">
    <SvgIcon icon-name="delete" />
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import SvgIcon from '@/components/SvgIcon.vue'

  export default defineComponent({
    name: 'TRDelete',
    components: {
      SvgIcon,
    },
    emits: ['delete'],
  })
</script>
