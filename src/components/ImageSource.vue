<template>
  <picture>
    <source
      v-for="(source, index) in image.sources"
      :key="index"
      :type="source.type"
      :srcset="source.srcset"
      :media="source.media"
    />

    <img
      width="100%"
      height="100%"
      :src="image.src"
      :alt="image.alt"
      :style="{ objectFit: 'contain' }"
    />
  </picture>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,

      default: () => ({
        src: '',
        alt: '',
        sources: [],
      }),
    },
  },
};
</script>
