<template>
  <div style="style" class="navigation">
    {{deContent}}
  </div>
</template>

<script>
export default {
  name: 'navigation',
  props: ['style'],
  data () {
    return {
      deContent: '宝贝回家'
    }
  }
}
</script>

<style scope>
.navigation{
  position: fixed;
  width: 100%;
  height: 20px;
  padding: 40px 0 14px 20px;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 9999;
  padding-left: 150px;
}
</style>


