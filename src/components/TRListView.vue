<template>
  <div>
    <TRListItem
      v-for="item in list"
      :key="item.id"
      :url="item.url"
      :title="item.title"
      :description="item.description"
      :image="item.image"
      class="item-box"
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

<style lang="scss" scoped>
$box-txt-color: #e5e5e5;
$box-bg-color: #45454d;
$box-border-color: #d35656;

.item-box {
  display: flex;
  flex-direction: column;

  background: $box-bg-color;
  border-bottom: 8px solid $box-border-color;
  color: $box-txt-color;

  margin: 0 auto;
  padding: 1rem;
}

@media screen and (min-width: 1024px) {
  .item-box {
    max-width: 50%;
  }
}
</style>
