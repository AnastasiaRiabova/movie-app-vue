<template>
  <div class="movies-pag">
    <BPagination v-model="get" :per-page="moviesPerPage" :total-rows="getTopMovies" prev-text='prev' next-text='next'></BPagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'MoviesPagination',
  //   data: () => ({
  //     currentPage: this.currentPage,
  //     total: this.getTopMovies,
  //     perPage: this.moviesPerPage
  //   }),
  computed: {
    ...mapGetters('movies', ['currentPage', 'moviesPerPage', 'getTopMovies']),
    get: {
      get () {
        return this.currentPage
      },
      set (page) {
        this.$router.push({ query: { page } })
        this.toChangePage(page)
      }
    }

  },
  methods: {
    ...mapActions('movies', ['toChangePage'])

  }

}
</script>

<style lang="css" scoped>
.movies-pag {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.movies-pag >>> .pagination .page-item .page-link {
  background-color: transparent;
  font-size: 12px;
  color: #fff;
  box-shadow: none;
}
.movies-pag >>> .pagination .page-item.active .page-link {
  background-color: #fff;
  border-color: #fff;
  color: #000;
}

</style>
