<template>
  <div class="app">
    <Header />
    <MainContent />
  </div>
</template>

<script>
import Header from '@/components/Header';
import MainContent from '@/components/MainContent/Main';

export default {
  name: 'App',

  components: {
    Header,
    MainContent,
  },
};
</script>

<style lang="scss">
.app {
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 95px 80px auto minmax(80px, auto) minmax(50px, 1fr);

  @media (max-width: 576px) {
    grid-template-rows: 70px 80px auto minmax(80px, auto) minmax(50px, 1fr);
  }
}
</style>
