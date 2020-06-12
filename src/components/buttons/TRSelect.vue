<template>
  <button aria-label="Select Item" @click="$emit('select', !selected)">
    <SvgIconHelper
      :icon-id="selected ? minusSquareIcon.id : squareIcon.id"
      :icon-view-box="selected ? minusSquareIcon.viewBox : squareIcon.viewBox"
    />
  </button>
</template>

<script>
  import squareIcon from '@/assets/svg/square.svg'
  import minusSquareIcon from '@/assets/svg/minus-square.svg'

  import SvgIconHelper from '@/components/helpers/SvgIconHelper'

  export default {
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
    data() {
      return {
        squareIcon,
        minusSquareIcon,
      }
    },
  }
</script>
