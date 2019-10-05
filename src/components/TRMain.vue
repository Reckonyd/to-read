<template>
  <div>
    <TRSearch class="w-4/5 my-3 mx-auto" @emitSearch="onSearch"></TRSearch>
    <TRAdd class="w-4/5 my-3 mx-auto"></TRAdd>
    <TRListView class="my-4 max-w-5xl mx-auto" :list="list"></TRListView>
  </div>
</template>

<script>
import TRSearch from './TRSearch.vue'
import TRListView from './TRListView.vue'
import TRAdd from './TRAdd.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Trmain',
  components: {
    TRSearch,
    TRListView,
    TRAdd,
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    ...mapGetters(['getFilteredToReadList']),
    list() {
      return this.getFilteredToReadList(this.search)
    },
  },
  methods: {
    onSearch(search) {
      this.search = search
    },
  },
}
</script>

<style scoped></style>
