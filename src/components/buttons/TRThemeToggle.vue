<template>
  <button aria-label="Toggle Theme" @click="$emit('toggle-theme')">
    <SvgIconHelper
      :icon-name="enabled ? 'toggle-left' : 'toggle-right'"
      icon-class="w-8 h-8 text-themeFontColor"
    />
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import SvgIconHelper from '@/components/helpers/SvgIconHelper.vue'

  export default defineComponent({
    name: 'TRThemeToggle',
    components: {
      SvgIconHelper,
    },
    props: {
      enabled: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['toggle-theme'],
  })
</script>
