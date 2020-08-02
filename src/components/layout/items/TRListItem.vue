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
        @error="require('@/assets/favicon.png').default"
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

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useStore } from 'vuex'

  import TRDelete from '@/components/buttons/TRDelete.vue'
  import TRSelect from '@/components/buttons/TRSelect.vue'

  import { State } from '../../../store/types'

  export default defineComponent({
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
    emits: ['drag-started', 'dropped', 'drag-ended'],
    setup(props, { emit }) {
      const { dispatch, state } = useStore<State>()

      // On user select change the select icon.
      const isSelected = computed(() =>
        state.selectedItems.find(
          selectedItem => props.toReadItem.id === selectedItem.itemId,
        )
          ? true
          : false,
      )

      const onSelect = (isSelected: boolean) =>
        dispatch('selectAction', {
          id: props.toReadItem.id,
          dirId: props.toReadItem.dirId,
          isSelected,
        })

      const onDragStart = (ev: DragEvent) => {
        ev?.dataTransfer?.setData('text', 'anything') // Added for Firefox dragNdrop support.

        emit('drag-started', {
          id: props.toReadItem.id,
          dir: props.toReadItem.dirId,
        })
      }

      const onDrop = () =>
        emit('dropped', {
          id: props.toReadItem.id,
          dir: props.toReadItem.dirId,
        })

      const onDragEnd = () => emit('drag-ended')

      return {
        isSelected,
        onSelect,
        onDragStart,
        onDrop,
        onDragEnd,
        deleteItem: (itemId: string) => dispatch('deleteItem', itemId),
      }
    },
  })
</script>
