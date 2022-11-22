<template>
  <main class="main-content">
    <div class="app__bg-illustration app__bg-illustration__pyramid">
      <ImageSource :image="pyramidIllustration" />
    </div>
    <section class="main-content__content">
      <CentralPanel />
    </section>
    <div class="app__bg-illustration app__bg-illustration__plant">
      <ImageSource :image="plantIllustration" />
    </div>
  </main>
</template>

<script>
import CentralPanel from './components/CentralPanel';

export default {
  components: {
    CentralPanel,
  },
  data() {
    return {
      pyramidIllustration: {
        src: require('@/assets/images/pyramid.png'),
        alt: 'Illustration of a geometric shape that resembles a pyramid',
        sources: [
          {
            type: 'image/jpeg',
            srcset: require('@/assets/images/pyramid.png'),
            media: '(min-width: 768px)',
          },
          {
            type: 'image/jpeg',
            srcset: require('@/assets/images/pyramid@2x.png'),
            media: '(min-width: 0px)',
          },
        ],
      },
      plantIllustration: {
        src: require('@/assets/images/plant.png'),
        alt: 'Illustration of a plant inside a pot',
        sources: [
          {
            type: 'image/jpeg',
            srcset: require('@/assets/images/plant.png'),
            media: '(min-width: 768px)',
          },
          {
            type: 'image/jpeg',
            srcset: require('@/assets/images/plant@2x.png'),
            media: '(min-width: 0px)',
          },
        ],
      },
    };
  },
};
</script>

<style scoped lang="scss">
.main-content {
  grid-area: 2 / 1 / 5 / 2;
  justify-content: center;
  display: grid;
  grid-template-columns: 1fr 125px 800px 125px 1fr;
  grid-template-rows: 80px 120px 1fr 110px minmax(80px, auto) auto;

  @media (max-width: 1200px) {
    grid-template-columns: minmax(20px, 1fr) minmax(320px, 800px) minmax(20px, 1fr);
  }
}

.main-content__content {
  grid-area: 1 / 3 / 5 / 4;

  @media (max-width: 1200px) {
    grid-area: 1 / 2 / 5 / 3;
  }

  @media (max-width: 992px) {
    grid-area: 1 / 2 / 5 / 3;
  }

  @media (max-width: 768px) {
    grid-area: 1 / 2 / 5 / 3;
  }
}

.main-content__content-panel {
  width: 100%;
  background-color: $primaryBgColor;
  border-radius: 12px;
  padding: 30px 28px 28px;
  box-shadow: 0 1px 6px 0 $primaryBoxShadowColor;
}

.app__bg-illustration {
  display: flex;

  &__pyramid {
    grid-area: 2 / 2 / 3 / 3;
    margin-top: 20px;
    margin-right: 20px;
  }

  &__plant {
    grid-area: 4 / 4 / 6 / 5;
    margin-left: 20px;
  }

  @media (max-width: 1200px) {
    display: none;
  }
}
</style>