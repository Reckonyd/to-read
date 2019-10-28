<template>
  <button
    class="absolute px-2 py-1 bg-orange-600 hover:bg-orange-500 outline-none text-md focus:shadow-outline shadow rounded-tl"
    @click="onSelect()"
  >
    <font-awesome-icon :icon="[selected ? 'fas' : 'far', 'square']" />
  </button>
</template>

<script>
export default {
  props: {
    selected: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  methods: {
    onSelect() {
      const selection = this.selected ? false : true
      this.$emit('select', selection)
    },
  },
}
</script>

<style></style>
