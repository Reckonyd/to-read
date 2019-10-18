<template>
  <button
    class="absolute px-2 py-1 bg-gray-500 hover:bg-gray-900 outline-none font-black text-lg focus:shadow-outline shadow rounded-tl opacity-75"
    @click="onSelect()"
  >
    {{ selected ? '&#x025FC;' : '&#x025FB;' }}
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
