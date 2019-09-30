<template>
  <section>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style scoped>
.app-main {
  min-height: calc(100vh - 190px);
  position: relative;
  overflow: hidden;
  width: 97%;
  margin: 15px auto;
}
</style>
