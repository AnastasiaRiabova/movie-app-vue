<template>
  <div class="loader-wrap">
    <b-spinner type="grow" variant="light" lable="Loading..."></b-spinner>
  </div>
</template>

<script>

export default {
  name: 'Loader'

}
</script>

<style lang="css" scoped>
.loader-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
</style>
