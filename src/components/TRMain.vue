<template>
  <div>
    <TRSearch></TRSearch>
    <TRListView :list="filteredList"></TRListView>
  </div>
</template>

<script>
import TRSearch from './TRSearch.vue'
import TRListView from './TRListView.vue'

export default {
  name: 'trmain',
  data() {
    return {}
  },
  computed: {
    filteredList: function() {
      return this.$store.state.toReadList.list
    },
  },
  created() {
    this.$store.dispatch('initList')
  },
  components: {
    TRSearch,
    TRListView,
  },
}
</script>

<style lang="scss" scoped>
</style>