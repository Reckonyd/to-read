<template>
  <div id="testing">
    <label for="url">Enter Url</label>
    <input v-model="url" type="text" />
    <button @click="addItem(url)">Add</button>
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
