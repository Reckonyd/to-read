<template>
  <button aria-label="Select Item" @click="$emit('select', !selected)">
    <SvgIcon :icon-name="selected ? 'minus-square' : 'square'" />
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import SvgIcon from '@/components/SvgIcon.vue'

  export default defineComponent({
    name: 'TRSelect',
    components: {
      SvgIcon,
    },
    props: {
      selected: {
        type: Boolean,
        required: true,
      },
    },
    emits: ['select'],
  })
</script>
