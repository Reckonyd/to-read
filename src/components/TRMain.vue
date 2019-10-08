<template>
  <div class="container mx-auto">
    <TRSearch @emitSearch="onSearch"></TRSearch>
    <TRAdd></TRAdd>
    <TRListView :list="list"></TRListView>
  </div>
</template>

<script>
import TRSearch from './TRSearch.vue'
import TRListView from './TRListView.vue'
import TRAdd from './TRAdd.vue'
import { mapGetters, mapActions } from 'vuex'

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
