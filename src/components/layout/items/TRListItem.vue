<template>
  <div
    class="relative flex flex-col lg:w-5/12 bg-gray-700 text-gray-100 my-2 mx-1 sm:mx-2 text-center border-b-8 border-red-700 rounded-t shadow"
  >
    <TRDelete @delete="deleteItem(toReadItem.id)" />
    <a :href="toReadItem.url" target="_blank" rel="noopener noreferrer">
      <img
        :class="[
          toReadItem.encoded ? '' : imageStyle,
          'mx-auto',
          'w-full',
          'rounded-t',
          'shadow-md',
        ]"
        :src="toReadItem.image_url"
        :alt="toReadItem.image_alt || `Image of ${toReadItem.title}`"
      />
    </a>
    <h2 class="my-4 mx-3 font-bold tracking-wider text-xl">
      {{ toReadItem.title }}
    </h2>
    <p class="mb-5 mx-6 text-lg text-left leading-tight">
      {{ toReadItem.description }}
    </p>
  </div>
</template>

<script>
import TRDelete from '../../buttons/TRDelete'
import { mapActions } from 'vuex'

export default {
  components: {
    TRDelete,
  },
  props: {
    toReadItem: {
      type: Object,
      required: true,
    },
  },
  data: function() {
    return {
      imageStyle: ['object-contain', 'h-64'],
    }
  },
  methods: {
    ...mapActions(['deleteItem']),
  },
}
</script>

<style scoped></style>