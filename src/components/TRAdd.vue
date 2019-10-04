<template>
  <div id="testing">
    <input
      v-model="url"
      type="text"
      placeholder="Enter URL"
      class="flex-grow bg-gray-200 text-center placeholder-gray-600 rounded focus:bg-gray-400 focus:outline-none"
    />
    <button
      class="ml-2 p-2 text-gray-100 rounded bg-red-800"
      @click="addItem(url)"
    >
      Add
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      url: null,
    }
  },
  methods: {
    ...mapActions(['addItem']),
  },
}
</script>

<style></style>
