<template>
  <div class="container mx-auto">
    <TRSearch @emitSearch="onSearch"></TRSearch>
    <TRAdd></TRAdd>
    <TRListView :list="list"></TRListView>
  </div>
</template>

<script>
import TRSearch from './inputs/TRSearch'
import TRListView from './TRListView'
import TRAdd from './inputs/TRAdd'
import { mapGetters, mapActions } from 'vuex'

export default {
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

<style scoped></style>
