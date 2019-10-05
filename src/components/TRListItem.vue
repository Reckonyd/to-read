<template>
  <div>
    <TRDelete class="relative" @delete="deleteItem(id)" />
    <h2 class="my-5 font-semibold text-2xl">{{ title }}</h2>
    <a :href="url" target="_blank" rel="noopener noreferrer">
      <img
        class="mx-auto rounded shadow-md max-w-4xl"
        :src="image"
        alt="Test Image"
      />
    </a>
    <p class="my-5 mx-5 text-lg">{{ description }}</p>
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
