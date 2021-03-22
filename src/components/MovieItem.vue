<template>
  <div class="movie-item box mb-3">
    <div
      class="movie-item-poster"
      :style="`background-image: url(${movies.Poster})`"
    >
      <div class="movie-item-wrap d-flex flex-column justify-content-between">
        <div class="movie-item-info">
          <h3 class="movie-title">{{ movies.Title }}</h3>
          <span class="movie-year">{{ movies.Year }}</span>
        </div>
        <div class="movie-item-controls row no-gutters">
          <div class="col pr-2">
            <BButton
              size="md"
              block
              variant="outline-light"
              @click=" toggleModalWindow(movies.imdbID)"
              >Info</BButton
            >
          </div>
          <div class="col pl-2" v-if="!getSearchQuery">
            <BButton
              size="md"
              block
              variant="outline-light"
              @click="todeleteMovie(movies.imdbID)"
              >Remove</BButton
            >
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MovieItem',

  props: {
    movies: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters('movies', ['getSearchQuery', 'getAllMovies', 'oneMovieInfo']),
    ...mapGetters(['showModal'])
  },
  methods: {
    ...mapActions('movies', ['deleteMovie', 'fetchOneMovie']),
    ...mapActions(['toggleModal']),
    async todeleteMovie (id) {
      const bool = await this.$bvModal.msgBoxConfirm('Are you sure?')
      if (bool) {
        this.deleteMovie(id)
      }
    },

    async  toggleModalWindow (id) {
      await this.fetchOneMovie(id)
      this.toggleModal(true)
    }

  }
}
</script>

<style lang="css" scoped>
.movie-item {
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  transition: all 250ms ease;
  height: 400px;
}

.movie-item:hover {
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
  transform: scale(1.05);
}
.movie-item-poster {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.movie-item-wrap {
  padding: 20px 10px;
  height: 100%;
  opacity: 0;
  transition: all 200ms ease;
}
.movie-item-wrap:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.7);
}
.movie-title {
  font-size: 18px;
  color: #fff;
}
.movie-year {
  font-size: 14px;
  color: #fff;
}

.box {
  animation-name: movePhone;
  animation-duration: 1000ms;
  animation-timing-function: linear;
  animation-iteration-count: 2000ms;
  animation-direction: alternate;
}
@keyframes movePhone {
  0% {
    transform: rotate(2deg);
  }

  30% {
    transform: rotate(0deg);
  }
  60% {
    transform: rotate(-2deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
