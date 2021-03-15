<template>
  <div
    class="relative w-11/12 max-w-sm mx-auto text-gray-200 bg-gray-700 rounded-t shadow-md sm:max-w-lg"
    draggable="true"
    @dragstart="onDragStart"
    @dragover.prevent
    @drop.prevent="onDrop"
    @dragend="onDragEnd"
  >
    <TRDelete
      class="absolute right-0 p-1 mt-2 mr-2 bg-gray-900 rounded text-light"
      draggable="false"
      @delete="deleteItem(toReadItem.id)"
    />

    <TRSelect
      class="absolute right-0 p-1 mt-2 mr-10 bg-gray-900 rounded text-light"
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
      class="mx-4 my-4 text-lg font-bold text-center md:text-xl"
      draggable="false"
    >
      {{ toReadItem.title }}
    </h2>

    <p
      class="mx-6 mb-8 overflow-y-hidden leading-tight text-left lg:text-lg"
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
