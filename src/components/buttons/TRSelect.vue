<template>
  <button
    class="absolute px-2 py-1 bg-orange-600 hover:bg-orange-500 outline-none text-md focus:shadow-outline shadow rounded-tl"
    aria-label="Select Item"
    @click="onSelect()"
  >
    <font-awesome-icon :icon="[selected ? 'fas' : 'far', 'square']" />
  </button>
</template>

<script>
export default {
  name: 'TRSelect',
  props: {
    selected: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  methods: {
    // Change selected state and emit that value.
    onSelect() {
      const selection = this.selected ? false : true
      this.$emit('select', selection)
    },
  },
}
</script>
