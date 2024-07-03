<template>
  <div class="position-container">
    <div class="position-name">{{ position.name }}</div>
    <div class="children">
      <!-- {{position.children}} -->
      <!-- <span v-for="child in position.children" :key="child.id">{{child.name}}</span> -->
      <position-item v-for="child in position.children" :key="child.id" :position="child"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    position: { type: Object, required: true },
  },
  components: {
    PositionItem: () => import('./Structure-PositionItem.vue')
  }
}
</script>

<style lang="scss" scoped>
  .position-container {
    display: flex;
    // align-items: center;
    // margin-right: 20px;
    // position: relative;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    position: relative;
  }
  .position-name {
    background-color: #f0f0f0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    white-space: nowrap;
  }
  .children {
    display: flex;
    // margin-left: 20px;
    // position: relative;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    position: relative;
  }
  .position-container::before,
  .position-container::after {
    content: "";
    position: absolute;
    border-left: 1px solid #000;
  }
  .position-container::before {
    top: 0;
    bottom: 50%;
    left: 50%;
  }
  .position-container::after {
    top: 50%;
    bottom: 0;
    left: 50%;
  }
  // .position-container::after {
  //   content: "";
  //   position: absolute;
  //   top: 50%;
  //   left: 100%;
  //   border-top: 1px solid #000;
  //   width: 20px;
  //   height: 0;
  // }
  .children::before {
    content: "";
    position: absolute;
    // top: 50%;
    // left: -20px;
    top: 0;
    left: 50%;
    border-top: 1px solid #000;
    width: 20px;
    height: 0;
  }
</style>