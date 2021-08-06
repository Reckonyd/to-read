<template>
  <button aria-label="Toggle Theme" @click="$emit('toggle-theme')">
    <SvgIcon
      :icon-name="enabled ? 'toggle-left' : 'toggle-right'"
      icon-class="w-8 h-8 text-themeFontColor"
    />
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import SvgIcon from '@/components/SvgIcon.vue'

  export default defineComponent({
    name: 'TRThemeToggle',
    components: {
      SvgIcon,
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
