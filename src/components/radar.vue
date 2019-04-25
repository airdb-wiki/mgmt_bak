<template>
  <div>
    <div class="serviceIndex">
      <div class="index-title">成长指标</div>

      <canvas class="canvas" canvas-id="radar"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'radar',
  props: ['items'],
  data () {
    return {
      test: 'test222'
    }
  }
}
</script>
<style>
  .serviceIndex {
    position:relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 550rpx;
  }
  .canvas {
    height: 500rpx;
    width: 600rpx;
    margin-left: 75rpx;
    margin-right: 75rpx;
    margin-top: 50rpx;
  }

  .index-title {
    position:fixed;
    top:230rpx;
    left:30rpx;
    font-size:30;
  }
</style>
