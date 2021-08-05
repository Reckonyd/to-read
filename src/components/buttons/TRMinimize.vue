<template>
  <button aria-label="Minimize Folder" @click="onMinimize">
    <SvgIconHelper :icon-name="minimized ? 'minimize' : 'maximize'" />
  </button>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

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
        onMinimize,
      }
    },
  })
</script>
