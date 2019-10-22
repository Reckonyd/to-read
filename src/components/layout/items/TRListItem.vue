<template>
  <div
    class="relative flex flex-col lg:w-5/12 bg-gray-700 text-gray-100 my-2 mx-1 sm:mx-2 text-center border-b-8 border-red-700 rounded-t shadow"
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
          toReadItem.encoded ? '' : imageStyle,
          'mx-auto',
          'w-full',
          'rounded-t',
          'shadow-md',
        ]"
        :src="toReadItem.image_url"
        :alt="toReadItem.image_alt || `Image of ${toReadItem.title}`"
        draggable="false"
      />
    </a>
    <h2 class="my-4 mx-3 font-bold tracking-wider text-xl" draggable="false">
      {{ toReadItem.title }}
    </h2>
    <p class="mb-5 mx-6 text-lg text-left leading-tight" draggable="false">
      {{ toReadItem.description }}
    </p>
  </div>
</template>

<script>
import TRDelete from '../../buttons/TRDelete'
import TRSelect from '../../buttons/TRSelect'
import { mapActions, mapState } from 'vuex'

export default {
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
  data: function() {
    return {
      imageStyle: ['object-contain', 'h-64'],
    }
  },
  computed: {
    ...mapState(['selectedItems']),
    isSelected: function() {
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

<style scoped></style>
