<template>
  <div>
    <TRListItem
      v-for="item in list"
      :key="item.id"
      :to-read-item="item"
      class="flex flex-col lg:w-5/12 bg-gray-700 text-gray-100 my-2 mx-1 sm:mx-2 text-center border-b-8 border-red-700 rounded-t shadow"
    ></TRListItem>
  </div>
</template>

<script>
import TRListItem from './TRListItem.vue'

export default {
  name: 'Trlistview',
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
