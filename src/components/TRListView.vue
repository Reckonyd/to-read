<template>
  <div
    :class="[
      dragging ? 'bg-gray-600 rounded' : '',
      'flex flex-col flex-wrap justify-evenly lg:flex-row mx-1 mt-4',
    ]"
  >
    <TRListItem
      v-for="item in list"
      :key="item.id"
      :to-read-item="item"
      :class="overItem && item.id === dropID ? 'opacity-50' : ''"
      draggable="true"
      @dragstart.native="onDragStart(item)"
      @dragenter.native="onDragEnter(item)"
      @dragover.native.prevent=""
      @drop.native.prevent="onDrop"
      @dragend.native="onDragEnd"
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
      dragID: 0,
      dropID: 0,
      dragging: false,
      overItem: false,
    }
  },

  methods: {
    ...mapActions(['swapItems']),
    onDragStart(item) {
      this.dragging = true
      this.dragID = item.id
    },
    onDragEnter(item) {
      this.overItem = true
      this.dropID = item.id
    },
    onDrop() {
      if (this.dragID !== this.dropID)
        this.swapItems({ firstID: this.dragID, secondID: this.dropID })
    },
    onDragEnd() {
      this.dragging = false
      this.overItem = false
    },
  },
}
</script>

<style scoped></style>
