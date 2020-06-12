<template>
  <div
    class="relative max-w-sm sm:max-w-lg w-11/12 mx-auto text-gray-200 bg-gray-700 rounded-t shadow-md"
    draggable="true"
    @dragstart="onDragStart"
    @dragover.prevent
    @drop.prevent="onDrop"
    @dragend="onDragEnd"
  >
    <TRDelete
      class="absolute right-0 mr-2 mt-2 p-1 bg-gray-900 text-light rounded"
      draggable="false"
      @delete="deleteItem(toReadItem.id)"
    />

    <TRSelect
      class="absolute right-0 mr-10 mt-2 p-1 bg-gray-900 text-light rounded"
      draggable="false"
      :selected="isSelected"
      @select="onSelect"
    />

    <a
      :href="toReadItem.url"
      target="_blank"
      rel="noopener noreferrer"
      draggable="false"
    >
      <img
        :class="[
          toReadItem.encoded ? 'object-cover' : 'object-contain',
          'w-full h-64 rounded-t shadow-md',
        ]"
        :src="toReadItem.image_url"
        :alt="toReadItem.image_alt || `Image of ${toReadItem.title}`"
        draggable="false"
        @error="toReadItem.image_url = require('@/assets/favicon.png').default"
      />
    </a>

    <h2
      class="my-4 mx-4 font-bold text-center text-lg md:text-xl"
      draggable="false"
    >
      {{ toReadItem.title }}
    </h2>

    <p
      class="mb-8 mx-6 lg:text-lg text-left leading-tight overflow-y-hidden"
      draggable="false"
    >
      {{ toReadItem.description }}
    </p>
  </div>
</template>

<script>
  import TRDelete from '@/components/buttons/TRDelete'
  import TRSelect from '@/components/buttons/TRSelect'
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
        this.$emit('drag-started', {
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
        this.$emit('drag-ended')
      },
    },
  }
</script>
