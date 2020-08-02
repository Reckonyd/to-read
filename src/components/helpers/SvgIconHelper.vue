<template>
  <svg
    :class="[iconClass, 'fill-current select-none']"
    :viewBox="`${iconViewBox}`"
  >
    <use :xlink:href="`#${iconId}`" />
  </svg>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'SvgIconHelper',
    props: {
      iconId: {
        type: String,
        required: true,
      },
      iconViewBox: {
        type: String,
        required: true,
      },
      iconClass: {
        type: [String, Array],
        default: 'w-5 h-5',
      },
    },
  })
</script>
