<template>
  <div class="container mx-auto">
    <TRSearch @emitSearch="onSearch"></TRSearch>
    <TRAdd></TRAdd>
    <TRActions></TRActions>
    <TRListView :list="list"></TRListView>
  </div>
</template>

<script>
import TRListView from './TRListView'
import TRSearch from './inputs/TRSearch'
import TRAdd from './inputs/TRAdd'
import TRActions from './inputs/TRActions'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    TRListView,
    TRSearch,
    TRAdd,
    TRActions,
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
