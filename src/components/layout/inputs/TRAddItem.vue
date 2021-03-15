<template>
  <div
    class="flex flex-col items-center justify-center w-full mx-auto md:flex-row"
  >
    <input
      v-model="url"
      type="text"
      :aria-label="state.failStatus || 'e.g. https://www.example.com/'"
      :placeholder="
        state.failStatus || 'Enter a valid URL: https://www.example.com/'
      "
      :class="[
        'w-full md:w-3/4 md:mr-2 mb-2',
        { success: isUrl },
        { error: (!isUrl && url) || (state.failStatus && !url) },
      ]"
      @keypress.enter="onAdd"
    />

    <button
      :class="[
        'btn md:w-1/4',
        { success: isUrl },
        { error: (!isUrl && url) || (state.failStatus && !url) },
        { waiting: state.waiting },
      ]"
      @click="onAdd"
    >
      {{ state.waiting ? 'Fetching...' : 'Add Item' }}
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useStore } from 'vuex'

  import { State } from '../../../store/types'

  export default defineComponent({
    name: 'TRAddItem',
    setup() {
      const { dispatch, state } = useStore<State>()

      const url = ref('')

      const isUrl = computed(() => {
        const urlMatch =
          url.value.match(
            /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g,
          ) || []

        return urlMatch.length > 0
      })

      const onAdd = () => {
        if (isUrl.value) {
          dispatch('addItem', url.value)
          url.value = ''
        }
      }

      return {
        state,
        url,
        isUrl,
        onAdd,
      }
    },
  })
</script>

<style lang="postcss" scoped>
  .success {
    @apply text-green-500 border-green-500;
  }

  .error {
    @apply text-red-500 border-red-500;

    &::placeholder {
      @apply text-red-500;
    }
  }

  .waiting {
    animation: waiting 3s infinite;
  }

  @keyframes waiting {
    0% {
      @apply opacity-0;
    }

    50% {
      @apply opacity-100;
    }

    100% {
      @apply opacity-0;
    }
  }
</style>
