<template>
  <button aria-label="Delete Item" @click="$emit('delete')">
    <SvgIconHelper
      :icon-id="deleteIcon.id"
      :icon-view-box="deleteIcon.viewBox"
    />
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import deleteIcon from '@/assets/svg/delete.svg'

  import SvgIconHelper from '@/components/helpers/SvgIconHelper.vue'

  export default defineComponent({
    name: 'TRDelete',
    components: {
      SvgIconHelper,
    },
    emits: ['delete'],
    setup() {
      return {
        deleteIcon,
      }
    },
  })
</script>
