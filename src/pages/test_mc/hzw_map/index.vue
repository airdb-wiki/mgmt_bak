<template>
  <div>
    <map id="map" 
      longitude="113.324520"
      latitude="23.099994"
      scale="14"
      show-location
      style="width: 100%; height: 300px;"></map>
    <button @click="get">获取当前位置</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      latitude: '113.324520',
      longitude: '23.099994'
    }
  },
  methods: {
    get () {
      var myMap = wx.createMapContext('myMap')
      var location = wx.getStorageSync('userLocation')
      myMap.moveToLocation()
      console.log('获取位置为： ', location)
    }
  }
}
</script>

<style scoped>
</style>
