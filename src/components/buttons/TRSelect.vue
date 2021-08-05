<template>
  <button aria-label="Select Item" @click="$emit('select', !selected)">
    <SvgIconHelper :icon-name="selected ? 'minus-square' : 'square'" />
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import SvgIconHelper from '@/components/helpers/SvgIconHelper.vue'

  export default defineComponent({
    name: 'TRSelect',
    components: {
      SvgIconHelper,
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
