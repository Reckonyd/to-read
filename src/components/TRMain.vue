<template>
  <div>
    <TRSearch
      class="md:w-4/5 mx-2 md:mx-auto my-2"
      @emitSearch="onSearch"
    ></TRSearch>
    <TRAdd class="flex md:w-4/5 mx-2 md:mx-auto my-2"></TRAdd>
    <TRListView
      class="flex flex-col flex-wrap justify-evenly lg:flex-row mx-1 mt-4"
      :list="list"
    ></TRListView>
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
    // this.initList()
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
