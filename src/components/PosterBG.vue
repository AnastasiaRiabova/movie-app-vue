<template>
  <div class="poster-page-bg">
      <slot></slot>

  </div>
</template>

<script>
export default {
  name: 'PosterBG'
}
</script>

<style lang="css" scoped>
.poster-page-bg {

  background-image: linear-gradient(45deg, rgba(6, 6, 6, 0.899), rgba(29, 24, 24, 0.708));

}
</style>
