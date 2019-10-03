<template>
  <div>
    <h2>{{ title }}</h2>
    <a :href="url" target="_blank" rel="noopener noreferrer">
      <img :src="image" alt="Test Image" />
    </a>
    <p>{{ description }}</p>
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

<style lang="scss" scoped>
h2 {
  text-align: center;
  margin-bottom: 0.5em;
}

img {
  max-width: 100%;
  box-shadow: 4px 2px 8px #151515;
  border-radius: 5px;
}

p {
  margin-top: 0.7em;
}
</style>
