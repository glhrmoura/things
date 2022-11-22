<template>
  <div class="central-panel-loading">
    <div class="central-panel-loading__title">
      <PuSkeleton width="150px" height="30px" />
    </div>
    <div class="central-panel-loading__illustration">
      <PuSkeleton width="100%" height="186px" />
    </div>
    <div class="central-panel-loading__tasks-title">
      <PuSkeleton width="100px" height="30px" />
    </div>
    <div class="central-panel-loading__task">
      <PuSkeleton width="100%" height="30px" />
    </div>
    <div class="central-panel-loading__task">
      <PuSkeleton width="100%" height="30px" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.central-panel-loading__illustration {
  margin-bottom: 40px;
}

.central-panel-loading__title {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.central-panel-loading__tasks-title {
  margin-bottom: 30px;
}

.central-panel-loading__task {
  margin-bottom: 30px;
}
</style>