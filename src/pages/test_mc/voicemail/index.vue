<template>
  <div>
    <button @click="lu">点击</button>
    <button @click="stop">停止</button>
    <button @click="play">播放</button>
  </div>
</template>

<script>
const recorderManager = wx.getRecorderManager()

export default {
  data () {
    return {
      tempPath: ''
    }
  },
  methods: {
    lu () {
      const options = {
        duration: 10000,
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192000,
        format: 'aac',
        frameSize: 50
      }

      recorderManager.start(options)
    },
    stop () {
      recorderManager.onStop((res) => {
        console.log('recorder stop', res)
        this.tempPath = res.tempFilePath
      })

      recorderManager.stop()
    },
    play () {
      this.innerAudioContext = wx.createInnerAudioContext()
      this.innerAudioContext.onError((res) => {
        console.log('播放失败')
      })
      this.innerAudioContext.src = this.tempPath
      this.innerAudioContext.play()
    }
  }
}
</script>

<style scoped>

</style>
