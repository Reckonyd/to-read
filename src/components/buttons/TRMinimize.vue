<template>
  <button aria-label="Minimize Folder" @click="onMinimize">
    <SvgIcon :icon-name="minimized ? 'minimize' : 'maximize'" />
  </button>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import SvgIcon from '@/components/SvgIcon.vue'

  export default defineComponent({
    name: 'TRMinimize',
    components: {
      SvgIcon,
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
        onMinimize,
      }
    },
  })
</script>
