<template>
  <div
    class="w-full mx-auto flex flex-col md:flex-row items-center justify-center"
  >
    <input
      v-model="url"
      type="text"
      :aria-label="failStatus || 'e.g. https://www.example.com/'"
      :placeholder="failStatus || 'Enter a valid URL: https://www.example.com/'"
      :class="[
        'w-full md:w-3/4 md:mr-2 mb-2',
        { success: isUrl },
        { error: (!isUrl && url) || (failStatus && !url) },
      ]"
      @keypress.enter="onAdd"
    />

    <button
      :class="[
        'btn md:w-1/4',
        { success: isUrl },
        { error: (!isUrl && url) || (failStatus && !url) },
        { waiting },
      ]"
      @click="onAdd"
    >
      {{ waiting ? 'Fetching...' : 'Add Item' }}
    </button>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'TRAddItem',
    data() {
      return {
        url: '',
      }
    },
    computed: {
      ...mapState(['waiting', 'failStatus']),
      isUrl: function () {
        const urlMatch =
          this.url.match(
            /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g,
          ) || []

        return urlMatch.length > 0
      },
    },
    methods: {
      ...mapActions(['addItem']),
      onAdd() {
        if (this.isUrl) {
          this.addItem(this.url)
          this.url = ''
        }
      },
    },
  }
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
