<template>
  <div>
    <TRSearch @emitSearch="onSearch"></TRSearch>
    <TRAdd></TRAdd>
    <TRListView :list="list"></TRListView>
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

<style lang="scss" scoped></style>
