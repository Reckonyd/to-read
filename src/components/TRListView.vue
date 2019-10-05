<template>
  <div>
    <TRListItem
      v-for="item in list"
      :id="item.id"
      :key="item.id"
      :url="item.url"
      :title="item.title"
      :description="item.description"
      :image="item.image_url"
      class="flex flex-col bg-gray-700 text-gray-100 my-3 text-center border-b-8 border-red-700 rounded shadow"
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
