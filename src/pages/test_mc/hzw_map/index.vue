<template>
  <div>
    <map id="map" 
      longitude="113.324520"
      latitude="23.099994"
      scale="13"
      show-location
      :markers="markers"
      bindmarkertap="markertap"
      :circles="circles"
      style="width: 100%; height: 300px;"></map>
    <button @click="get">获取当前位置</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      markers: [{
        iconPath: '/static/images/home/position.png',
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 30,
        height: 30
      },
      {
        iconPath: '/static/images/home/position.png',
        id: 1,
        latitude: 23.099994,
        longitude: 113.234520,
        width: 30,
        height: 30
      },
      {
        iconPath: '/static/images/home/position.png',
        id: 2,
        latitude: 23.109994,
        longitude: 120.324520,
        width: 30,
        height: 30
      }],
      circles: [{
        latitude: 23.099994,
        longitude: 113.324520,
        color: '#FF0000DD',
        fillColor: '#7cb5ec88',
        radius: 8000,
        strokeWidth: 2
      }],
      latitude: '23.099994',
      longitude: '113.324520'
    }
  },
  created () {
    var myMap = wx.createMapContext('myMap')
    myMap.moveToLocation()
  },
  methods: {
    markertap (e) {
      console.log(e.markerId)
    }
  }
}
</script>

<style scoped>
</style>
