<template>
  <div
    class="relative w-11/12 md:w-5/12 mx-auto my-2 text-gray-200 bg-gray-700 rounded-t shadow-md"
    draggable="true"
    @dragstart="onDragStart"
    @dragover.prevent
    @drop.prevent="onDrop"
    @dragend="onDragEnd"
  >
    <TRSelect
      draggable="false"
      :selected="isSelected"
      @select="onSelect"
    ></TRSelect>
    <TRDelete draggable="false" @delete="deleteItem(toReadItem.id)" />
    <a
      :href="toReadItem.url"
      target="_blank"
      rel="noopener noreferrer"
      draggable="false"
    >
      <img
        :class="[
          toReadItem.encoded ? 'object-cover' : imageStyle,
          'w-full h-64 rounded-t shadow-md',
        ]"
        :src="toReadItem.image_url"
        :alt="toReadItem.image_alt || `Image of ${toReadItem.title}`"
        draggable="false"
      />
    </a>
    <h2
      class="my-4 mx-4 font-bold text-center text-lg md:text-xl"
      draggable="false"
    >
      {{ toReadItem.title }}
    </h2>
    <p class="mb-5 mx-6 lg:text-lg text-left leading-tight" draggable="false">
      {{ toReadItem.description }}
    </p>
  </div>
</template>

<script>
import TRDelete from '../../buttons/TRDelete'
import TRSelect from '../../buttons/TRSelect'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'TRListItem',
  components: {
    TRDelete,
    TRSelect,
  },
  props: {
    toReadItem: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      imageStyle: 'object-contain',
    }
  },
  computed: {
    ...mapState(['selectedItems']),

    // On user select change the select icon.
    isSelected: function () {
      return this.selectedItems.find(
        selectedItem => this.toReadItem.id === selectedItem.itemId,
      )
        ? true
        : false
    },
  },
  methods: {
    ...mapActions(['deleteItem', 'selectAction']),
    onSelect(isSelected) {
      this.selectAction({
        id: this.toReadItem.id,
        dirId: this.toReadItem.dirId,
        isSelected,
      })
    },
    onDragStart() {
      event.dataTransfer.setData('text', 'anything') // Added for Firefox dragNdrop support.
      this.$emit('dragStarted', {
        id: this.toReadItem.id,
        dir: this.toReadItem.dirId,
      })
    },
    onDrop() {
      this.$emit('dropped', {
        id: this.toReadItem.id,
        dir: this.toReadItem.dirId,
      })
    },
    onDragEnd() {
      this.$emit('dragEnded')
    },
  },
}
</script>
