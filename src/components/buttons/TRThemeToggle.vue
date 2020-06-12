<template>
  <button aria-label="Toggle Theme" @click="$emit('toggle-theme')">
    <SvgIconHelper
      :icon-id="enabled ? toggleRightIcon.id : toggleLeftIcon.id"
      :icon-view-box="
        enabled ? toggleRightIcon.viewBox : toggleLeftIcon.viewBox
      "
      icon-class="w-8 h-8 text-themeFontColor"
    />
  </button>
</template>

<script>
  import toggleLeftIcon from '@/assets/svg/toggle-left.svg'
  import toggleRightIcon from '@/assets/svg/toggle-right.svg'

  import SvgIconHelper from '@/components/helpers/SvgIconHelper'

  export default {
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
    data() {
      return {
        toggleLeftIcon,
        toggleRightIcon,
      }
    },
  }
</script>
