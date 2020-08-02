<template>
  <button aria-label="Minimize Folder" @click="onMinimize">
    <SvgIconHelper
      :icon-id="minimized ? minimizeIcon.id : maximizeIcon.id"
      :icon-view-box="minimized ? minimizeIcon.viewBox : maximizeIcon.viewBox"
    />
  </button>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import minimizeIcon from '@/assets/svg/minimize.svg'
  import maximizeIcon from '@/assets/svg/maximize.svg'

  import SvgIconHelper from '@/components/helpers/SvgIconHelper.vue'

  export default defineComponent({
    name: 'TRMinimize',
    components: {
      SvgIconHelper,
    },
    emits: ['minimize'],
    setup(_, { emit }) {
      const minimized = ref(false)

      const onMinimize = () => {
        minimized.value = !minimized.value
        emit('minimize', minimized.value)
      }

      return {
        minimized,
        minimizeIcon,
        maximizeIcon,
        onMinimize,
      }
    },
  })
</script>
