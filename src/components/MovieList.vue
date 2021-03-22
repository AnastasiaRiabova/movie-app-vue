<template>
<BContainer>
    <h3 class='list-item' > {{searchParams}}</h3>

    <BRow>
    <template v-if="isNotEmpty">
<BCol cols='3' v-for="movie of getAllMovies" :key='movie.imdbID'>
  <MovieItem :movies="movie"/>
    </BCol>
    </template>
        <template v-else>
<div>No</div>
    </template>
    </BRow>
</BContainer>
</template>

<script>
import { mapGetters } from 'vuex'
import MovieItem from './MovieItem'
export default {
  name: 'MovieList',
  components: { MovieItem },
  computed: {
    ...mapGetters('movies', ['getAllMovies', 'getSearchQuery']),
    isNotEmpty () {
      return Boolean(this.getAllMovies.length)
    },
    searchParams () {
      return this.getSearchQuery ? 'Your Search: ' + this.getSearchQuery : 'IMDB Top 250'
    }
  }
}
</script>

<style lang="css" scoped>
.list-item{
    font-size: 50px;
    margin-bottom: 30px;
       color: white
}
</style>
