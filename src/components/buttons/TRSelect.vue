<template>
  <button aria-label="Select Item" @click="$emit('select', !selected)">
    <SvgIconHelper
      :icon-id="selected ? minusSquareIcon.id : squareIcon.id"
      :icon-view-box="selected ? minusSquareIcon.viewBox : squareIcon.viewBox"
    />
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import squareIcon from '@/assets/svg/square.svg'
  import minusSquareIcon from '@/assets/svg/minus-square.svg'

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
    setup() {
      return {
        squareIcon,
        minusSquareIcon,
      }
    },
  })
</script>
