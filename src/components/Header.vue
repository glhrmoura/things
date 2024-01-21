<template>
  <header class="app-header"></header>
</template>

<style scoped lang="scss">
.app-header {
  display: flex;
  justify-content: center;
  background-color: $secondaryBgColor;
  padding: 28px;
  height: 100%;
  align-self: stretch;
  grid-area: 1 / 1 / 3 / 6;

  @media (max-width: 576px) {
    padding: 16px;
  }
}

.app-header__logo {
  height: 35px;

  @media (max-width: 576px) {
    grid-template-rows: 70px 80px auto minmax(50px, 1fr);
  }
}
</style>
