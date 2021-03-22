<template>
  <b-modal id="my-modal" v-model="modal" :hide-footer="true" size="xl">

      <div class="movie-info-content">
        <img class="image-modal" :src="oneMovieInfo.Poster" alt="" />
        <b-row>
          <b-col sm="8">
            <h3 class="movie-title">{{ oneMovieInfo.Title }}</h3>
            <b-form-rating

              v-model="oneMovieInfo.imdbRating"
              readonly
              show-value
              precision="1"
              stars="10"
              show-value-max
              no-border
            />
            <p >{{ oneMovieInfo.Plot }}</p>
            <div class="mt-3 mb-4">
              <b-badge variant="success" class="mr-2">{{
                oneMovieInfo.Year
              }}</b-badge>
              <b-badge variant="success" class="mr-2">{{
                oneMovieInfo.Runtime
              }}</b-badge>
              <b-badge variant="success" class="mr-2">{{
                oneMovieInfo.Genre
              }}</b-badge>
              <b-badge variant="success" class="mr-2">{{
                oneMovieInfo.Language
              }}</b-badge>
            </div>
          </b-col>
        </b-row>
      </div>

  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ModalWindow',
  computed: {
    ...mapGetters('movies', ['oneMovieInfo']),
    ...mapGetters(['showModal']),
    modal: {
      get () {
        return this.showModal
      },
      set (value) {
        this.toggleModal(value)
      }
    }
  },
  methods: {
    ...mapActions(['toggleModal'])
  }
}
</script>

<style lang="css" scoped>
.movie-info-content {
  display: flex;
  padding: 1rem;
  background-color: #fff;
}
.image-modal {
  margin-right: 150px;
    width: 100%;
    height: 100%;
}

.movie-title {
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1.2;
}
</style>
