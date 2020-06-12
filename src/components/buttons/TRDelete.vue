<template>
  <button aria-label="Delete Item" @click="$emit('delete')">
    <SvgIconHelper
      :icon-id="deleteIcon.id"
      :icon-view-box="deleteIcon.viewBox"
    />
  </button>
</template>

<script>
  import SvgIconHelper from '@/components/helpers/SvgIconHelper'

  import deleteIcon from '@/assets/svg/delete.svg'

  export default {
    name: 'TRDelete',
    components: {
      SvgIconHelper,
    },
    data() {
      return {
        deleteIcon,
      }
    },
  }
</script>
