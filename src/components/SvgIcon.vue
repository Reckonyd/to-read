<template>
  <svg :class="[iconClass, 'fill-current select-none']">
    <use :xlink:href="`spritemap.svg#sprite-${iconName}`" />
  </svg>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'SvgIcon',
    props: {
      iconName: {
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
