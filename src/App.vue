<template>
  <div id="app">
    <template v-if="showLoader">
      <Loader />
    </template>
    <PosterBG>
      <ModalWindow/>
      <Header />
      <MovieList />
      <MoviesPagination />
    </PosterBG>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import MovieList from './components/MovieList'
import PosterBG from './components/PosterBG'
import MoviesPagination from './components/MoviesPagination'
import Loader from './components/Loader'
import Header from './components/Header'
import ModalWindow from './components/ModalWindow'
export default {
  name: 'App',
  components: {
    MovieList,
    PosterBG,
    MoviesPagination,
    Loader,
    Header,
    ModalWindow
  },
  watch: {
    '$route.query': {
      handler: 'onChangeQuery',
      immediate: true,
      deep: true
    }
  },
  // created () {
  //   if (this.$route.query.page !== 0) {
  //     this.toChangePage(+this.$route.query.page)
  //     return
  //   }
  //   this.toChangePage(1)
  // },
  methods: {
    ...mapActions('movies', ['fetchMovies', 'toChangePage']),

    onChangeQuery ({ page = 1 }) {
      this.toChangePage(Number(page))
    }
  },
  computed: {
    ...mapGetters(['showLoader'])
  }
}
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
