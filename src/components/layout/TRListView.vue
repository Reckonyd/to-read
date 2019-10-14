<template>
  <div class="flex flex-col flex-wrap justify-evenly lg:flex-row mx-1 mt-4">
    <TRListItem
      v-for="item in list"
      :key="item.id"
      :to-read-item="item"
    ></TRListItem>
  </div>
</template>

<script>
import TRListItem from './items/TRListItem'

export default {
  components: {
    TRListItem,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped></style>
