<template>
  <div>
    <TRListItem class="item-box" v-for="item in toReadList" :author="item.author" :url="item.download_url" :key="item.id"></TRListItem>
  </div>
</template>

<script>
import TRListItem from './TRListItem.vue'

export default {
  name: "trlistview",
  props: ['toReadList'],
  components: {
    TRListItem
  }
}
</script>

<style lang="scss" scoped>
  $box-txt-color: #e5e5e5;
  $box-bg-color:#45454d;
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
</style>