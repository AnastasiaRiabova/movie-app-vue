<template>
  <header class="header">
    <b-navbar type="dark" class="navbar" variant="dark">
      <b-container>
        <b-navbar-brand href="#">MovieDB</b-navbar-brand>
        <b-nav-form>
          <b-form-input
            class="mr-sm-2 search-input"
            placeholder="Search"
            debounce="900"
            v-model="getSearchQuery"
          ></b-form-input>
        </b-nav-form>
      </b-container>
    </b-navbar>

  </header>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Header',
  data: () => ({
    searchQuery: ''
  }),
  //   watch: {
  //     searchQuery: function (params) {
  //       this.searchQuery = params
  //       return this.searchQuery
  //     }
  //   },
  computed: {
    getSearchQuery: {
      get () {
        return this.searchQuery
        // this.toGetSearchResult()
      },
      set (value) {
        this.searchQuery = value
        // console.log(this.searchQuery)
        if (this.searchQuery) {
          this.toGetSearchResult(this.searchQuery)
        } else {
          this.fetchMovies()
          this.clearSearchQuery()
        }

        return this.searchQuery
      }
    }

  },
  methods: {
    ...mapActions('movies', ['toGetSearchResult', 'fetchMovies', 'clearSearchQuery'])
  }
}

</script>

<style lang="css" scoped>
.header {
  margin-bottom: 30px;
}
.navbar {
  background-color: rgba(0, 0, 0, 0.7) !important;
}
.search-input {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 0, 0, 0.6);
}
.search-input:focus {
  box-shadow: none;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 0, 0, 0.6);
}
</style>
