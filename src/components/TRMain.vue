<template>
  <div>
    <TRSearch @searching="onSearch"></TRSearch>
    <TRListView :toReadList="searchList.length === 0 ? list : searchList"></TRListView>
  </div>
</template>

<script>
import TRSearch from './TRSearch.vue'
import TRListView from './TRListView.vue'
import axios from 'axios'

export default {
  name: 'trmain',
  data() {
    return {
      list: [],
      searchList: [],
    }
  },
  methods: {
    onSearch: function(search = '') {
      this.searchList = this.list.filter(item => {
        return item.author.toLowerCase().indexOf(search.toLowerCase()) === 0
      })
    },
  },
  mounted() {
    axios.get('https://picsum.photos/v2/list').then(responce => {
      const list = responce.data
      list.forEach(({ id, author, download_url }) =>
        this.list.push({ id, author, download_url }),
      )
    })
  },
  components: {
    TRSearch,
    TRListView,
  },
}
</script>

<style lang="scss" scoped>
</style>