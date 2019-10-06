<template>
  <div>
    <TRDelete class="relative" @delete="deleteItem(id)" />
    <a :href="url" target="_blank" rel="noopener noreferrer">
      <img
        class="mx-auto w-full rounded-t shadow-md"
        :src="image"
        :alt="`Image of ${title}`"
      />
    </a>
    <h2 class="mt-3 font-bold tracking-wider text-2xl">{{ title }}</h2>
    <p class="my-4 mx-5 text-lg">{{ description }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TRDelete from './TRDelete.vue'

export default {
  name: 'Trlistitem',
  components: {
    TRDelete,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions(['deleteItem']),
  },
}
</script>

<style scoped></style>
