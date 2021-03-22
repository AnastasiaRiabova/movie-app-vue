import axios from '../../plugins/axios/index'
import moviesList from '../mocks/imdb_top250'

const moviesStore = {
  namespaced: true,
  state: {
    topMovies: moviesList,
    moviesPerPage: 12,
    moviesCurrentPage: 1,
    moviesResponce: [],
    searchQuery: '',
    oneMovieInfo: {}

  },
  getters: {
    getTopMovies: ({ topMovies }) => topMovies.length,
    getSearchQuery: ({ searchQuery }) => searchQuery,
    slicedID: ({ topMovies }) => (from, to) => topMovies.slice(from, to),
    currentPage: ({ moviesCurrentPage }) => moviesCurrentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    getAllMovies: ({ moviesResponce }) => moviesResponce.map((el) => el.data ? el.data : el),
    oneMovieInfo: ({ oneMovieInfo }) => oneMovieInfo
  },
  mutations: {
    ADD_MOVIES (state, movie) {
      state.moviesResponce = movie
    },
    CHANGE_CURENPAGE (state, number) {
      state.moviesCurrentPage = number
    },
    DELETE_MOVIE (state, id) {
      // state.topMovies.splice(index, 1)
      state.topMovies = state.topMovies.filter(el => el !== id)
    },
    ON_SEARCH (state, value, request) {
      state.searchQuery = value
      // state.findMovies = request
    },
    CLEAR_SEARCH_QUERY (state) {
      state.searchQuery = ''
    },
    ONE_MOVIE_INFO (state, info) {
      state.oneMovieInfo = info
    }
  },
  actions: {

    async fetchMovies ({ getters, commit, dispatch }) {
      try {
        dispatch('toggleLoader', true, { root: true })
        const { currentPage, moviesPerPage, slicedID } = getters
        const to = (currentPage * moviesPerPage)
        const from = to - moviesPerPage
        const moviestoFetch = slicedID(from, to)
        const request = moviestoFetch.map(movie => axios.get(`/?i=${movie}`))
        const responce = await Promise.all(request)
        commit('ADD_MOVIES', responce)
      } catch (error) {
        console.log(error)
      } finally {
        dispatch('toggleLoader', false, { root: true })
      }
    },
    toChangePage ({ commit, dispatch, getters }, pageNumber) {
      const { getSearchQuery } = getters
      commit('CHANGE_CURENPAGE', pageNumber)

      if (getSearchQuery) {
        dispatch('toGetSearchResult', getSearchQuery)
      } else {
        dispatch('fetchMovies')
      }
    },

    deleteMovie ({ commit, dispatch, state }, id) {
      commit('DELETE_MOVIE', id)
      dispatch('fetchMovies')
      // const index = state.topMovies.indexOf(id)
      // if (index !== -1) {
      //   commit('DELETE_MOVIE', index)
      //   dispatch('fetchMovies')
      // }
    },
    async toGetSearchResult ({ commit, dispatch, getters }, value) {
      try {
        commit('ON_SEARCH', value)
        const { currentPage } = getters
        dispatch('toggleLoader', true, { root: true })

        const request = await axios.get(`/?s=${value}&page=${currentPage}`).then(res => res.data.Search)

        commit('ADD_MOVIES', request)
      } catch (error) {

      } finally {
        dispatch('toggleLoader', false, { root: true })
      }
    },
    clearSearchQuery ({ commit }) {
      commit('CLEAR_SEARCH_QUERY')
    },
    async fetchOneMovie ({ commit, dispatch }, id) {
      try {
        dispatch('toggleLoader', true, { root: true })
        const request = await (axios.get(`/?i=${id}`))
        commit('ONE_MOVIE_INFO', request.data)
      } catch (error) {
        console.log(error)
      } finally {
        dispatch('toggleLoader', false, { root: true })
      }
    }
  }

}
export default moviesStore
