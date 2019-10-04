<template>
  <div>
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
export default {
  name: 'Trlistitem',
  props: {
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
      default: 'placeholder',
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped></style>
