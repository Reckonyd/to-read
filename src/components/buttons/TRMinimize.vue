<template>
  <button aria-label="Minimize Folder" @click="onMinimize">
    <SvgIconHelper
      :icon-id="minimized ? minimizeIcon.id : maximizeIcon.id"
      :icon-view-box="minimized ? minimizeIcon.viewBox : maximizeIcon.viewBox"
    />
  </button>
</template>

<script>
  import minimizeIcon from '@/assets/svg/minimize.svg'
  import maximizeIcon from '@/assets/svg/maximize.svg'

  import SvgIconHelper from '@/components/helpers/SvgIconHelper'

  export default {
    name: 'TRMinimize',
    components: {
      SvgIconHelper,
    },
    data() {
      return {
        minimized: false,
        minimizeIcon,
        maximizeIcon,
      }
    },
    methods: {
      // Change selected state and emit that value.
      onMinimize() {
        this.minimized = !this.minimized
        this.$emit('minimize', this.minimized)
      },
    },
  }
</script>
