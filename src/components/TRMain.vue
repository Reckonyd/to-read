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
  name: 'trmain',
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
    ...mapActions(['initList']),
    onSearch(search) {
      this.search = search
    },
  },
  mounted() {
    this.initList()
  },
  components: {
    TRSearch,
    TRListView,
  },
}
</script>

<style lang="scss" scoped>
</style>