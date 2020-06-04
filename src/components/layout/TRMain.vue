<template>
  <div class="flex flex-col">
    <TRSearch></TRSearch>
    <TRAdd></TRAdd>
    <TRActions></TRActions>
    <TRListView></TRListView>
  </div>
</template>

<script>
import TRListView from './TRListView'
import TRSearch from './inputs/TRSearch'
import TRAdd from './inputs/TRAdd'
import TRActions from './inputs/TRActions'
import { mapActions } from 'vuex'

export default {
  name: 'TRMain',
  components: {
    TRListView,
    TRSearch,
    TRAdd,
    TRActions,
  },
  mounted() {
    // On Main mount initialize toReadList and directories arrays.
    this.initLists()
  },
  methods: {
    ...mapActions(['initLists']),
  },
}
</script>
