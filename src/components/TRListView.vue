<template>
  <div class="flex flex-col flex-wrap justify-evenly lg:flex-row mx-1 mt-4">
    <TRListItem
      v-for="item in list"
      :key="item.id"
      :to-read-item="item"
      draggable="true"
      @dragstart.native="onDragStart(item.id)"
      @dragenter.native="onDragEnter(item.id)"
      @dragover.native.prevent="onDragOver"
      @drop.native.prevent="onDrop()"
    >
    </TRListItem>
  </div>
</template>

<script>
import TRListItem from './TRListItem.vue'
import { mapActions } from 'vuex'

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
  data() {
    return {
      dragID: null,
      dropID: null,
    }
  },
  computed: {
    getDropID: function() {
      return this.dropID
    },
  },
  methods: {
    ...mapActions(['swapItems']),
    onDragStart(id) {
      this.dragID = id
    },
    onDragEnter(id) {
      this.dropID = id
    },
    onDragOver() {},
    onDrop() {
      this.swapItems({ firstID: this.dragID, secondID: this.getDropID })
    },
  },
}
</script>

<style scoped></style>
