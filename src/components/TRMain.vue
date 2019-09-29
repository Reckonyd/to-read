<template>
  <div>
    <TRSearch></TRSearch>  
    <TRListView :toReadList="list"></TRListView>  
  </div>
</template>

<script>
import TRSearch from './TRSearch.vue'
import TRListView from './TRListView.vue'
import axios from 'axios'


export default {
  name: "trmain",
  data() {
    return {
      list: []
    }
  },
  mounted() {
    axios
      .get('https://picsum.photos/v2/list')
      .then(responce => {
        const list = responce.data
        list.forEach(({id, author, download_url}) => this.list.push({id, author, download_url}))
      })
  },
  components: {
    TRSearch,
    TRListView
  }
}
</script>

<style lang="scss" scoped>

</style>