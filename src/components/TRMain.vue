<template>
  <div>
    <TRSearch @emitSearch="onSearch"></TRSearch>
    <TRListView :list="list"></TRListView>
  </div>
</template>

<script>
import TRSearch from './TRSearch.vue'
import TRListView from './TRListView.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Trmain',
  components: {
    TRSearch,
    TRListView,
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
  mounted() {
    this.initList()
  },
  methods: {
    ...mapActions(['initList']),
    onSearch(search) {
      this.search = search
    },
  },
}
</script>

<style lang="scss" scoped></style>
